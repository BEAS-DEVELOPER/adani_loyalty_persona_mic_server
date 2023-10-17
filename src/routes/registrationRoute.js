const express = require('express');
const router  = express.Router(); 
const registrationController   = require('../controllers/registrationController');
const regValidtn = require('../validations/registerValidation');

router.post('/temporaryRegister',regValidtn._tempRegist, registrationController.tempRegistration) // AS OF NOW TEMPORARY REGISTRATIONS 
router.post('/basic/profile',registrationController.basicProfileRegistration);

module.exports = router;