const prisma = require("../config/prisma");



/*
 GET ORGANIZATION SETTINGS

 GET /api/settings
*/
const getSettings = async (req, res) => {

    try {

        const organizationId = req.user.organizationId;


        const organization = await prisma.organization.findUnique({

            where: {
                id: organizationId
            },

            select: {
                id: true,
                name: true,
                defaultLowStock: true
            }

        });



        if (!organization) {

            return res.status(404).json({

                success: false,

                message: "Organization not found"

            });

        }



        return res.status(200).json({

            success: true,

            settings: organization

        });



    } catch(error) {


        return res.status(500).json({

            success:false,

            message:"Failed to fetch settings",

            error:error.message

        });


    }

};





/*
 UPDATE ORGANIZATION SETTINGS

 PUT /api/settings
*/
const updateSettings = async(req,res)=>{


    try {


        const organizationId =
        req.user.organizationId;


        const {
            defaultLowStock
        } = req.body;



        if(defaultLowStock === undefined){

            return res.status(400).json({

                success:false,

                message:"Default low stock value required"

            });

        }



        const value = Number(defaultLowStock);



        if(Number.isNaN(value) || value < 0){

            return res.status(400).json({

                success:false,

                message:"Invalid low stock threshold"

            });

        }



        const organization =
        await prisma.organization.update({

            where:{
                id:organizationId
            },

            data:{
                defaultLowStock:value
            },

            select:{
                id:true,
                name:true,
                defaultLowStock:true
            }

        });



        return res.status(200).json({

            success:true,

            message:"Settings updated successfully",

            settings:organization

        });



    } catch(error){


        return res.status(500).json({

            success:false,

            message:"Failed to update settings",

            error:error.message

        });


    }


};




module.exports = {
    getSettings,
    updateSettings
};