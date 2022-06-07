const router = require("express").Router();
const req = require("express/lib/request");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const saltRounds = 10

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
			if (data === undefined || data.length === 0) {
				const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync());

				new User({ ...req.body, password: hashedPassword })
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

module.exports = router
