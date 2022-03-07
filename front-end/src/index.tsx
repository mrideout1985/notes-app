/* eslint-disable no-restricted-globals */
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./stores/authProvider"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "open-props/style"
import "open-props/normalize"
import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

//   client.connect(function (err) {
//     if (err) return callback(err);
