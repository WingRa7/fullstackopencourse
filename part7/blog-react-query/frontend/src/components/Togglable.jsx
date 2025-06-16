import { Button, Box } from '@mui/material'

import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  Togglable.displayName = 'Togglable'
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  }

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Button
          style={hideWhenVisible}
          color="secondary"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
        <Button
          style={showWhenVisible}
          color="error"
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </Box>
      <Box style={showWhenVisible}>{props.children}</Box>
    </Box>
  )
})

export default Togglable
