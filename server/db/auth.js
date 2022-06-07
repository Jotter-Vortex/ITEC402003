const mongoose = require("mongoose");
const express = require('express');
const fs = require('fs');
const csv = require('csvtojson')
const path = require('path');
const router = express.Router();
const app = express();
const Report = require('../schema/schema')
const bcrypt = require("bcrypt");

const dir = path.join(__dirname, '..\\') + '\\files'
const files = fs.readdirSync(dir)

const ID = 'Report'
const PW = 'report'
var conn = mongoose.createConnection('mongodb+srv://' + ID + ':' + PW + '@cluster0.2nwmd.mongodb.net/users?retryWrites=true&w=majority');
var report = 0

router.post("/", async (req, res) => {
	const User = conn.model(req.body.ID, new mongoose.Schema({
		ID: { type: String, required: true },
		password: { type: String, required: true },
		email: { type: String, required: true },
	}), req.body.ID)

	User.find({})
		.then((data) => {
			if (data === undefined || data.length === 0) {
				return res.status(401).send({ message: "회원가입이 필요합니다" });
			}

			const validPassword = bcrypt.compare(
				req.body.password,
				data[0].password
			);

			if (!validPassword) {
				return res.status(401).send({ message: "비밀번호가 틀렸습니다" });
			}

			else {
				const str = data[0].email.split('.')
				text = str[0] + str[1]

				var conn2 = mongoose.createConnection('mongodb+srv://' + ID + ':' + PW + '@cluster0.2nwmd.mongodb.net/' + text + '?retryWrites=true&w=majority')
				const MONGODB_URI = 'mongodb+srv://' + ID + ':' + PW + '@cluster0.2nwmd.mongodb.net/' + text + '?retryWrites=true&w=majority'

				const connect = () => {
					//mongodb connection
					mongoose.connect(MONGODB_URI, {
						useNewUrlParser: true,
						useUnifiedTopology: true
					})
				}

				mongoose.connection = conn2

				mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
				mongoose.connection.once('open', () => {
					console.log('connected');
				});

				connect()

				for (const file of files) {
					const fp = dir + '\\' + file
					const name = file.split('.')

					csv()
						.fromFile(fp)
						.then((jsonObj) => {
							if (jsonObj.length !== 0) {
								report = conn2.model(jsonObj[0].Timestamp, new mongoose.Schema(Report, { collection: jsonObj[0].Timestamp }))

								var reportFind = mongoose.model('report', Report, jsonObj[0].Timestamp);

								reportFind.find((error, data) => {
									if (data.length === 0) {
										for (item in jsonObj) {
											new reportFind(jsonObj[item]).save()
										}
									}
								})
							}
						})
				}

				return res.status(201).send({ message: "로그인 완료" });
			}
		})
})

module.exports = router