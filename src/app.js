import { useState, useEffect } from 'react'
import axios from 'axios'

import SignupForm from './signupForm'

import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'


const App = () => {
	const [ users, setUsers ] = useState([])
	const [ viewAddUserForm, setViewAddUserForm ] = useState('none')


	useEffect(() => {
		(async() => {
			// const { data : { users }} = await axios.get('http://localhost:5000/api/users')
			const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users`)
			setUsers(data)
		})()
	}, [])

	const signupButtonHandler = () => setViewAddUserForm('block')
	const signupCloseButtonHandler = () => setViewAddUserForm('none')


	return (
		<>
		<Typography variant='h4'>Hello React</Typography>

			<Button variant='outlined' onClick={signupButtonHandler}>Add User</Button>
			<Button variant='outlined' onClick={signupCloseButtonHandler}>Close Form</Button>

			<SignupForm sx={{ display: viewAddUserForm }} />

		<Typography component='pre' color='textSecondary'>
			{JSON.stringify(users, null, 2)}
		</Typography>
		</>
	)
}
export default App
