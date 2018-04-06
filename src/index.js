import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import config from './ctfstrap.config'

document.title = config.title

ReactDOM.render(<App/>, document.getElementById('root'))
