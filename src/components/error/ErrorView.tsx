import './ErrorView.css'

const ErrorView = () => {
	return (
		<div className="error-view">
			<h1>Well this is embarrasing...</h1>

			<p> Unfortunately it seems that our hamsters are all temporarily lost in cyber space. <br/>
				We are doing our best to make sure they find their way back. Please try again or <br/>
				visit us again at another time.
			</p>
			<button className="error-btn" onClick={() => window.location.reload()}> Try again </button>
		</div>
	)
}

export default ErrorView;