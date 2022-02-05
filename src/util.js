import { isEmail } from 'validator'

export const formValidator = (obj, errorStateUpdateMethod, requireLength=4) => {
	const errorObj = {}

	if( obj.name && obj.name.length < 4)  errorObj.name = 'name reqired 4 digit long'
	if( obj.email && !isEmail(obj.email) ) errorObj.email = 'Invalid Email address'

	if(obj.password && obj.password.length < requireLength ) errorObj.password = `Password must be ${requireLength} character long`
	if(obj.password && obj.confirmPassword && obj.password !== obj.confirmPassword) errorObj.confirmPassword = 'Confirm Password not matched'


	Object.keys(obj).forEach((key) => {
		if(`${obj[key]}`.trim() === '')  errorObj[key] = `'${key}' field is empty`
	})

	errorStateUpdateMethod(errorObj)
	return Object.keys(errorObj).every(item => item === '')
	// it should be Object.values() but still works fine
}
