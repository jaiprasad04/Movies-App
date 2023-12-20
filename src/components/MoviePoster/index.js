import Header from '../Header'

import './index.css'

const MoviePoster = props => {
  const {moviePoster} = props
  const {
    backdropPath,
    title,
    adult,
    runtime,
    releaseDate,

    overview,
  } = moviePoster

  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  const date = new Date(releaseDate)
  const year = date.getFullYear()

  return (
    <div
      className=""
      alt={title}
      style={{
        backgroundImage: `url(${backdropPath})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        height: '100%',
      }}
    >
      <Header />
      <div className="movie-poster-container">
        <div className="movie-poster-responsive">
          <h1 className="movie-poster-title">{title}</h1>
          <div className="movie-poster-details">
            <p className="movie-poster-time">{`${hours}h ${minutes}m`}</p>
            <p className="movie-poster-certified">{adult ? 'A' : 'U/A'}</p>
            <p className="movie-poster-year">{year}</p>
          </div>
          <p className="movie-poster-overview">{overview}</p>
          <button type="button" className="movie-poster-button">
            Play
          </button>
        </div>
      </div>
    </div>
  )
}

export default MoviePoster
