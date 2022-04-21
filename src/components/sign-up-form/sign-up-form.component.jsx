import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component'
import './sign-up.styles.scss';

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event ) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const clearFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert('password does not match');
            return;
        }
        try {
           const {user} = await createAuthUserWithEmailAndPassword(email, password);    
           console.log(user);
           const pesistedUser = createUserDocumentFromAuth(user, {displayName});
           console.log(pesistedUser);
           clearFields();

        } catch (error) {
            console.log('creation of a user failed',error.message);
        }
        
    }

    return(
        <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required name='displayName' value={displayName} onChange={handleChange}/>
                <FormInput label='email' type="email" required name='email' value={email} onChange={handleChange}/>
                <FormInput label='password' type="password" required name='password' value={password} onChange={handleChange}/>
                <FormInput label='Confirm Password' type="password" required name='confirmPassword' value={confirmPassword} onChange={handleChange}/>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default SignUpForm;