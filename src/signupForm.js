import { useState } from 'react'
import { formValidator } from './util'
import axios from 'axios'

import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const inputFields = [
	{ label: 'Username', name: 'name', type: 'text' },
	{ label: 'Email Address', name: 'email', type: 'email' },
	{ label: 'Password', name: 'password', type: 'password' },
	{ label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
]
const objectFromArrayObject = {}
inputFields.forEach(field => objectFromArrayObject[field.name] = '')



const SignupForm = ({ sx={} }) => {
	const [ fields, setFields ] = useState(objectFromArrayObject)
	const [ fieldsError, setFieldsError ] = useState(objectFromArrayObject)

	const changeHandler = (evt, name) => {
		setFields({...fields, [name]: evt.target.value})
	}
	const submitHandler = async (evt) => {
		evt.preventDefault()
		if( !formValidator(fields, setFieldsError) ) return

		// const { data } = await axios.post('http://localhost:5000/api/users', fields)
		// if(data.status !== 'success') return console.error('Form not submited')
		// console.log(data.user)

		console.log(fields)
	}

	return (
		<Container maxWidth='xs' sx={sx}>
			<form noValidate onSubmit={submitHandler}>
				{inputFields.map( ({label, name, type}, key) => <TextField key={key}
					label={label}
					placeholder={label}
					type={type}
					required
					autoFocus
					fullWidth
					margin='dense'

					value={fields[name]}
					onChange={(evt) => changeHandler(evt, name)}

					error={!fields[name] || !!fieldsError[name]}
					helperText={fieldsError[name]}
				/>
				)}

				<Button fullWidth variant='contained' type='submit'>Create User</Button>
			</form>
		</Container>
	)
}

export default SignupForm
