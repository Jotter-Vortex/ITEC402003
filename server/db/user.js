const router = require("express").Router();
const mongoose = require('mongoose');
const { getUserModel } = require("../schema/userDb");

router.get("/", async (req, res) => {
	let userModel = await getUserModel();
	let doc = await userModel.findOneAndUpdate()
	if (!doc) {
		res.setHeader('Access-Control-Allow-Origin: *');
		res.send(JSON.stringify(doc))
	}
	// const connect = () => {
	// 	//mongodb connection
	// 	mongoose.connect(MONGODB_URI, {
	// 	  useNewUrlParser: true,
	// 	  useUnifiedTopology: true
	// 	})
	//   }

	//   connect();

	//   mongoose.connection.on('connected', () => {
	// 	console.log('user connected')
	//   })

	// const userSchema = new mongoose.Schema({
	// 	ID: { type: String, required: true },
	// 	Password: { type: String, required: true },
	// 	Email: { type: String, required: true },
	// });

	// const User = mongoose.model("user", userSchema);

	// try {
	// 	const { error } = validate(req.body);
	// 	if (error) {
	// 		console.log(error)
	// 		return res.status(400).send({ message: error.details[0].message });
	// 	}

	// 	const user = await User.findOne({ email: req.body.Email });
	// 	if (user)
	// 		return res
	// 			.status(409)
	// 			.send({ message: "User with given email already Exist!" });
	// 	await new User({ ...req.body, Password: req.body.Password }).save();
	// 	res.status(201).send({ message: "User created successfully" });
	// } catch (error) {
	// 	res.send({ error });
	// }
});

module.exports = router;