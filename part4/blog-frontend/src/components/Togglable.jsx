import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  Togglable.displayName = 'Togglable'
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div className="togglable">
      <div style={hideWhenVisible}>
        <button className="button-primary" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="button-secondary" onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

export default Togglable