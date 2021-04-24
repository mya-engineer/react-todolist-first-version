import PropTypes from 'prop-types'
import { useContext } from 'react'
import Context from '../context'

const styles = {
  li: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '.5rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '.5rem',
    userSelect: 'none',
  },
  input: {
    marginRight: '1rem',
  },
}

function ToDoItem({ todo, index, onChange }) {
  const { removeToDo } = useContext(Context)
  const classes = []

  if (todo.completed) {
    classes.push('done')
  }

  return (
    <li style={styles.li}>
      <span className={classes.join(' ')}>
        <input
          type='checkbox'
          style={styles.input}
          id={'check' + index}
          onChange={() => onChange(todo.id)}
          checked={todo.completed}
        />
        <label htmlFor={'check' + index} style={{ cursor: 'pointer' }}>
          <strong>{index + 1}</strong>. {todo.title}
        </label>
      </span>
      <button className='rm' onClick={removeToDo.bind(null, todo.id)}>
        &times;
      </button>
    </li>
  )
}

ToDoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

export default ToDoItem
