const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { Payment } = require("../models/Payment");

const { auth } = require("../middleware/auth");
const async = require('async');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/addToCart", auth, (req, res) => {

    // 먼저 User Collections에 해당 유저의 정보를 가져오기.

    // auth를 통해서 밑의 라인이 가능한 거임.
    User.findOne({_id: req.user._id}, // 해당 유저는 한명임
        (err,userInfo) => {
        // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 있는지 확인하기.

            let duplicate = false;
            userInfo.cart.forEach((item) =>{
                if(item.id === req.body.productId){
                    duplicate = true;
                }
            })

            // 상품이 이미 있을때 상품 개수만 1을 올림
            if(duplicate){
                User.findOneAndUpdate(
                    {_id: req.user._id, "cart.id": req.body.productId},
                    { $inc : {"cart.$.quantity": 1 }}, // increment의 약자임
                    { new : true },     // 업데이트 된 정보의 결과값을 받으려면 new : true를 줘야만 함
                    (err, userInfo) =>{
                        if(err) return res.status(200).json({success: false, err})
                        res.status(200).send(userInfo.cart)
                    } 
                )

            }else{
            // 상품이 이미 있지 않을때
            User.findOneAndUpdate(
                {_id: req.user._id},
                {
                    $push : {
                        cart: {
                            id: req.body.productId,
                            quantity: 1,
                            date: Date.now() // 현재 시간에 대한 정보
                        }
                    }
                },
                {new : true},
                (err,userInfo) =>{
                    if(err) return res.status(400).json({success : false, err})
                    res.status(200).send(userInfo.cart)
                }
            )
            }
            // req.body.productId
        })
});


router.get(`/removeFromCart`, auth, (req,res) => {

    // 1. 먼저 cart안에 내가 지우려고 한 상품을 지워주기
    User.findOneAndUpdate(
        {_id: req.user._id}, // auth 미들웨어 때문에 할 수 있는 거임.
        {
            "$pull":
            {
                "cart":{"id":req.query.id}
            }
        },
        {new : true},
        (err,userInfo) =>{
            let cart = userInfo.cart;
            let array = cart.map(item =>{
                return item.id
            }) 
            // 2. product collection에서 현재 남아있는 상품들의 정보를 가져오기
            Product.find({ _id: { $in: array } })
                .populate('writer')
                .exec((err, productInfo) => {
                    if (err) return res.status(400).send(err)
                    return res.status(200).json({
                        productInfo,
                        cart
                    })
                })
        }
    )
})

// middle ware를 통해서 오는 정보를 사용하는것임.
router.post(`/successBuy`, auth, (req,res) => {

    // 1. User Collection 안에 History 필드 안에 간단한 결제 정보 넣어주기.

    let history = [];
    let transactionData = {};

    req.body.cartDetail.forEach(item => {
        history.push({
        dateOfPurchase : Date.now(),
        name: item.title,
        id: item._id,
        price: item.price,
        quantity: item.quantity,
        paymentId: req.body.paymentData.paymentID
        })
    });

    // 2. Payment Collection 안에 자세한 결제 정보들을 넣어주기.

    transactionData.user = {
        id : req.user._id,
        name : req.user.name,
        email : req.user.email
    }
    transactionData.data = req.body.paymentData
    transactionData.product = history

    // history 정보 저장
    User.findOneAndUpdate(
        {_id: req.user._id},
        { $push :  { history : history }, $set: { cart: []}},
        { new : true },
        (err, user) => {
            if (err) return res.json({success : false, err})

            // payment에다가 trasaction 정보 저장
            const payment  = new Payment(transactionData)
            payment.save((err, doc) => {
                if(err) return res.json({success : false, err})

                // 3. Product Collection 안에 있는 sold 필드 정보 업데이트 시켜주기.

                // 상품 당 몇 개의 quantity를 샀는지를 알아야함.

                let products = [];
                // doc variable안에는 payment 지불 정보가 들어와있음.
                doc.product.forEach(item=>{
                    products.push({id: item._id, quantity: item.quantity})
                })

                // 그 다음에 Products를 업데이트 해줘야하는데 이때, for문으로 db product collection을 모두 업데이트 시켜야하는데
                // 인덱스값을 맞추는등 매우 복잡하기때문에 이때 npm async라는 오픈소스를 사용한다.

                async.eachSeries(products, (item, callback) =>{

                    Product.update(
                        {_id: item.id},
                        {
                            $inc: {
                                "sold" : item.quantity
                            }
                        },
                        {new:false}, // 이번에는 굳이 프론트엔드로 전해주지 않아도 되기 때문에 false로 함.
                        callback
                    )
                },(err)=>{
                    if(err) return res.status(400).json({success:false, err})
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                } )



            })
        }
    )


})

module.exports = router;
