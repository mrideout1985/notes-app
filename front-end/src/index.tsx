import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min"
import "open-props/normalize"
import "open-props/style"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.scss"
import reportWebVitals from "./reportWebVitals"

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)

reportWebVitals()
