const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const regValidtn = require('../validations/registerValidation');
var multer = require('multer');

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         if (file.fieldname == "pan_image") {
//             cb(null, './uploads/verificationImages/pan');
//         } else if (file.fieldname == "front_image") {
//             cb(null, './uploads/verificationImages/aadharDLVoter/front');
//         } else if (file.fieldname == "back_image") {
//             cb(null, './uploads/verificationImages/aadharDLVoter/back');
//         } else {
//             cb(null, './uploads/verificationImages');
//         }
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + file.originalname);
//     }
// });

// var uploads = multer({ storage: storage });

router.post('/temporaryRegister', regValidtn._tempRegist, registrationController.tempRegistration) // AS OF NOW TEMPORARY REGISTRATIONS 
// router.post('/basic/profile', registrationController.basicProfileRegistration);
// router.post('/additional/profile', uploads.fields([{ name: 'pan_image', maxCount: 1 }, { name: 'front_image', maxCount: 1 }, { name: 'back_image', maxCount: 1 }]), registrationController.addProfileRegistration);
// router.post('/sale/register', registrationController.saleRegistration);
// router.post('/login', registrationController.login);

module.exports = router;