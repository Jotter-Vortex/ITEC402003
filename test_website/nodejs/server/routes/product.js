const express = require('express');
const router = express.Router();
const multer = require('multer'); // 가져온 이미지를 저장할때 사용하는 거임.
const { Product } = require('../models/Product') // ../modles/Product에서 module.export 해온 부분을 가져온거임.

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {  // 어디에 파일이 저장되는지?
      cb(null, 'uploads/') // 모든 파일은 uploads 폴더에 저장한다.
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`) // 파일 이름을 저장하는 방식임. 
    }
  })
  
var upload = multer({ storage: storage }).single("file")



router.post('/image', (req,res) =>{ // req, res는 핸들러임.

    // 가져온 이미지를 저장을 해주면 된다.
    upload(req,res,err => { // 만약에 에러가 나면 ? err을 사용.
        if(err){ // 만약 에러가 났다면 내용을 서버에게 알려준다.
            return req.json({success: false, err})
        }
        return res.json({success: true, filePath: res.req.file.path , fileName: res.req.file.filename})
    })
})

router.post('/', (req,res) =>{ // req, res는 핸들러임.

  const product = new Product(req.body) // 새로운 객체로 만들어 주고 저장함.

  product.save((err) => { // 자동적으로 모든 정보들이 product에 저장함.
    if(err) return res.status(400).json({success:false, err})
    return res.status(200).json({success:true})
  })
})

router.post('/products', (req,res) =>{ 

  // product colletion에 들어 있는 모든 상품 정보를 가져오기

  // parseInt ? 만약에 string이면 숫자로 바꿔준다.
  let limit = req.body.limit ? parseInt(req.body.limit) : 20; // 최대값임.
  let skip = req.body.skip ? parseInt(req.body.skip) : 0; // 없다면 처음부터 시작할 수 있게 해줌
  let term = req.body.searchTerm

  let findArgs = {};

  // 여기 로직이 생각보다 어려움. 자주 봐주면 좋음
  for(let key in req.body.filters){ // key는 LandingPage.js에 있는 continents 아니면 price
    if(req.body.filters[key].length > 0){ // 하나 이상 들어 있으면

      console.log('key',key)

      if(key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0], // grater than equal.. MongoDB에서 사용하는 쿼리문
          $lte: req.body.filters[key][1]  // less than equal.. MongoDB에서 사용하는 쿼리문
        }
      }else{
        findArgs[key] = req.body.filters[key];
      }
    }
  }


  if(term){
    Product.find(findArgs)
    .find({ "title": { '$regex' : term}}) // mongodb에서 제공하는 것을 이용함. like 기능. 글자를 포함하면 모두 가져옴.
    //.find({ $text: { $search: term } }) // 정확히 일치하는 것만 가져옴.
    .populate("writer") // writer에 대한 모든 정보를 가져올 수 있음. 유저의 사진이나 이름, 닉네임 모두.
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err })
      //[{}, {}, {}] 이런 식으로 들어있음. DB에서 3개를 가져왔구나. 라고 알 수 있음. 즉 length = 3
      //productInfo.length = 4
      return res.status(200).json({
         success: true, productInfo,
         postSize: productInfo.length
        })
    })
  }else{
    Product.find(findArgs)
    .populate("writer") // writer에 대한 모든 정보를 가져올 수 있음. 유저의 사진이나 이름, 닉네임 모두.
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err })
      //[{}, {}, {}] 이런 식으로 들어있음. DB에서 3개를 가져왔구나. 라고 알 수 있음. 즉 length = 3
      //productInfo.length = 4
      return res.status(200).json({
         success: true, productInfo,
         postSize: productInfo.length
        })
    })
  }
  
})



// id= 123213, 1323432m, 432432432 type = array
// get일때는 post랑 조금 다름.
router.get('/products_by_id', (req,res) =>{ // req, res는 핸들러임.

  let type = req.query.type   // body가 아니라 query임.
  let productIds = req.query.id

  if(type === "array"){
    // id = id= 123213, 1323432m, 432432432 이거를
    // id= ['123213', '1323432m', '432432432'] 이런 식으로 바꿔줌.
    let ids = req.query.id.split(',')
    productIds = ids.map(item => {
      return item
    })
  }

  // productID를 이용해서 DB에서 productID와 같은 상품의 정보를 가져온다.

  Product.find({_id: {$in: productIds}})
  .populate('writer')
  .exec((err,product) => {
    if(err) return res.status(400).send(err)
    return res.status(200).send(product)
  })

})


// axios.get(`/api/product/products_by_id?=${productID}&type=single`)


module.exports = router;
