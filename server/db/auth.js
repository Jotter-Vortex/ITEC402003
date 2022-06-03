const router = require("express").Router();
const mongoose = require("mongoose")

const ID = 'Report'
const PW = 'report'
var conn2 = mongoose.createConnection('mongodb+srv://' + ID + ':' + PW + '@cluster0.2nwmd.mongodb.net/users?retryWrites=true&w=majority');

router.post("/", async (req, res) => {
	const User = conn2.model(req.body.ID, new mongoose.Schema({
		ID: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true },
	}), req.body.ID)

	User.find({})
	.then((data) => {
		if(data === undefined || data.length === 0) {		
			return res.status(401).send({ message: "회원가입이 필요합니다" });
		}

		else if(data[0].password !== req.body.password) {
			return res.status(401).send({ message: "비밀번호가 틀렸습니다" });
		}

		else {
			return res.status(201).send({ message: "로그인 완료" });
		}
	})
});

module.exports = router;