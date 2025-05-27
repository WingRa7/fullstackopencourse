import React from 'react'

import store from './store'

const App = () => {

  const notes = store.getState()

  const addNote = (content, important) => {
    const newNote = {
      content,
      important,
      id: Math.floor(Math.random() * 1000000)
    }
    store.dispatch({
      type: 'NEW_NOTE',
      payload: newNote
    })
  }

  const toggleImportance = (id) => {
    store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      payload: { id }
    })
  }

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map(note =>
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} {' '}
            <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>

      <button onClick={() => addNote('A new note from App.jsx', false)}>
        Add Example Note
      </button>
      <p>
        <em>Click on a note to toggle its importance!</em>
      </p>
    </div>
  )
}

export default App