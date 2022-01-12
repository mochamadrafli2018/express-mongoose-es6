# Express (4.17.1) and MongoDB Template for CRUD and Authentication Application

## Requirement

1. Node.js
2. MongoDB and MongoDB GUI (MongoDBCompass)
3. Postman

## Set up

`npm install`

This command will be installing all the package that listed in package.json file.

## Running for developing

`npm run dev`

App will be running on port 5000 (http://localhost:5000).

## Structure

├── config
│   ├── mongodb.config.js
├── controller
│   ├── controller.authentication.js
│   ├── controller.crud.js
├── model
│   ├── data.schema.js
│   ├── user.schema.js
├── routes
│   └── routes
├── views
│   └── index.ejs
└── app.js

## API CRUD

### /api

- `GET` : Get all data
- `POST` : Create a new data
- `DELETE` : Delete all data

### /api/:id

- `GET` : Get a data
- `PUT` : Update a data
- `DELETE` : Delete a data

## Postman Testing Link

https://go.postman.co/workspace/My-Workspace~c35575c8-8360-4da9-8db8-c0509f46f9ce/collection/13651770-24cd6129-66d8-44e7-a334-65658f984269

## Deploying command

`npm run start`

App will be running on deployed party's port.

# API Endpoint : http://127.0.0.1:5000
