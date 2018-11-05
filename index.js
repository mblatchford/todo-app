const pgp = require('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'todo-node-app-db'
    //not used for our use locally but will be required when deployed
    // user: 'user-name',
    // password: 'user-password'
});


db.any('select * from todos')
    .then(results => {
        console.log(results)
    })    