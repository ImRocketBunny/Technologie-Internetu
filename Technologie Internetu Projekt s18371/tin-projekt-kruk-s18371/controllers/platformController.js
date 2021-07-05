const PlatformRepository = require('../repository/mysql2/PlatformRepository');

exports.showPlatformList = (req, res, next) => {
    PlatformRepository.getPlatforms()
        .then(platforms =>{
            res.render('pages/Platform/platform-list', {
                platforms: platforms,
                navLocation: 'platform'
            });
        });
   
}
exports.showAddPlatformForm = (req, res, next) => {
    res.render('pages/Platform/platform-form', {
        platform:{},
        pageTitle: 'Nowa platforma',
        formMode: 'createNew',
        btnLabel: 'Dodaj platformę',
        formAction: '/platform/add',
        navLocation: 'platform',
        validationErrors: {}
    });
}
exports.showEditPlatformForm = (req, res, next) => {
    const platformId = req.params.platformId;
    PlatformRepository.getPlatformById(platformId)
    .then(platform => {
        res.render('pages/Platform/platform-form', {
            platform: platform,
            formMode: 'edit',
            pageTitle: 'Edycja platformy',
            btnLabel: 'Edytuj platformę',
            formAction: '/platform/edit',
            navLocation: 'platform',
            validationErrors: {}

        });
    });
}
exports.showPlatformDetails = (req, res, next) => {
    const platformId = req.params.platformId;
    PlatformRepository.getPlatformById(platformId)
        .then(platform => {
            res.render('pages/Platform/platform-form', {
                platform: platform,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły platofrmy',
                formAction: '',
                navLocation: 'platform',
                validationErrors: {}
            });
        })
    
}

exports.addPlatform = (req, res, next) => {
    const platformData = { ...req.body };
    PlatformRepository.createPlatform(platformData)
        .then( result => {
            res.redirect('/platform');
        })
        .catch(err => {
            res.render('pages/Platform/platform-form', {
                platform: platformData,
                platformData: platformData,
                pageTitle: 'Nowa platforma',
                formMode: 'createNew',
                btnLabel: 'Dodaj platformę',
                formAction: '/platform/add',
                navLocation: 'platform',
                validationErrors: err.details
            });
        });
};

exports.updatePlatform = (req, res, next) => {
    const platformId = req.body.idPlatformy;
    const platformData = { ...req.body };
    PlatformRepository.updatePlatform(platformId, platformData)
    .then( result => {
        res.redirect('/platform');
    })
    .catch(err => {
        PlatformRepository.getPlatformById(platformId)
        .then(platform => {
            res.render('pages/Platform/platform-form', {
                platform: platform,
                platformData: platformData,
                formMode: 'edit',
                pageTitle: 'Edycja platformy',
                btnLabel: 'Edytuj platformę',
                formAction: '/platform/edit',
                navLocation: 'platform',
                validationErrors: err.details

            });
        })
    });
};

exports.deletePlatform = (req, res, next) => {
    const platformId = req.params.platformId;
PlatformRepository.deletePlatform(platformId)
    .then( () => {
        res.redirect('/platform');
    });
};