import { useState } from 'react'

const LoginForm = ({ processLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()
    processLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form className="loginform" onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={event => setPassword(event.target.value)}
          />
        </div>
        <button className="button-primary" type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm