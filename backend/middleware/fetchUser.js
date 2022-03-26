const jwt = require('jsonwebtoken');
JWT_SECRET = "Asimisstrugglingtolearncoding$";

// middle ware wo function hota hai jo jb js pr authenticate(login) hona zaroori ho us pr req jae tw run hota hai

// middle ware mai req,res,next hote --- next isliye ta kh agy async(req,res) pe jae in auth.js 

const fetchUser = (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token!" }); // 401 : Unauthorized error
    }

    // agr invalid token aa jae verify mai tw isliye try catch lagaya

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;

        next();
    }
    catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token!" }); // 401 : Unauthorized error
    }

}

module.exports = fetchUser;