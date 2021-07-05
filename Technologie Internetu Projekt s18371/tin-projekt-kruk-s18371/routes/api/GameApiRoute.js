const express = require('express');
const router = express.Router();

const gameApiController = require('../../api/GameAPI');

router.get('/', gameApiController.getGames);
router.get('/:gameId', gameApiController.getGameById);
router.post('/', gameApiController.createGame);
router.put('/:gameId', gameApiController.updateGame);
router.delete('/:gameId', gameApiController.deleteGame);

module.exports = router;