const prisma = require("../prisma/client");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");


// ===============================
// Signup
// ===============================
const signup = async (req, res) => {

    try {

        const {
            organizationName,
            email,
            password
        } = req.body;



        // Check existing user

        const existingUser =
        await prisma.user.findUnique({

            where:{
                email
            }

        });



        if(existingUser){

            return res.status(400).json({

                success:false,

                message:"Email already exists"

            });

        }



        // Create organization

        const organization =
        await prisma.organization.create({

            data:{

                name:organizationName

            }

        });



        // Hash password

        const hashedPassword =
        await bcrypt.hash(password,10);



        // Create user

        const user =
        await prisma.user.create({

            data:{

                email,

                password:hashedPassword,

                organizationId:organization.id

            }

        });



        const token =
        generateToken(user.id);



        return res.status(201).json({

            success:true,

            token,

            user:{

                id:user.id,

                email:user.email,

                organization:organization.name

            }

        });



    }
    catch(error){


        console.log(error);


        return res.status(500).json({

            success:false,

            message:"Server Error"

        });


    }

};






// ===============================
// Login
// ===============================

const login = async(req,res)=>{


    try{


        const {
            email,
            password
        } = req.body;




        const user =
        await prisma.user.findUnique({

            where:{
                email
            },

            include:{

                organization:true

            }

        });





        if(!user){

            return res.status(401).json({

                success:false,

                message:"Invalid credentials"

            });

        }





        const isMatch =
        await bcrypt.compare(

            password,

            user.password

        );





        if(!isMatch){

            return res.status(401).json({

                success:false,

                message:"Invalid credentials"

            });

        }





        const token =
        generateToken(user.id);





        return res.status(200).json({

            success:true,

            token,


            user:{

                id:user.id,

                email:user.email,

                organization:user.organization.name

            }

        });





    }
    catch(error){


        console.log(error);


        return res.status(500).json({

            success:false,

            message:"Server Error"

        });


    }


};






// ===============================
// Profile
// ===============================

const getProfile = async(req,res)=>{


    return res.status(200).json({

        success:true,

        user:{

            id:req.user.id,

            email:req.user.email,

            organization:req.user.organization

        }

    });


};





module.exports = {

    signup,

    login,

    getProfile

};