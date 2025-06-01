import { createSlice } from '@reduxjs/toolkit'

const initialState = 'An initial notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificaiton(state) {
      return state
    }
  }

})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer