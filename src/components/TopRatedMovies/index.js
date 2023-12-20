import {Component} from 'react'

import Cookies from 'js-cookie'

import SlickMovieCard from '../SlickMovieCard'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRatedMovies extends Component {
  state = {apiStatus: apiStatusConstants.initial, topRatedMoviesList: []}

  componentDidMount() {
    this.getTopRatedMovies()
  }

  getTopRatedMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(eachMovie => ({
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
        backdropPath: eachMovie.backdrop_path,
      }))

      this.setState({
        topRatedMoviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {topRatedMoviesList} = this.state
    return <SlickMovieCard movieList={topRatedMoviesList} />
  }

  onRetry = () => {
    this.getTopRatedMovies()
  }

  renderFailureView = () => (
    <div className="failure-movie-container">
      <FailureView onRetry={this.onRetry} />
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-containers">
      <LoaderView />
    </div>
  )

  renderTopRatedMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="top-rated-container">{this.renderTopRatedMovies()}</div>
    )
  }
}

export default TopRatedMovies
