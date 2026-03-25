const jwt  = require("jsonwebtoken")


const testmiddleware= (req,res,next)=>{

    const authheader = req.headers.authorization;


    if(!authheader){
        return res.json("token is not found")
    }

    const token = authheader.split(" ")[1];
    try{
    
        const decode = jwt.verify(token,"ABC");
        req.person = decode;
           next();
    }
    catch(err){
        return res.json({ message: "Invalid token" });
    }
   
   
}

module.exports = testmiddleware;