import {useState} from "react";
import FormInput from "../Form-input/form-input.tsx";
import {Button} from "@mantine/core";
import {createAuthUserWithEmailAndPassword, createUserToDbFromAuth} from "../../Utils/Firebase.ts";
import {notifications} from "@mantine/notifications";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;


    const resetFormsField = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            notifications.show({
                title: 'Encountered an error',
                message: 'password do not match',
                color:'red'
            })
            return;
        }

        try {
            const {user}: any = await createAuthUserWithEmailAndPassword(email, password);
            user.displayName = displayName;
            await createUserToDbFromAuth(user)
            resetFormsField();
            navigate("/")
            notifications.show({
                title: 'Congratulation',
                message: 'User successfully Login',
                color:'green'
            })
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                notifications.show({
                    title: 'Encountered an error',
                    message: 'Cannot create user, email already in use',
                    color:'red'
                })
            } else {
                notifications.show({
                    title: 'Encountered an error',
                    message: 'user creation encountered an error',
                    color:'red'
                })
                console.log('user creation encountered an error', error)
            }

        }
    }

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }


    return (<div className={'sign-up-container'}>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSubmit}>
            <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName'
                       value={displayName}/>
            <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
            <FormInput label='Password' type='password' required onChange={handleChange} name='password'
                       value={password}
                       minLength={6}/>
            <FormInput label='Confirm Password' type='password' required onChange={handleChange}
                       name='confirmPassword' value={confirmPassword}
                       minLength={6}/>
            <Button type='submit'>Sign up</Button>
        </form>
    </div>)

};

export default SignUp;