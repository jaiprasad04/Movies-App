import './index.css'

const FailureView = props => {
  const {onRetry} = props

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dkwwcq9yc/image/upload/v1702878232/alert-triangle_k9urnq.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failed-heading">Something went wrong. Please try again</p>
      <button className="retry-btn" type="button" onClick={onClickRetry}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
