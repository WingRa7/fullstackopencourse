// import { test as setup } from '@playwright/test'


// const user0File = 'playwright/.auth/user0.json'
// setup('authenticate as username0', async ({ request }) => {
// await request.post('/api/users', {
//   data: {
//     name: 'User0',
//     username: 'username0',
//     password: 'password0'
//   }
// })
//   await request.post('/api/login', {
//     data: {
//       username: 'username0',
//       password: 'password0'
//     }
//   })
//   await request.storageState({ path: user0File })
// })


// const user3File = 'playwright/.auth/user1.json'
// setup('authenticate as username1', async ({ request }) => {
//   await request.post('/api/login', {
// await request.post('/api/users', {
//   data: {
//     name: 'User1',
//     username: 'username1',
//     password: 'password1'
//   }
// })
//     data: {
//       username: 'username1',
//       password: 'password1'
//     }
//   })
//   await request.storageState({ path: user3File })
// })


// const user2File = 'playwright/.auth/user2.json'
// setup('authenticate as username2', async ({ request }) => {
// await request.post('/api/users', {
//   data: {
//     name: 'User2',
//     username: 'username2',
//     password: 'password2'
//   }
// })
//   await request.post('/api/login', {
//     data: {
//       username: 'username2',
//       password: 'password2'
//     }
//   })
//   await request.storageState({ path: user2File })
// })


// const user3File = 'playwright/.auth/user3.json'
// setup('authenticate as username3', async ({ request }) => {
//   await request.post('/api/login', {
// await request.post('/api/users', {
//   data: {
//     name: 'User3',
//     username: 'username3',
//     password: 'password3'
//   }
// })
//     data: {
//       username: 'username3',
//       password: 'password3'
//     }
//   })
//   await request.storageState({ path: user3File })
// })