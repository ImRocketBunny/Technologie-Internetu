const express = require('express');
const router = express.Router();

const platformApiController = require('../../api/PlatformAPI');

router.get('/', platformApiController.getPlatforms);
router.get('/:platformId', platformApiController.getPlatformById);
router.post('/', platformApiController.createPlatform);
router.put('/:platformId', platformApiController.updatePlatform);
router.delete('/:platformId', platformApiController.deletePlatform);

module.exports = router;