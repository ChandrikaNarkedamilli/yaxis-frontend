# Visa Application 

A full-stack MERN application that allows users to browse products under each category, add them to the cart, and proceed to checkout.
The application supports user authentication with jwt token, cart persistence, and order history tracking in profile.

TECH STACK USED :
-> Frontend : Next js + React js, css
-> Backend : Node js, Expressjs
-> Database : Mongo db atlas
-> authentication : jwt token 

SET UP instructions :
### Backend (Express + MongoDB)

1. Clone the repository:
2. install dependencies : npm install
3. .env file
included in mail

4.start backend server : npm start

### Frontend (Next js+ react js)
1. Clone the repository:
2. install dependencies : npm install
3.Start the development server: npm run dev
4. open in browser : http://localhost:3000



**Postman API Testing**

- `GET /products` → Fetch all products
- `POST /cart` → Add item to cart
- `GET /cart` → Get current cart
- `DELETE /cart/:itemId` → Remove item from cart
- `POST /cart/update` → Update quantity
- `POST /cart/checkout` → Place order (Requires auth)
- `GET /orders/user/:userId` → View user's past orders

Assumptions Made

-Initially a user can view home page , services, login & register, cart(needs to login to view)
- User should register to app before logging in
- when a user tries to add product to cart , alret is shown to login before proceeding
- After login success, he can view profile where user details and past orders will be there and cart items which are already present.
- User must be logged in to add items to the cart or proceed to checkout.
- Platform fee is fixed at ₹20 per order.
- Social work donation is added to cart total when clicked on button
- A 10% discount is applied automatically if items from two or more categories are added.
- Cart gets cleared only after successful checkout.
- Orders are saved and retrievable from the profile page.
  
Deployment urls:

frontend --> https://visa-app-rosy.vercel.app
backend --> https://yaxis-backend.onrender.com

existing user login credentials :
email : john@example.com
password : john123

API testing with postman
images attached within the mail


