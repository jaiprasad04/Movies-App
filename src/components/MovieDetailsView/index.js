import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {format} from 'date-fns'

import Header from '../Header'
import Footer from '../Footer'
import MoviePoster from '../MoviePoster'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetailsView extends Component {
  state = {
    movieDetails: [],
    genres: [],
    spokenLanguages: [],
    similarMovies: [],
    apiStatus: apiStatusConstants.initial,
    showHeader: true,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = [data.movie_details].map(each => ({
        id: each.id,
        adult: each.adult,
        backdropPath: each.backdrop_path,
        budget: each.budget,
        title: each.title,
        overview: each.overview,
        releaseDate: each.release_date,
        voteCount: each.vote_count,
        rating: each.vote_average,
        runtime: each.runtime,
        posterPath: each.poster_path,
      }))

      const genresData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))

      const updatedSimilarData = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          posterPath: each.poster_path,
          title: each.title,
          backdropPath: each.backdrop_path,
        }),
      )

      const updatedLanguagesData = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          language: each.english_name,
        }),
      )

      this.setState({
        movieDetails: updatedData,
        genres: genresData,
        similarMovies: updatedSimilarData.slice(0, 8),
        spokenLanguages: updatedLanguagesData,
        apiStatus: apiStatusConstants.success,
        showHeader: false,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTryAgain = () => {
    this.getMovieDetails()
  }

  renderLoadingView = () => (
    <div className="movies-loader-view" testid="loader">
      <Loader type="TailSpin" height={50} color="#d81f26" />
    </div>
  )

  renderFailureView = () => (
    <div className="movies-failure-view">
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

  renderSuccessView = () => {
    const {movieDetails, genres, spokenLanguages, similarMovies} = this.state
    const {voteCount, rating, budget, releaseDate} = {...movieDetails[0]}
    console.log(movieDetails)

    const date = releaseDate && format(new Date(releaseDate), 'do MMMM yyyy')

    return (
      <>
        <div className="movie-details-view-container">
          {movieDetails.map(eachMovie => (
            <MoviePoster key={eachMovie.id} moviePoster={eachMovie} />
          ))}
        </div>
        <div className="movie-details-container">
          <div className="movie-details-responsive-container">
            <div>
              <h1 className="movie-details-sub-heading">Genres</h1>
              {genres.map(eachGenre => (
                <p key={eachGenre.id} className="movie-details-item">
                  {eachGenre.name}
                </p>
              ))}
            </div>
            <div>
              <h1 className="movie-details-sub-heading">Audio Available</h1>
              {spokenLanguages.map(each => (
                <p key={each.id} className="movie-details-item">
                  {each.language}
                </p>
              ))}
            </div>
            <div>
              <>
                <h1 className="movie-details-sub-heading">Rating Count</h1>
                <p className="movie-details-item">{voteCount}</p>
              </>
              <>
                <h1 className="movie-details-sub-heading">Rating Average</h1>
                <p className="movie-details-item">{rating}</p>
              </>
            </div>
            <div>
              <>
                <h1 className="movie-details-sub-heading">Budget</h1>
                <p className="movie-details-item">{budget}</p>
              </>
              <>
                <h1 className="movie-details-sub-heading">Release Date</h1>
                <p className="movie-details-item">{date}</p>
              </>
            </div>
          </div>
        </div>
        <div className="movie-details-more-like-this-container">
          <div className="movie-details-more-like-this-responsive-container">
            <h1 className="more-like-this-heading">More like this</h1>
            <ul className="more-like-this-list">
              {similarMovies.map(eachMovie => (
                <Link to={`/movies/${eachMovie.id}`}>
                  <li key={eachMovie.id} className="more-like-this-item">
                    <img
                      src={eachMovie.posterPath}
                      alt={eachMovie.title}
                      className="more-like-this-img"
                    />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderMoviesDetails = () => {
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
    const {showHeader} = this.state
    return (
      <div className="movie-details">
        {showHeader && <Header />}
        {this.renderMoviesDetails()}
        <Footer />
      </div>
    )
  }
}

export default MovieDetailsView
