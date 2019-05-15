import React from 'react'

import styles from './App.pcss'
import picture from './assets/img.jpg'

import { AppProps } from './App.d'

const App = ({ title = 'React Typescript Starter Pack' }: AppProps) => (
	<div className={styles.root}>
		<img className={styles.picture} src={picture} alt="img"/>
		<h1 className={styles.title}>{ title }</h1>
	</div>
)

export default App
