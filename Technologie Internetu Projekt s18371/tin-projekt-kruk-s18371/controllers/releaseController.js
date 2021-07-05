const ReleaseRepository = require('../repository/mysql2/ReleaseRepository');
const GameRepository = require('../repository/mysql2/GameRepository');
const PlatformRepository = require('../repository/mysql2/PlatformRepository');

exports.showReleaseList = (req, res, next) => {
    ReleaseRepository.getReleases()
        .then(releases =>{
            
            res.render('pages/Release/graNaWyd-list', {
                releases: releases,
                navLocation: 'release'
            });
        });
}
exports.showAddReleaseForm = (req, res, next) => {
    let allGames, allPlatforms;
    GameRepository.getGames()
        .then(games => {
            allGames = games;
            return PlatformRepository.getPlatforms();
        })
        .then(platforms => {
            allPlatforms = platforms;
            res.render('pages/Release/graNaWyd-form', {
                release: {},
                formMode: 'createNew',
                allGames: allGames,
                allPlatforms: allPlatforms,
                pageTitle: 'Nowe wydanie',
                btnLabel: 'Dodaj wydanie',
                formAction: '/release/add',
                navLocation: 'release',
                validationErrors: {}
            });
        });
}
exports.showEditReleaseForm = (req, res, next) => {
    let allGames, allPlatforms;
    GameRepository.getGames()
    .then(games => {
        allGames = games;
        
    })
    PlatformRepository.getPlatforms()
    .then(platforms => {
        allPlatforms = platforms;
    });
    const releaseId = req.params.releaseId;
    ReleaseRepository.getReleaseById(releaseId)
    .then(release => {
        res.render('pages/Release/graNaWyd-form', {
            release: release,
            formMode: 'edit',
            allGames: allGames,
            allPlatforms: allPlatforms,
            pageTitle: 'Edycja wydania',
            btnLabel: 'Edytuj wydanie',
            formAction: '/release/edit',
            navLocation: 'release',
            validationErrors: {}
        });
    });
}
exports.showReleaseDetails = (req, res, next) => {
    let allGames, allPlatforms;
    GameRepository.getGames()
    .then(games => {
        allGames = games;
        
    })
    PlatformRepository.getPlatforms()
    .then(platforms => {
        allPlatforms = platforms;
    });
    const releaseId = req.params.releaseId;
    ReleaseRepository.getReleaseById(releaseId)
    .then(release => {
        res.render('pages/Release/graNaWyd-form', {
            release: release,
            formMode: 'showDetails',
            allGames: allGames,
            allPlatforms: allPlatforms,
            pageTitle: 'Szczegóły wydania',
            formAction: '',
            navLocation: 'release',
            validationErrors: {}
        });
    });
}
exports.addRelease = (req, res, next) => {
    const releaseData = { ...req.body };
    ReleaseRepository.createRelease(releaseData)
        .then( result => {
            res.redirect('/release');
        }).catch(err =>{
            let allGames, allPlatforms;
        GameRepository.getGames()
            .then(games => {
                allGames = games;
                return PlatformRepository.getPlatforms();
            })
            .then(platforms => {
                allPlatforms = platforms;
                res.render('pages/Release/graNaWyd-form', {
                    release: releaseData,
                    releaseData: releaseData,
                    formMode: 'createNew',
                    allGames: allGames,
                    allPlatforms: allPlatforms,
                    pageTitle: 'Nowe wydanie',
                    btnLabel: 'Dodaj wydanie',
                    formAction: '/release/add',
                    navLocation: 'release',
                    validationErrors: err.details
                });
            });
        })
};

exports.updateRelease = (req, res, next) => {
    const releaseId = req.body.idWydania;
    const releaseData = { ...req.body };
    ReleaseRepository.updateRelease(releaseId, releaseData)
    .then( result => {
        res.redirect('/release');
    }).catch(err=>{
        let allGames, allPlatforms;
    GameRepository.getGames()
    .then(games => {
        allGames = games;
        
    })
    PlatformRepository.getPlatforms()
    .then(platforms => {
        allPlatforms = platforms;
    });
    ReleaseRepository.getReleaseById(releaseId)
    .then(release => {
        console.log(releaseData);
        res.render('pages/Release/graNaWyd-form', {
            release: release,
            releaseData: releaseData,
            formMode: 'edit',
            allGames: allGames,
            allPlatforms: allPlatforms,
            pageTitle: 'Edycja wydania',
            btnLabel: 'Edytuj wydanie',
            formAction: '/release/edit',
            navLocation: 'release',
            validationErrors: err.details
        });
    });
    })
};

exports.deleteRelease = (req, res, next) => {
    const releaseId = req.params.releaseId;
ReleaseRepository.deleteRelease(releaseId)
    .then( () => {
        res.redirect('/release');
    });
};