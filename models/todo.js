const pgp = require('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'todo-node-app-db'
    //not used for our use locally but will be required when deployed
    // user: 'user-name',
    // password: 'user-password'
});

// CREATE
function add(name, completed) {
    return db.one(`insert into todos (name, completed)
        values
            ($1, $2)
        returning id    
    `, [name, completed])
}

// RETRIEVE
// db.all works since query limits result but use the most appropriate option

// db.one('select * from todos where id = $1')
//     .catch(err => {
//         return {
//         name: 'No todo found.'
//         };
//     })
//     .then(result => {
//         console.log(result) 
//     })  

function getAll(){
    return db.any('select * from todos')
        .catch(err => {
            return {
            name: 'No todo found.'
            }
        })
        .then(results => {
            console.log(results)
        })    
    }

// grab a row
function getById(id){
    return db.one(`select * from todos where id = $1`, [id])
    .catch(err => {
        return {
        name: 'No todo found.'
        };
    })
    .then(result => {
        console.log(result) 
    })  
}

// UPDATE
function insertRow(name, completed){
    return db.one(`insert into todos (name, completed) values ($1, $2) returning id`, [name,completed])
        .catch(err => {
            return {
            name: 'No todo found.'
            }
        })
        .then(results => {
            console.log(results)
        })    
    }

// getById(2);
// getAll();
// insertRow('insert a new row', true);

//update a row
function updateCompleted(id, didComplete){
    return db.result(`update todos 
        set completed = $2 
        where id = $1`, [id, didComplete])

}

function markCompleted(id){
    return updateCompleted(id,true);
    // return db.result(`update todos 
    //     set completed = $2 
    //     where id = $1`, [id, true])
}

function markPending(id){
    return updateCompleted(id,false);
    // return db.result(`update todos 
    //     set completed = $2 
    //     where id = $1`, [id, true])
}


// markCompleted(1);
// markPending(1);


function updateName(id, name){
    return db.result(`update todos 
    set name = $2 
    where id = $1`, [id, name])

}

// updateName(3, 'buy phones and cb case')
// .then(result => {
//     console.log(result)
// })



// DELETE
function deleteById(id){
    return db.result(`delete from todos where id = $1`, [id])
}

// deleteById(40)
//     .then (result => {
//         console.log(result.rowCount);
//     })


module.exports = {
    markCompleted,
    markPending,
    getAll,
    getById,
    insertRow,
    updateCompleted,
    updateName,
    deleteById,

}