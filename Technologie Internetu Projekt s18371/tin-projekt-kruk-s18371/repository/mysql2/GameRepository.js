const db = require('../../config/mysql2/db');
const gameSchema = require('../../model/joi/Game');


exports.getGames = () => {
    return db.promise().query('SELECT * FROM Gra')
    .then( (results, fields) => {
        console.log(results[0]);
        return results[0];
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

exports.getGameById = (GameId) => {
    const query = `SELECT e.idGry as idGry, e.nazwaG, e.gatunek, e.edycja, wyd.idWydania as wyd_idWydania,
        wyd.dataPremiery, wyd.cena, wyd.wersja, plat.idPlatformy as plat_idPaltformy, plat.nazwa, plat.producent 
    FROM Gra e 
    left join Wydanie wyd on wyd.game_id = e.idGry
    left join Platforma plat on wyd.platform_id = plat.idPlatformy
    where e.idGry = ?`
return db.promise().query(query, [GameId])
    .then( (results, fields) => {
        const firstRow = results[0][0];
        if(!firstRow) {
            return {};
        }
        const gra = {
            idGry: parseInt(GameId),
            name: firstRow.nazwaG,
            category: firstRow.gatunek,
            edition: firstRow.edycja,
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
                    platforma: {
                        idPlatformy: row.plat_idPaltformy,
                        name: row.nazwa,
                        budget: row.producent
                    }
                };
                gra.releases.push(release);
            }
        }
        return gra;
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

/*exports.createGame = (newGameData) => {
const nazwa = newGameData.nazwa;
const gatunek = newGameData.gatunek;
const edycja = newGameData.edycja;
const sql = 'INSERT into Gra (nazwaG, gatunek, edycja) VALUES (?, ?, ?)'
return db.promise().execute(sql, [nazwa, gatunek, edycja]);
};*/

exports.createGame = (newGameData) => {
    const vRes = gameSchema.validate(newGameData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
    const nazwa = newGameData.nazwa;
    const gatunek = newGameData.gatunek;
    const edycja = newGameData.edycja;
    const sql = 'INSERT into Gra (nazwaG, gatunek, edycja) VALUES (?, ?, ?)'
    return db.promise().execute(sql, [nazwa, gatunek, edycja]);
};

exports.updateGame = (gameId, gameData) => {
    const vRes = gameSchema.validate(gameData, { abortEarly: false} );
    if(vRes.error) {
        return Promise.reject(vRes.error);
    }
const nazwa = gameData.nazwa;
const gatunek = gameData.gatunek;
const edycja = gameData.edycja;
const sql = `UPDATE Gra set nazwaG = ?, gatunek = ?, edycja = ? where idGry = ?`;
return db.promise().execute(sql, [nazwa, gatunek, edycja, gameId]);
};

exports.deleteGame = (gameId) => {

const sql1 = 'DELETE FROM Wydanie where game_id = ?'
const sql2 = 'DELETE FROM Gra where idGry = ?'

return db.promise().execute(sql1, [gameId])
    .then(() => {
        return db.promise().execute(sql2, [gameId])
    });
};