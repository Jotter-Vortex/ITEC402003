const router = require("express").Router();
const mongoose = require("mongoose")

const ID = 'Report'
const PW = 'report'
var conn2 = mongoose.createConnection('mongodb+srv://' + ID + ':' + PW + '@cluster0.2nwmd.mongodb.net/users?retryWrites=true&w=majority');

router.post("/", async (req, res) => {
	console.log(req.body.ID)
	const User = conn2.model(req.body.ID, new mongoose.Schema({
		ID: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true },
	}), req.body.ID)

	User.find({})
	.then((data) => {
		if(data === undefined || data.length === 0) {
			new User(req.body)
			.save()
			.catch((err) => {
			  console.log(err.message);
			});

			return res.status(201).send({ message: "회원가입 성공" });
		}

		else {
			return res.status(401).send({ message: "이미 존재하는 아이디입니다" });
		}
	})
});

module.exports = router;
