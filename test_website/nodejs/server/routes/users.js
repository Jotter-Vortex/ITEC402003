const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

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
                if(item.id == req.body.productId){
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
                            date: Date.now // 현재 시간에 대한 정보
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

module.exports = router;
