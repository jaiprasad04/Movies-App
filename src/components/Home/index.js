import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import TrendingNow from '../TrendingNow'
import TopRatedMovies from '../TopRatedMovies'
import Originals from '../Originals'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    initialPoster: {},
    showHeader: true,
  }

  componentDidMount() {
    this.getMoviePoster()
  }

  getMoviePoster = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedDataLength = data.results.length
      const randomPoster =
        data.results[Math.floor(Math.random() * fetchedDataLength)]
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        title: randomPoster.title,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
      }

      this.setState({
        initialPoster: updatedData,
        apiStatus: apiStatusConstants.success,
        showHeader: false,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getMoviePoster()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <FailureView onRetry={this.onRetry} />
    </div>
  )

  renderSuccessView = () => {
    const {initialPoster} = this.state
    const {backdropPath, title, overview} = initialPoster

    return (
      <div
        className="home-page-container"
        alt={title}
        style={{
          backgroundImage: `url(${backdropPath})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          height: '100%',
        }}
      >
        <Header />
        <div className="home-header-container">
          <div className="home-header-responsive">
            <h1 className="home-header-title">{title}</h1>
            <p className="home-header-overview">{overview}</p>
            <button className="home-header-play-button" type="button">
              Play
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <LoaderView />
    </div>
  )

  renderHomePoster = () => {
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
      <>
        <div className="home-container">
          {showHeader && <Header />}
          <div className="home-sizes-container">{this.renderHomePoster()}</div>
          <div className="movies-slick-container">
            <div className="movies-container">
              <div className="movies-list-container">
                <h1 className="trending-now-heading">Trending Now</h1>
                <TrendingNow />
              </div>
            </div>
            <div className="movies-container">
              <div className="movies-list-container">
                <h1 className="trending-now-heading">Top Rated Movies</h1>
                <TopRatedMovies />
              </div>
            </div>
            <div className="movies-container">
              <div className="movies-list-container">
                <h1 className="trending-now-heading">Originals</h1>
                <Originals />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
