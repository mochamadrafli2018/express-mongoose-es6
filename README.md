# Express (4.17.1), Mongoose (6.1.4) and MongoDB Portfolio for CRUD and Auth Application

## Requirement

1. Node.js
2. MongoDB Atlas
3. MongoDB GUI (MongoDBCompass)
4. Postman

## Set up

```
npm install
```

This command will be installing all the package that listed in package.json file.

## File .env

For development, create file named .env and make variable ATLAS_URI then assign these variable with MongoDB Atlas URL and JWT_SECRET.

Example :

`ATLAS_URI = mongodb+srv://admin:<password>@cluster0.8z0ls.mongodb.net/<database_name>?retryWrites=true&w=majority`
`MONGO_URI = mongodb://localhost:27017/express-rest-api`
`JWT_SECRET=Super_secret_string`

## Running for development

```
npm run dev
```

App will be running on port 5000 (http://localhost:5000).

### What is this Repository for?

This project was my undergraduate thesis for chatbot backend that build with express.js and sequelize with mysql connection.

### Clone this Repository ?

Feel free to clone this repo.

## API Endpoint

Open `./routes/routes.js`

## API Endpoint for Development 

http://127.0.0.1:5000

## Reference Documentation

Front End React with Axios : https://www.santrikoding.com/tutorial-authentication-dengan-reactjs-laravel-jwt-3-membuat-resful-api-authentication

React Express Auth : https://github.com/weibenfalk/jwtToken-react-express

React Express MongoDB Auth : https://github.com/trulymittal/API-Authentication-NodeJs

Express login, register, verify with JWT Token: https://www.topcoder.com/thrive/articles/authentication-and-authorization-in-express-js-api-using-jwt
