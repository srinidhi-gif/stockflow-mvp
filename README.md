# StockFlow MVP Backend 🚀


SaaS Inventory Management System Backend.

Built with:

- Node.js
- Express.js
- Prisma ORM
- MySQL
- JWT Authentication



# Features

## Authentication

- User Signup
- User Login
- JWT Authentication
- Organization isolation


## Products

- Create Product
- Get Products
- Search Products
- Update Product
- Delete Product
- Low Stock Detection


## Dashboard

- Total Products
- Total Stock
- Inventory Value
- Low Stock Count


## Settings

- Update Default Low Stock Threshold



# Installation


Clone repository:


git clone <repository-url>


Install dependencies:


npm install



Create .env file:


cp .env.example .env



Run Prisma:


npx prisma migrate dev


Start server:


npm run dev



Server:

http://localhost:5000



# Authentication Flow


Signup/Login returns JWT token.


Send token:


Authorization: Bearer TOKEN



# API Documentation


## Authentication


### Signup

POST

/api/auth/signup


Body:

{
"organizationName":"ABC Store",
"email":"admin@gmail.com",
"password":"123456"
}




### Login


POST

/api/auth/login


Body:

{
"email":"admin@gmail.com",
"password":"123456"
}




## Products


### Create Product


POST

/api/products


Headers:

Authorization: Bearer TOKEN



Body:


{
"name":"Laptop",
"sku":"LP100",
"quantity":10,
"costPrice":500,
"sellingPrice":700,
"lowStockThreshold":5
}





### Get Products


GET

/api/products



Query:


?page=1

&limit=10

&search=laptop




### Update Product


PUT

/api/products/:id





### Delete Product


DELETE

/api/products/:id




## Dashboard


GET

/api/dashboard/overview





## Low Stock


GET

/api/products/low-stock





## Settings


GET

/api/settings


PUT

/api/settings