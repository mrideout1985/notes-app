/* eslint-disable no-restricted-globals */
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./stores/authProvider"
import App from "./App"
import "open-props/style"
import "open-props/normalize"
import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path='/*' element={<App />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
)
