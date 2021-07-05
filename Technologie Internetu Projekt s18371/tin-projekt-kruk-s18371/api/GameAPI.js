const GameRepository = require('../repository/mysql2/GameRepository');

exports.getGames = (req, res, next) => {
    GameRepository.getGames()
        .then(games => {
            res.status(200).json(games);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getGameById = (req, res, next) => {
    const gameId = req.params.gameId;
    GameRepository.getGameById(gameId)
        .then(game => {
            if(!game) {
                res.status(404).json({
                    message: 'Game with id: '+gameID+' not found'
                })
            } else {
                res.status(200).json(game);
            }
        });
};

exports.createGame = (req, res, next) => {
    GameRepository.createGame(req.body)
        .then(newObj => {
           res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateGame = (req, res, next) => {
    const gameId = req.params.gameId;
    GameRepository.updateGame(gameId, req.body)
        .then(result => {
           res.status(200).json({message: 'Game updated!', game: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteGame = (req, res, next) => {
    const gameId = req.params.gameId;
    GameRepository.deleteGame(gameId)
        .then(result => {
            res.status(200).json({message: 'Removed game', game: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};