const jwt = require("jsonwebtoken");

const prisma =
require("../prisma/client");



const protect = async(req,res,next)=>{


try{


let token;



if(
req.headers.authorization &&
req.headers.authorization.startsWith("Bearer")
){


token =
req.headers.authorization.split(" ")[1];


}



if(!token){


return res.status(401).json({

success:false,

message:"Not authorized. Token missing"

});


}





const decoded =
jwt.verify(
token,
process.env.JWT_SECRET
);





const user =
await prisma.user.findUnique({

where:{
id:decoded.id
},

include:{

organization:true

}

});





if(!user){


return res.status(401).json({

success:false,

message:"User no longer exists"

});


}





req.user = user;



next();



}
catch(error){


next(error);


}



};



module.exports = {
    protect
};