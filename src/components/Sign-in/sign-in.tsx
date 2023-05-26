import FormInput from "../Form-input/form-input.tsx";
import {Button} from "@mantine/core";
import './sign-in.scss'
import {signAuthUserWithEmailAndPassword, signInWithGooglePopup} from "../../Utils/Firebase.ts";
import {useState} from "react";
import { notifications } from '@mantine/notifications';
import {useNavigate} from "react-router-dom";


const SignIn = () => {
    const navigate = useNavigate();
    const defaultFormFields = {
        email: '',
        password: ''
    }

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const resetFormsField = () => {
        setFormFields(defaultFormFields)
    }
    const onChangeHandler = (event:any) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();
        try {
           await signAuthUserWithEmailAndPassword(email, password);
            resetFormsField();
            navigate("/")
            notifications.show({
                title: 'Congratulation',
                message: 'User successfully Login',
                color:'green'
            })
        } catch (error:any) {
            switch (error.code) {
                case 'auth/wrong-password':
                    notifications.show({
                        title: 'Encountered an error',
                        message: 'incorrect password for email',
                        color:'red'
                    })
                    break;
                case 'auth/user-not-found':
                    notifications.show({
                        title: 'Encountered an error',
                        message: 'no user associated with this email',
                        color:'red'
                    })
                    break;
                default:
                    notifications.show({
                        title: 'Encountered an error',
                        message: 'Wrong credentials!',
                        color:'red'
                    })
                    console.log('Wrong credentials', error)
            }
        }
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        console.log("test")
        navigate("/")
        notifications.show({
            title: 'Congratulation',
            message: 'User successfully Login',
            color:'green'
        })
    }
    return (

        <div className='sign-up-container'>
            <h2>I already have and account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='email' type='email' required  onChange={onChangeHandler} name='email'
                           value={email}/>
                <FormInput label='password' type='password' required  onChange={onChangeHandler} name='password'
                           value={password}/>

                <div className='buttons-container'>
                    <Button type='submit' color='green'>Sign In</Button>
                    <Button type='button' onClick={signInWithGoogle}>
                        Google sign in/up
                    </Button>
                </div>

            </form>
        </div>)


};

export default SignIn;