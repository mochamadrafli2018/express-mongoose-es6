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

For development, create file named .env and make variable ATLAS_URI then assign these variable with MongoDB Atlas URL and JWT_SECRET.

Example :

`ATLAS_URI = mongodb+srv://admin:<password>@cluster0.8z0ls.mongodb.net/<database_name>?retryWrites=true&w=majority`
`MONGO_URI = mongodb://localhost:27017/express-rest-api`
`JWT_SECRET=Super_secret_string`

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

### AUTH Application

#### /api/register

- `POST` : Create new user data

#### /api/login

- `POST` : User login (user authentication)

#### /api/verify

- `GET` : Verify token (user authorization)
- `Authorization: Bearer JWT_ACCESS_TOKEN`

## API Endpoint for Development 

http://127.0.0.1:5000
## Deploying command

`npm run start`

App will be running on deployed party's port.

## Reference

Front End React with Axios : https://www.santrikoding.com/tutorial-authentication-dengan-reactjs-laravel-jwt-3-membuat-resful-api-authentication

React Express Auth : https://github.com/weibenfalk/jwtToken-react-express

React Express MongoDB Auth : https://github.com/trulymittal/API-Authentication-NodeJs

Express login, register, verify with JWT Token: https://www.topcoder.com/thrive/articles/authentication-and-authorization-in-express-js-api-using-jwt
