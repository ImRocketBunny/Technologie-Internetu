const express = require('express');
const router = express.Router();

const platformController = require('../controllers/platformController');

router.get('/', platformController.showPlatformList);
router.get('/add', platformController.showAddPlatformForm);
router.get('/edit/:platformId', platformController.showEditPlatformForm);
router.get('/details/:platformId', platformController.showPlatformDetails);
router.post('/add', platformController.addPlatform); 
router.post('/edit', platformController.updatePlatform);
router.get('/delete/:platformId', platformController.deletePlatform);

module.exports = router;