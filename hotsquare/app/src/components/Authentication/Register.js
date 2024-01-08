import React, { useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Authentication.css'

//!Changing to a new file if gets too big or if it is used in multiple places
async function registerUser(credentials) {
    credentials["preferred_contact"] = "Email";
    return fetch('http://localhost:4000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => {
        return data.json()
        
    }).catch(err => {
        console.log(err)
    })

}


const Register = ({setToken}) => {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

    //Finds errors on form to display
    const findFormErrors = () => {
        const {username, email, password} = user;
        const newErrors = {}
        // username errors
        if (!username || username === '') newErrors.username = 'cannot be blank!';
        else if (username.length < 3) newErrors.username = 'is too short!';
        // email errors
        if (!email || email === '') newErrors.email = 'cannot be blank!';
        else if (!email.includes('@')) newErrors.email = 'invalid email!';
        // password errors
        if (!password || password === '') newErrors.password = 'cannot be blank!';
        else if (password.length < 6) newErrors.password = 'is too short!';
        // password must contain numbers and symbols
        else if (!password.match(/[0-9]/)) newErrors.password = 'must contain a number!';
        else if (!password.match(/[!_\-@#$%^&*]/)) newErrors.password = 'must contain a symbol!';

        return newErrors;
    }


    const register = async e => {
        e.preventDefault();
        //Clean all previous errors
        setErrors({})

        //Find any errors
        const newErrors = findFormErrors();
        if(Object.keys(newErrors).length > 0){
            //We have errors
            setErrors(newErrors)
            return
        }
        
        //No FrontEnd errors, proceed to backend
        const token = await registerUser(user);
        
        //In case the server is down, we will not get a token
        if(!token){
            setErrors({server: "Server is down"})
            return
        }


        switch(token.code){
            case 200:
                setToken(token);
                navigate('/');
                break;
            case 400: case 401:
                setErrors({server: token.message})
                break;
            case 402:
                setErrors({email: token.message})
                break;

            default:
                console.log("Something went wrong")
        }
                    
        
        // set token after receiving

        
    }

    const setUserInput = (event) => {
        const field = event.target.name
        const value = event.target.value

        setUser( {...user, [field] : value})

        if(!!errors[field]) setErrors({
            ...errors,
            [field]:null
        })
    }

    return (
        <div className="form-wrapper">

            <Form onSubmit={register} className="d-grid gap-2">
                <h1 id="sign-up-header">Register</h1>
                <Form.Group className="mb-3"  controlId="formBasicUser">
                    <Form.Control
                        type="text" 
                        size="lg" 
                        name="username" 
                        placeholder="Your name" 
                        onChange={setUserInput}
                        isInvalid={!!errors.username} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control 
                        type="email" 
                        size="lg" 
                        name="email" 
                        placeholder="Email" 
                        onChange={setUserInput}
                        isInvalid={!!errors.email }/>
                    <Form.Control.Feedback type='invalid'>
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control 
                        size="lg" 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={setUserInput} 
                        isInvalid= {!!errors.password}/>
                    <Form.Control.Feedback type='invalid'>
                        {errors.password}
                    </Form.Control.Feedback>
                    <Form.Text className="text-muted">
                        Password must have more than 6 characters, at least a number and a symbol
                    </Form.Text>
                </Form.Group>
                    <Button variant="secondary" size="lg" type="submit">Register</Button>
                    <Form.Text className="text-muted">
                        {errors.server}
                    </Form.Text>
                    <Form.Text className="text-muted">
                        Already have an account? <a href="/login">Login</a>
                    </Form.Text>

                
            

            </Form>
        </div>
        
    );
};

export default Register;