const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController');

router.get('/', gameController.showGameList);
router.get('/add', gameController.showAddGameForm);
router.get('/edit/:gameId', gameController.showEditGameForm);
router.get('/details/:gameId', gameController.showGameDetails);
router.post('/add', gameController.addGame); 
router.post('/edit', gameController.updateGame);
router.get('/delete/:gameId', gameController.deleteGame);

module.exports = router;