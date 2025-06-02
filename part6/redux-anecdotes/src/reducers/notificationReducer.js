import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload
    },
    resetNotification() {
      return initialState
    }
  }

})

export const { displayNotification, createNotification, resetNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(displayNotification(message))
    setTimeout(() => {
      dispatch(resetNotification())
    },(timeout*1000))
  }
}

export default notificationSlice.reducer