const express = require('express');
const router = express.Router();

const releaseController = require('../controllers/releaseController');

router.get('/', releaseController.showReleaseList);
router.get('/add', releaseController.showAddReleaseForm);
router.get('/edit/:releaseId', releaseController.showEditReleaseForm);
router.get('/details/:releaseId', releaseController.showReleaseDetails);
router.post('/add', releaseController.addRelease);
router.post('/edit', releaseController.updateRelease);
router.get('/delete/:releaseId', releaseController.deleteRelease);

module.exports = router;