const prisma = require("../config/prisma");



// ===============================
// CREATE PRODUCT
// ===============================

exports.createProduct = async(req,res)=>{


try{


const {

name,

sku,

description,

quantity,

costPrice,

sellingPrice,

lowStockThreshold


}=req.body;



const organizationId =
req.user.organizationId;





const existingProduct =
await prisma.product.findFirst({

where:{

sku,

organizationId

}

});




if(existingProduct){


return res.status(400).json({

success:false,

message:"SKU already exists"

});


}





const product =
await prisma.product.create({

data:{


name,

sku,

description:description || null,


quantity:Number(quantity),


costPrice:
costPrice !== undefined
? Number(costPrice)
:null,


sellingPrice:
sellingPrice !== undefined
? Number(sellingPrice)
:null,


lowStockThreshold:
lowStockThreshold !== undefined
? Number(lowStockThreshold)
:null,


organizationId


}


});





return res.status(201).json({

success:true,

message:"Product created successfully",

data:product

});



}
catch(error){


return res.status(500).json({

success:false,

message:"Server Error",

error:error.message

});


}


};








// ===============================
// GET ALL PRODUCTS
// ===============================

exports.getProducts = async(req,res)=>{


try{


const organizationId =
req.user.organizationId;



const {

search,

page=1,

limit=10

}=req.query;



const where={

organizationId

};




if(search){


where.OR=[

{

name:{
contains:search
}

},

{

sku:{
contains:search
}

}

];


}





const skip =
(Number(page)-1)
*
Number(limit);





const [products,total]=
await Promise.all([


prisma.product.findMany({

where,

skip,

take:Number(limit),

orderBy:{

createdAt:"desc"

}

}),



prisma.product.count({

where

})



]);






return res.status(200).json({

success:true,

data:products,


pagination:{

total,

page:Number(page),

limit:Number(limit),

totalPages:
Math.ceil(total/limit)

}


});




}
catch(error){


return res.status(500).json({

success:false,

message:"Server Error",

error:error.message

});


}



};









// ===============================
// GET SINGLE PRODUCT
// ===============================

exports.getProductById = async(req,res)=>{


try{


const product =
await prisma.product.findFirst({

where:{


id:Number(req.params.id),


organizationId:req.user.organizationId


}


});




if(!product){


return res.status(404).json({

success:false,

message:"Product not found"

});


}





return res.status(200).json({

success:true,

data:product

});



}
catch(error){


return res.status(500).json({

success:false,

message:"Server Error"

});


}


};









// ===============================
// UPDATE PRODUCT
// ===============================


exports.updateProduct = async(req,res)=>{


try{


const id =
Number(req.params.id);



const organizationId =
req.user.organizationId;



const existing =
await prisma.product.findFirst({

where:{

id,

organizationId

}

});




if(!existing){


return res.status(404).json({

success:false,

message:"Product not found"

});


}






const updated =
await prisma.product.update({

where:{

id

},


data:{


name:req.body.name,

sku:req.body.sku,

description:req.body.description || null,


quantity:
Number(req.body.quantity),



costPrice:
req.body.costPrice !== undefined
?
Number(req.body.costPrice)
:null,



sellingPrice:
req.body.sellingPrice !== undefined
?
Number(req.body.sellingPrice)
:null,



lowStockThreshold:
req.body.lowStockThreshold !== undefined
?
Number(req.body.lowStockThreshold)
:null


}


});





return res.status(200).json({

success:true,

message:"Product updated successfully",

data:updated

});



}
catch(error){


return res.status(500).json({

success:false,

message:"Server Error",

error:error.message

});


}


};









// ===============================
// DELETE PRODUCT
// ===============================


exports.deleteProduct = async(req,res)=>{


try{


const id =
Number(req.params.id);



const product =
await prisma.product.findFirst({

where:{

id,

organizationId:req.user.organizationId

}

});




if(!product){

return res.status(404).json({

success:false,

message:"Product not found"

});

}





await prisma.product.delete({

where:{

id

}

});




return res.status(200).json({

success:true,

message:"Product deleted successfully"

});



}
catch(error){


return res.status(500).json({

success:false,

message:"Server Error",

error:error.message

});


}


};









// ===============================
// LOW STOCK PRODUCTS
// ===============================

exports.getLowStockProducts = async(req,res)=>{


try{


const organizationId =
req.user.organizationId;



const organization =
await prisma.organization.findUnique({

where:{

id:organizationId

},

select:{

defaultLowStock:true

}

});



const products =
await prisma.product.findMany({

where:{

organizationId

}

});




const lowStockProducts =
products.filter(product=>{


const threshold =
product.lowStockThreshold ??
organization.defaultLowStock;



return product.quantity <= threshold;


});




return res.status(200).json({

success:true,

count:lowStockProducts.length,

data:lowStockProducts

});



}
catch(error){


return res.status(500).json({

success:false,

message:"Server Error",

error:error.message

});


}


};