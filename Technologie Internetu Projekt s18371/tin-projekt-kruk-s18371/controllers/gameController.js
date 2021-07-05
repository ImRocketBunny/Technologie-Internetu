const GameRepository = require('../repository/mysql2/GameRepository');


exports.showGameList = (req, res, next) => {
    GameRepository.getGames()
    .then(games => {
        res.render('pages/Game/game-list', {
            games: games,
            navLocation: 'game'
        });
    });
}
exports.showAddGameForm = (req, res, next) => {
    res.render('pages/Game/game-form',{
    game:{},
    pageTitle: 'Nowa gra',
    formMode: 'createNew',
    btnLabel: 'Dodaj grę',
    formAction: '/game/add',
    navLocation: 'game',
    validationErrors: {}
    });
}
exports.showEditGameForm = (req, res, next) => {
    const gameId = req.params.gameId;
    GameRepository.getGameById(gameId)
    .then(game => {
        res.render('pages/Game/game-form', {
            game: game,
            formMode: 'edit',
            pageTitle: 'Edycja gry',
            btnLabel: 'Zapisz',
            formAction: '/game/edit',
            navLocation: 'game',
            validationErrors: {}
        });
    })
    
}
exports.showGameDetails = (req, res, next) => {
    const gameId = req.params.gameId;
    GameRepository.getGameById(gameId)
        .then(game => {
            res.render('pages/Game/game-form', {
                game: game,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły gry',
                formAction: '',
                navLocation: 'game',
                validationErrors: {}
            });
        })
    
}
exports.addGame = (req, res, next) => {
    const gameData = { ...req.body };
    GameRepository.createGame(gameData)
        .then( result => {
            res.redirect('/game');
        })
        .catch(err => {
            res.render('pages/Game/game-form', {
                game: gameData,
                gameData: gameData,
                pageTitle: 'Nowa gra',
                formMode: 'createNew',
                btnLabel: 'Dodaj grę',
                formAction: '/game/add',
                navLocation: 'game',
                validationErrors: err.details
            });
        });
};

exports.updateGame = (req, res, next) => {
    const gameId = req.body.idGry;
    const gameData = { ...req.body };
    GameRepository.updateGame(gameId, gameData)
    .then( result => {
        res.redirect('/game');
    })
    .catch(err => {
        GameRepository.getGameById(gameId)
        .then(game => {
            console.log(gameData);
            res.render('pages/Game/game-form', {
                game: game,
                gameData: gameData,
                formMode: 'edit',
                pageTitle: 'Edycja gry',
                btnLabel: 'Zapisz',
                formAction: '/game/edit',
                navLocation: 'game',
                validationErrors: err.details
            });
        })
    });
};

exports.deleteGame = (req, res, next) => {
    const gameId = req.params.gameId;
    GameRepository.deleteGame(gameId)
    .then( () => {
        res.redirect('/game');
    });
};