import {useState, useEffect} from 'react'
import "./App.css";

const API="http://localhost:3001" //set connection to api

function App() {
  const [todos, setTodos] = useState([])
  const [popUp, setPopUp] = useState(false)
  const [newTask, setNewTask] = useState('')

  useEffect(()=>{
    GetTodos()
    //console.log(todos)
  }, [])

  //READ ROUTE
  const GetTodos = () => {
  //fetch API & return as a json format
    fetch(API + "/todos")
      .then(res=> res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Error', err))
  }

  //EDIT/PUT ROUTE
  const checkTodo = async id => {
    const data = await fetch(API + '/todo/complete/' + id, 
    {method: 'PUT'})
    .then(res=> res.json())

    setTodos(todos => todos.map(todo => {
      if(todo._id === data._id){
  //set them up to be the same value
        todo.complete = data.complete
      }
      return todo;
    }))
  }

  //DELETE ROUTE
  const deleteTask = async id => {
    const data = await fetch(API + '/todo/delete/' + id, 
    {method: 'DELETE'})
    .then(res=> res.json())
//set them up to not be equal to or have the same value
    setTodos(todos => todos.filter(todo => todo._id !== data._id))
  }

  const addTask = async () => {
    const data = await fetch(API + '/todo/new', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTask
      })
    }).then(res => res.json())
    // console.log(data)

    setTodos([...todos, data])
    setPopUp(false)
    setNewTask('')
  }

  return (
    <div className="App">
      <h1>Welcome to CanBan</h1>
      <h4>To Dos</h4>
      <div className="todos">
        {todos.map(todo => (
        //check if a task is complete
          <div className={"todo " + 
          (todo.complete ? 'is-complete' : '')} key={todo._id}
          onClick={()=> checkTodo(todo._id)}>
          <div className="checkbox"></div>

          <div className="text">{todo.text}</div>

          <div className="delete-todo" 
          onClick={()=> deleteTask(todo._id)}>X</div>
          </div>
          ))}
         
          </div>
          <div className='addPopup' 
          onClick={()=> setPopUp(true)}>+</div>
          {popUp 
          ? (<div className='popup'>
            <div className='closePopup' 
            onClick={()=> setPopUp(false)}>X</div>
          <div className='content'>
          {/* BIND UR NEWTODO VALUE WITH YOUR INPUT */}
            <h3>Add Task</h3>
            <input
              type='text'
              className='add-todo-input'
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
            />
            <div className='button' 
            onClick={() => addTask()}>Create Todo</div>
          </div>
            </div>)
          : ''}
        </div>
  );
}

export default App;

{/* <div className="todo is-complete">
<div className="checkbox"></div>

<div className="text">Get Rokid Glasses</div>

<div className="delete-todo">x</div>
</div> */}