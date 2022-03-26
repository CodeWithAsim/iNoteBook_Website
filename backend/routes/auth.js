const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

JWT_SECRET = "Asimisstrugglingtolearncoding$";

// ROUTE 1 : Create a User using : POST /api/auth/createuser . No login required ! Without requiring Authentication !

router.post("/createuser", [

    body('name', "Enter a valid name !").isLength({ min: 3 }),
    body('email', "Enter a valid email !").isEmail(),
    body('password', "Password must be atleast 5 characters !").isLength({ min: 5 })

], async (req, res) => {

    // jahan jahan json response bhej rae ho wahan wahan success bhi bhejo ta kh error pr redirect na krein frontend se 
    let success = false;

    //If there are errors return badrequest 404 and the errors while checking the above validation ! 

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    // res.send(req.body);

    // try catch during adding into db 

    try {

        // now createIndexes() replicates in a good way !
        // Check whether a user with this email already exists or not 

        let user = await User.findOne({ email: req.body.email })
        console.log(user);
        if (user) {
            // yahan se hi return kr jae ! 
            return res.status(400).json({ success, "error": "Sorry a user with this email already exists!" });

        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            // password: req.body.password
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }

        // console.log(data.user.id);  // ._id pr new ObjectId type ka return krta object

        const authtoken = jwt.sign(data, JWT_SECRET);

        console.log(authtoken);

        success = true;
        res.json({ success, authtoken });  // equal to write authtoken:authtoken 

        // ab user aur detail wapis se dena acha idea ni hai so giving token to user for to use in future if user has to access any protected route . 
        // res.send(user);
    }
    catch (error) {
        console.error(error.message);
        // res.status(500).send("Some error occured");
        res.status(500).send("Internal Server Error !");
    }

    // after making User.create async await function , below part is not required !
    // .then(resolve => res.send(resolve)).catch(reject => {
    //     console.log(reject)
    //     res.json({ error: "Please enter a unique value for email !", message: reject.message })
    // })

    // obj = {
    //     name:"Asim",
    //     surname:"Afzal"
    // }
    // res.json(obj);

    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);



});


// ROUTE 2 : Authentiate a user using : POST /api/auth/login . No login required ! Without requiring Authentication !
// means login kare begair !

router.post("/login", [

    body('email', "Enter a valid email !").isEmail(),
    body('password', "Password cannot be empty !").exists()

], async (req, res) => {

    let success = false;

    //If there are errors return badrequest 404 and the errors while checking the above validation ! 

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        //  yad rakho ye findOne pura object return krta from db ... Aur parameter bhi object leta hai ... Aur try catch mai error.message krna acha rehta hai ... Error specify ho jata hai easily !
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, errors: "Please try with correct credentials !" })
        }

        const verifyPass = await bcrypt.compare(password, user.password);
        if (!verifyPass) {
            return res.status(400).json({ success, errors: "Please try with correct credentials !" })
        }

        // same phle wale end point ka

        //payload

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        // console.log(authtoken);

        success = true;
        res.json({ success, authtoken });  // equal to write authtoken:authtoken 


    }
    catch (error) {

        // same phle wale end point ka 
        console.error(error.message);
        // res.status(500).send("Some error occured");
        res.status(500).send("Internal Server Error !");
    }

});

// hum ne api k ye jo end points bane hain hum inhein use krein gy in our react app !

// ROUTE 3 : Getting loggedin user details using : POST /api/auth/getuser . Login Required !

router.post("/getuser", fetchUser, async (req, res) => {

    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId).select('-password');
        res.send(userDetails);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error !");
    }

});

module.exports = router