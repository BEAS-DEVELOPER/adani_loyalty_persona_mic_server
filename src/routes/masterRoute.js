const express = require('express');
const router = express.Router();
const masterController = require('../controllers/masterController');

router.get('/all/languages', masterController.findAllLanguages);
router.post('/create/languages', masterController.createLanguages);
router.get('/all/hierarchies/:org_id', masterController.findAllHierarchies);
router.post('/create/hierarchies', masterController.createHierarchies);
router.post('/create/countries', masterController.createCountries);
router.get('/all/countries', masterController.findAllCountries);
router.post('/create/states', masterController.createStates);
router.get('/all/states', masterController.findAllStates);
router.post('/create/cities', masterController.createCities);
router.get('/all/cities', masterController.findAllCities);
router.post('/create/organizations', masterController.createOrganizations);
router.get('/all/organizations', masterController.findAllOrganizations);
router.get('/all/branches/:city_id/:state_id', masterController.findAllBranches);
router.get('/all/TSOs/:branch_id', masterController.findAllTSOs);

module.exports = router;
