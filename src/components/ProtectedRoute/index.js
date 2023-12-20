import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'
// import {v4 as uuidv4} from 'uuid'

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')

  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
