const PlatformRepository = require('../repository/mysql2/PlatformRepository');

exports.getPlatforms = (req, res, next) => {
    PlatformRepository.getPlatforms()
        .then(platforms => {
            res.status(200).json(platforms);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getPlatformById = (req, res, next) => {
    const platformId = req.params.platformId;
    PlatformRepository.getPlatformById(platformId)
        .then(platform => {
            if(!platform) {
                res.status(404).json({
                    message: 'Platform with id: '+platformID+' not found'
                })
            } else {
                res.status(200).json(platform);
            }
        });
};

exports.createPlatform = (req, res, next) => {
    PlatformRepository.createPlatform(req.body)
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

exports.updatePlatform = (req, res, next) => {
    const platformId = req.params.platformId;
    PlatformRepository.updatePlatform(platformId, req.body)
        .then(result => {
           res.status(200).json({message: 'Platform updated!', platform: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deletePlatform = (req, res, next) => {
    const platformId = req.params.platformId;
    PlatformRepository.deletePlatform(platformId)
        .then(result => {
            res.status(200).json({message: 'Removed platform', platform: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};