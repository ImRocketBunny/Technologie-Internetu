const db = require('../../config/mysql2/db');
const platformSchema = require('../../model/joi/Platform');

exports.getPlatforms = () => {
    return db.promise().query('SELECT * FROM Platforma')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getPlatformById = (PlatformId) => {
    const query = `SELECT p.idPlatformy as idPlatformy, p.nazwa, p.producent, wyd.idWydania as wyd_idWydania,
    wyd.dataPremiery, wyd.cena, wyd.wersja, gra.idGry as gra_idGry, gra.nazwaG, gra.gatunek, gra.edycja 
FROM Platforma p 
left join Wydanie wyd on wyd.platform_id = p.idPlatformy
left join Gra gra on wyd.game_id = gra.idGry
where p.idPlatformy = ?`
return db.promise().query(query, [PlatformId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const platforma = {
            idPlatformy: parseInt(PlatformId),
            name: firstRow.nazwa,
            producer: firstRow.producent,
            releases: []
        }
        for( let i=0; i<results[0].length; i++ ) {
            const row = results[0][i];
            if(row.wyd_idWydania) {
                const release = {
                    idWydania: row.wyd_idWydania,
                    releaseDate: row.dataPremiery,
                    price: row.cena,
                    version: row.wersja,
                    gra: {
                        idGry: row.gra_idGry,
                        nazwa: row.nazwaG,
                        gatunek: row.gatunek,
                        edycja: row.edycja
                    }
                };
                platforma.releases.push(release);
            }
        }
        return platforma;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.createPlatform = (newPlatformData) => {
    const vRes = platformSchema.validate(newPlatformData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    const nazwa = newPlatformData.nazwa;
    const producent = newPlatformData.producent;
    const sql = 'INSERT into Platforma (nazwa, producent) VALUES (?, ?)'
    return db.promise().execute(sql, [nazwa, producent]);
};

exports.updatePlatform = (platformId, platformData) => {
    const vRes = platformSchema.validate(platformData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
const nazwa = platformData.nazwa;
const producent = platformData.producent;
const sql = `UPDATE Platforma set nazwa = ?, producent = ? where idPlatformy = ?`;
return db.promise().execute(sql, [nazwa, producent, platformId]);
};

exports.deletePlatform = (platformId) => {
const sql1 = 'DELETE FROM Wydanie where platform_id = ?'
const sql2 = 'DELETE FROM Platforma where idPlatformy = ?'
return db.promise().execute(sql1, [platformId])
    .then(() => {
        return db.promise().execute(sql2, [platformId])
    });
};
