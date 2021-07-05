const db = require('../../config/mysql2/db');
const releaseSchema = require('../../model/joi/Release');

exports.getReleases = () => {
    const query = `SELECT wyd.idWydania as wyd_idWydania, wyd.dataPremiery, wyd.cena, wyd.wersja, plat.idPlatformy as plat_idPlatformy, plat.nazwa,
            plat.producent, e.idGry as game_idGry, e.nazwaG, e.gatunek, e.edycja
        FROM Wydanie wyd 
        left join Gra e on wyd.game_id = e.idGry
        left join Platforma plat on wyd.platform_id = plat.idPlatformy`
    return db.promise().query(query)
        .then( (results, fields) => {
            const wydania = [];
            for(let i=0; i<results[0].length; i++) {
                const row = results[0][i];
                var data = new Date(row.dataPremiery);
                data.setDate(data.getDate()+1);
                const wydanie = {
                    idWydania: row.wyd_idWydania,
                    releaseDate: data,
                    price: row.cena,
                    version: row.wersja,
                    platforma: {
                        idPlatformy: row.plat_idPlatformy,
                        name: row.nazwa,
                        producer: row.producent
                    },
                    gra: {
                        idGry: row.game_idGry,
                        name: row.nazwaG,
                        category: row.gatunek,
                        edition: row.edycja
                    }
                };
                wydania.push(wydanie);
            }
            console.log(wydania);
            return wydania;
        })
        .catch(err => {
            console.log(err);
        });
};


exports.getReleaseById = (wyd_idWydania) => {
    const query = `SELECT wyd.idWydania as wyd_idWydania, wyd.dataPremiery, wyd.cena, wyd.wersja, plat.idPlatformy as plat_idPlatformy, plat.nazwa,
    plat.producent, e.idGry as game_idGry, e.nazwaG, e.gatunek, e.edycja
    FROM Wydanie wyd 
    left join Gra e on wyd.game_id = e.idGry
    left join Platforma plat on wyd.platform_id = plat.idPlatformy
        where wyd.idWydania = ?`
    return db.promise().query(query, [wyd_idWydania])
        .then( (results, fields) => {
            const row = results[0][0];
            if(!row) {
                return {};
            }
            var data = new Date(row.dataPremiery);
                data.setDate(data.getDate()+1);
            const wydanie = {
                idWydania: row.wyd_idWydania,
                releaseDate: data,
                price: row.cena,
                version: row.wersja,
                platforma: {
                    idPlatformy: row.plat_idPlatformy,
                    name: row.nazwa,
                    producer: row.producent
                },
                gra: {
                    idGry: row.game_idGry,
                    name: row.nazwaG,
                    category: row.gatunek,
                    edition: row.edycja
                }
            };
            console.log(wydanie);
            return wydanie;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

exports.createRelease = (data) => {
    const vRes = releaseSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    console.log('createWydanie');
    console.log(data);
    

    const sql = 'INSERT into Wydanie (game_id, platform_id, dataPremiery, cena, wersja) VALUES (?, ?, ?, ?, ?)';
    return db.promise().execute(sql, [data.gra, data.platforma, data.releaseDate, data.price, data.version]);
};

exports.updateRelease = (idWydania, data) => {
    const vRes =releaseSchema.validate(data, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    const sql = `UPDATE Wydanie set game_id = ?, platform_id = ?, dataPremiery = ?, cena = ?, wersja = ? where idWydania = ?`;
    return db.promise().execute(sql, [data.gra, data.platforma, data.releaseDate, data.price, data.version, idWydania]);
}

exports.deleteRelease = (idWydania) => {
    const sql = 'DELETE FROM Wydanie where idWydania = ?'
    return db.promise().execute(sql, [idWydania]);
}

exports.deleteManyReleases = (idWydan) => {
    const sql = 'DELETE FROM Wydanie where idWydania IN (?)'
    return db.promise().execute(sql, [idWydan]);
}