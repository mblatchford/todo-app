const todo = require('./models/todo')

todo.getById(5)
.then (result => {console.log(result);})