const users = require("../models/user.js");
const bcrypt = require('bcrypt');

/*
Post request json file structure


    obj =  {
        "name":name,
        "email":email,
        "password": password
    }

 */

//You need to complete the route of user register
//you need to register the user and return the id assign to the user.
//the password you save in database should be hashed using bcrypt libary.
//you will get error if user mail allready exist in that case you need to return 404 status with err message that you get.
//to look the user schema look ../models/user.js

const registerUser = async (req, res) => {

    //Write you code here 
    try {
        const { name, email, password } = req.body;

        const existingUser = await users.findOne({ email: email });
        if (existingUser) {
            return res.json({
                status: 404,
                message: "User validation failed: email: Email already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new users({
            name: name,
            password: hashedPassword,
            email: email
        })

        const responseFromDB = await user.save();
        return res.send(responseFromDB._id)
    } catch (error) {
        return res.json({
            status: 404,
            message: error.message
        })
    }


}

module.exports = { registerUser };