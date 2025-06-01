import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    voteNotification(state, action) {
      return action.payload
    },
    createNotification(state, action) {
      return action.payload
    },
    resetNotification() {
      return initialState
    }
  }

})

export const { voteNotification, createNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer