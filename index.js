const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require("path");
require('dotenv').config()
const port = process.env.PORT_NUMBER;

const passport = require('passport')
require('./passport-config');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


/*_______________SWAGER_________________*/
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const adminserviceswaggerJsdoc = YAML.load("./apiDoc/adminservice.yaml"); // adminservice
app.use("/apiDoc/adani_microservic_1", swaggerUI.serve, swaggerUI.setup(adminserviceswaggerJsdoc))
/*_______________SWAGER  END_________________*/

// SERVICES BASE URL
const registrationProfileNode_baseUrl = process.env.registrationProfileNode_baseUrl;
const masterNodebaseUrl = process.env.masterNode_baseUrl;
const loginAuthNode_baseUrl = process.env.loginAuthNode_baseUrl;

// REGISTRATION  ROUTES
const masterRoute = require('./src/routes/masterRoute');
const registrationRoute = require('./src/routes/registrationRoute');
const authnRoute = require('./src/routes/authnRoute');

//============ WELCOME TO HOME  ===============
app.use("/server", (req, res) => {
    // sdk.start();
    res.end("<h1 style='text-align:center;color:white;background-color:red'>Welcome to  backend registrationProfileNode_9001 server </h1>")
})

app.use('/api/v1/registrationProfileNode/images/pan', express.static('uploads/verificationImages/pan'));
app.use('/api/v1/registrationProfileNode/images/aadhar/DL/voter/back', express.static('uploads/verificationImages/aadharDLVoter/back'));
app.use('/api/v1/registrationProfileNode/images/aadhar/DL/voter/front', express.static('uploads/verificationImages/aadharDLVoter/front'));

// registrationProfileNode ROUTES  EXECUTIONS 
 //   REGISTRATION  ROUTER
app.use(loginAuthNode_baseUrl, authnRoute);
app.use(registrationProfileNode_baseUrl, registrationRoute);
app.use(masterNodebaseUrl, masterRoute);


// SERVER STARTING 
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => { console.log(" ===================== SERVER IS RUNNING ON PORT =================", port); })
