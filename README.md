# Express (4.17.1) and MongoDB Template for CRUD and Authentication Application

## Requirement

1. Node.js
2. MongoDB Atlas
3. MongoDB GUI (MongoDBCompass)
4. Postman

## Set up

`npm install`

This command will be installing all the package that listed in package.json file.

## File .env

For development, make file .env and make variable ATLAS_URI then assign these variable with MongoDB Atlas URL.

Example :

`ATLAS_URI = mongodb+srv://admin:<password>@cluster0.8z0ls.mongodb.net/<database_name>?retryWrites=true&w=majority`

## Running for developing

`npm run dev`

App will be running on port 5000 (http://localhost:5000).

## API Endpoint

### CRUD Application

#### /api

- `GET` : Get all data
- `POST` : Create a new data
- `DELETE` : Delete all data

#### /api/:id

- `GET` : Get a data
- `PUT` : Update a data
- `DELETE` : Delete a data

### API AUTH (SIGN IN, SIGN UP)

#### /api/register

- `POST` : Create new user data

#### /api/login

- `POST` : User login

#### /api/verify

- `GET` : Verify token

- `Authorization: Bearer JWT_ACCESS_TOKEN`

## Reference

Front End React with Axios : https://www.santrikoding.com/tutorial-authentication-dengan-reactjs-laravel-jwt-3-membuat-resful-api-authentication

React Express Auth : https://github.com/weibenfalk/jwtToken-react-express

React Express MongoDB Auth : https://github.com/trulymittal/API-Authentication-NodeJs

Express login, register, verify with JWT Token: https://www.topcoder.com/thrive/articles/authentication-and-authorization-in-express-js-api-using-jwt

## Deploying command

`npm run start`

App will be running on deployed party's port.

# API Endpoint : http://127.0.0.1:5000
