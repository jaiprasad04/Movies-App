import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SearchMovies extends Component {
  state = {
    searchMoviesList: [],
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getSearchResults()
  }

  getSearchResults = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(eachResult => ({
        id: eachResult.id,
        backdropPath: eachResult.backdrop_path,
        posterPath: eachResult.poster_path,
        title: eachResult.title,
      }))

      // console.log(updatedData)
      this.setState({
        searchMoviesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSearchInput = text => {
    this.setState({searchInput: text}, this.getSearchResults)
  }

  onClickTryAgain = () => {
    this.getSearchResults()
  }

  renderSuccessView = () => {
    const {searchMoviesList, searchInput} = this.state

    return (
      <div className="search-movies-responsive-container">
        {searchMoviesList.length === 0 ? (
          <div className="no-search-view">
            <img
              src="https://res.cloudinary.com/dkwwcq9yc/image/upload/v1702828264/Group_7394_zkdmin.png"
              alt="no movies"
              className="no-search-result-img"
            />
            <p className="no-search-description">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        ) : (
          <ul className="search-movies-list">
            {searchMoviesList.map(eachResult => (
              <Link to={`/movies/${eachResult.id}`}>
                <li key={eachResult.id} className="search-movies-item">
                  <img
                    src={eachResult.backdropPath}
                    alt={eachResult.title}
                    className="search-img"
                  />
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    )
  }

  renderEmptyView = () => {
    const {searchInput} = this.state
    const isEmpty = searchInput === ''

    return <>{isEmpty ? '' : this.renderSuccessView()}</>
  }

  renderLoadingView = () => (
    <div className="search-loader-view" testid="loader">
      <Loader type="TailSpin" height={50} color="#d81f26" />
    </div>
  )

  renderFailureView = () => (
    <div className="search-failure-view">
      <img
        src="https://res.cloudinary.com/dkwwcq9yc/image/upload/v1702791749/Background-Complete_1_jylyjt.png"
        alt="failure view"
        className="search-failure-img"
      />
      <p className="search-failure-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="search-failure-button"
        onClick={this.onClickTryAgain}
      >
        Try Again
      </button>
    </div>
  )

  renderSearchedMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderEmptyView()
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
      <div className="search-movies-container">
        <Header onSearchInput={this.onSearchInput} />
        <div className="search-movies-result-container">
          {this.renderSearchedMovies()}
        </div>
      </div>
    )
  }
}

export default SearchMovies
