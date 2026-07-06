const prisma = require("../config/prisma");



/**
 * DASHBOARD OVERVIEW
 *
 * GET /api/dashboard/overview
 */
exports.getDashboardOverview = async(req,res)=>{


    try{


        const organizationId =
        req.user.organizationId;



        /*
            Get organization settings
        */

        const organization =
        await prisma.organization.findUnique({

            where:{
                id:organizationId
            },

            select:{
                defaultLowStock:true
            }

        });



        const defaultThreshold =
        organization?.defaultLowStock ?? 5;



        /*
            Fetch organization products only
        */

        const products =
        await prisma.product.findMany({

            where:{
                organizationId
            },

            orderBy:{
                createdAt:"desc"
            }

        });



        const totalProducts =
        products.length;



        const totalStock =
        products.reduce(

            (sum,product)=>
            sum + product.quantity,

            0

        );




        const totalInventoryValue =
        products.reduce(

            (sum,product)=>

            sum +
            (
                (product.costPrice || 0)
                *
                product.quantity
            ),

            0

        );




        /*
            Low Stock Logic

            Product threshold exists?
                 |
                 YES -> use it

                 NO
                 |
                 Organization default
        */


        const lowStockProducts =
        products.filter(product=>{


            const threshold =
            product.lowStockThreshold ??
            defaultThreshold;



            return product.quantity <= threshold;


        })
        .map(product=>({


            id:product.id,

            name:product.name,

            sku:product.sku,

            quantity:product.quantity,

            lowStockThreshold:
            product.lowStockThreshold ??
            defaultThreshold


        }));




        const outOfStockCount =
        products.filter(

            product =>
            product.quantity === 0

        ).length;




        return res.status(200).json({

            success:true,


            data:{


                totalProducts,


                totalStock,


                totalInventoryValue,


                lowStockCount:
                lowStockProducts.length,


                outOfStockCount,



                lowStockProducts


            }


        });



    }
    catch(error){


        return res.status(500).json({

            success:false,

            message:"Dashboard error",

            error:error.message

        });


    }


};