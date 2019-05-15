import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer, setConfig } from 'react-hot-loader'
import App from 'containers/App'

setConfig({ pureSFC: true })

const render = (Component: any) => {
	ReactDOM.render(
		<AppContainer>
			<Component/>
		</AppContainer>,
		document.getElementById('app')
	)
}

render(App)

if (module.hot) {
	module.hot.accept('containers/App', () => render(App))
}
