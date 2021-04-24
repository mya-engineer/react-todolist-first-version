import React, { useEffect, useState } from 'react'
import Context from './context'
import Loader from './Loader'
import Modal from './Modal/Modal'
import ToDoList from './ToDo/ToDoList'

const AddToDo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import('./ToDo/AddToDo'))
      }, 3000)
    })
)

function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, completed: false, title: 'Купить хлеб' },
    { id: 2, completed: true, title: 'Купить масло' },
    { id: 3, completed: false, title: 'Купить молоко' },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
          setTodos(json)
          setLoading(false)
        }, 700)
      })
  }, [])

  function toggleToDo(id) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo
      })
    )
  }

  function removeToDo(id) {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  function addToDo(title) {
    setTodos(
      todos.concat([
        {
          title: title,
          id: Date.now(),
          completed: false,
        },
      ])
    )
  }

  return (
    <Context.Provider value={{ removeToDo }}>
      {loading && <Loader />}
      <div className='wrapper'>
        <h1>React tutorial</h1>
        <Modal />
        <React.Suspense fallback={<p>Loading...</p>}>
          <AddToDo onCreate={addToDo} />
        </React.Suspense>
        {todos.length ? (
          <ToDoList todos={todos} onToggle={toggleToDo} />
        ) : (
          <p>No ToDos!</p>
        )}
      </div>
    </Context.Provider>
  )
}

export default App
