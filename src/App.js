import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieDetailsView from './components/MovieDetailsView'
import SearchMovies from './components/SearchMovies'
import Account from './components/Account'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetailsView} />
    <ProtectedRoute exact path="/search" component={SearchMovies} />
    <ProtectedRoute exact path="/account" component={Account} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
