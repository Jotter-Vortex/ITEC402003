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


module.exports = router;