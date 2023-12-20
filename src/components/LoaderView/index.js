import Loader from 'react-loader-spinner'
import './index.css'

const LoaderView = () => (
  <div className="loader" testid="loader">
    <Loader
      type="Oval"
      height={40}
      color="#d81f26"
      className="custom-oval-loader"
    />
  </div>
)

export default LoaderView
