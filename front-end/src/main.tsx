import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
