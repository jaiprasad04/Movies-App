import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    const {username, password} = this.state
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="responsive-container">
          <img
            src="https://res.cloudinary.com/dkwwcq9yc/image/upload/v1701754310/Group_7399_kngyxc.png"
            alt="login website logo"
            className="website-movie-logo"
          />
          <div className="login-form-container">
            <form className="form-container" onSubmit={this.submitForm}>
              <h1 className="login-name">Login</h1>
              <div className="input-container">
                <label htmlFor="username" className="input-label">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  placeholder="Username"
                  className="input-field"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-container">
                <label htmlFor="password" className="input-label">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  placeholder="Password"
                  className="input-field"
                  onChange={this.onChangePassword}
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm
