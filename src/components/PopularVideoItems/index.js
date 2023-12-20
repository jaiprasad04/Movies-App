import {Link} from 'react-router-dom'

import './index.css'

const PopularVideoItems = props => {
  const {videosList} = props
  const {id, posterPath, title} = videosList

  return (
    <Link to={`/movies/${id}`}>
      <li className="popular-list-item">
        <img src={posterPath} alt={title} className="popular-img" />
      </li>
    </Link>
  )
}

export default PopularVideoItems
