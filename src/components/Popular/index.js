import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import PopularVideoItems from '../PopularVideoItems'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {popularVideosList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getPopularVideos()
  }

  getPopularVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()

      const updatedData = data.results.map(eachData => ({
        id: eachData.id,
        title: eachData.title,
        backdropPath: eachData.backdrop_path,
        posterPath: eachData.poster_path,
      }))

      this.setState({
        popularVideosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {popularVideosList} = this.state

    return (
      <ul className="popular-list-details">
        {popularVideosList.map(eachVideo => (
          <PopularVideoItems key={eachVideo.id} videosList={eachVideo} />
        ))}
      </ul>
    )
  }

  onClickTryAgain = () => {
    this.getPopularVideos()
  }

  renderLoadingView = () => (
    <div className="popular-loader-view" testid="loader">
      <Loader type="TailSpin" height={50} color="#d81f26" />
    </div>
  )

  renderFailureView = () => (
    <div className="popular-failure-view">
      <img
        src="https://res.cloudinary.com/dkwwcq9yc/image/upload/v1702791749/Background-Complete_1_jylyjt.png"
        alt="failure view"
        className="popular-failure-img"
      />
      <p className="popular-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="popular-failure-button"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderPopularMovies = () => {
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
      <div className="popular-container">
        <Header />
        <div className="popular-list-container">
          {this.renderPopularMovies()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Popular
