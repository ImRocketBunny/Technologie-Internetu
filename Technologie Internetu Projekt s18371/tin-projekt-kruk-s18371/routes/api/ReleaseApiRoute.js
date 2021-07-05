const express = require('express');
const router = express.Router();

const releaseApiController = require('../../api/ReleaseAPI');

router.get('/', releaseApiController.getReleases);
router.get('/:releaseId', releaseApiController.getReleaseById);
router.post('/', releaseApiController.createRelease);
router.put('/:releaseId', releaseApiController.updateRelease);
router.delete('/:releaseId', releaseApiController.deleteRelease);

module.exports = router;