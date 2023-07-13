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


const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email) return res.send("Emial is required!")
        if (!password) return res.send("Password is required!")


        const user = await users.findOne({ email: email });

        // console.log("we got the user", user)
        if (user?.name) {
            // console.log(password, user.password)
            const hashedPassword = await bcrypt.compare(password, user.password);
            // console.log(hashedPassword, "- hashedPassword")
            if (hashedPassword) {
                return res.json({
                    status: 200,
                    message: "Login successful"
                })
            }
        } else {
            return res.json({
                status: 404,
                message: "Please check your email and password."
            })
        }

    } catch (error) {
        return res.send(error)
    }
}

module.exports = { registerUser, loginUser };