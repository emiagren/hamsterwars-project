import './ErrorView.css'

const ErrorView = () => {
	return (
		<div>
			<h1>Well this is embarrasing...</h1>
			<p> Unfortunately it seems that the hamsters are all temporarily lost in cyber space. <br/>
				We are doing our best to make sure they find their way back. Please try again or <br/>
				visit us again at another time.
			</p>
			<button onClick={() => window.location.reload()}> Try again </button>
		</div>
	)
}

export default ErrorView;