const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const Todo = require('./models/Todo')

app.get('/todos', async(req,res) => {
    const todos = await Todo.find()

    res.json(todos)
})

app.post('/todo/new', (req,res)=>{
    const todo = new Todo({
//anything passed into the body below, will be shown like text
        text: req.body.text
    })
    todo.save();
    res.json(todo)
})

app.delete('/todo/delete/:id', async (req,res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)

    res.json(result)
})

app.put('/todo/complete/:id', async (req,res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;

    todo.save()
    res.json(todo)
})


mongoose.connect('mongodb://127.0.0.1:27017/merntodo', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connected to mongodb'))
.catch(console.error)

app.listen(3001, () => 
console.log('server connected on port 3001'))