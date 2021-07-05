const ReleaseRepository = require('../repository/mysql2/ReleaseRepository');

exports.getReleases = (req, res, next) => {
    ReleaseRepository.getReleases()
        .then(reles => {
            res.status(200).json(reles);
        })
        .catch(err => {
           console.log(err);
        });
};

exports.getReleaseById = (req, res, next) => {
    const releaseId = req.params.releaseId;
    ReleaseRepository.getReleaseById(releaseId)
        .then(release => {
            if(!release) {
                res.status(404).json({
                    message: 'Release with id: '+releaseId+' not found'
                })
            } else {
                res.status(200).json(release);
            }
        });
};

exports.createRelease = (req, res, next) => {
    ReleaseRepository.createRelease(req.body)
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

exports.updateRelease = (req, res, next) => {
    const releaseId = req.params.releaseId;
    ReleaseRepository.updateRelease(releaseId, req.body)
        .then(result => {
           res.status(200).json({message: 'Release updated!', release: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteRelease = (req, res, next) => {
    const relaseId = req.params.releaseId;
    ReleaseRepository.deleteRelease(releaseId)
        .then(result => {
            res.status(200).json({message: 'Removed release', release: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};