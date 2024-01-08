import React, {useState} from 'react';
import './Authentication.css'
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

//? Maybe change to a separate file where requests are defined
async function loginUser(credentials) {
    return fetch('http://localhost:4000/login', {
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

//!Needs to set the page token, receiving stateSetter as prop
export default function Login({setToken}) {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const setUserInput = (event) => {
        const field = event.target.name
        const value = event.target.value

        setUser( {...user, [field] :value})

        if(!!errors[field]) setErrors({
            ...errors,
            [field]:null
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        //Clean all previous errors
        setErrors({})

        const token = await loginUser(user);
        if(!token){
            setErrors({server: "Server is down"})
            return
        }

        switch(token.code){
            case 200:
                setToken(token);
                navigate('/');
                break;
            case 400:
                setErrors({server: token.message})
                break;
            case 401:
            case 402:
                setErrors({email: token.message})
                break;
            case 403:
                setErrors({password: token.message})
                break;

            default:
                console.log("Something went wrong")
        }

        // set token after receiving
    }


  return(
    <div className="form-wrapper">

        <Form expand="lg" onSubmit={handleSubmit} className="d-grid gap-2">
            <h1 id="sign-in-header">Login</h1>
            <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Control  type="email" size="lg" name="email" placeholder="Email" onChange={setUserInput} isInvalid= {!!errors.email}/>
                <Form.Control.Feedback type='invalid'>
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Control size="lg" type="password" name="password" placeholder="Password" onChange={setUserInput} isInvalid= {!!errors.password} />
                <Form.Control.Feedback type='invalid'>
                    {errors.password}
                </Form.Control.Feedback>
                <Form.Text as="a" className="text-muted">
                     Forgot your password?
                </Form.Text>
            </Form.Group>
                <Button variant="secondary"  size="lg" type="submit" >Login</Button>
                <Form.Text className="text-muted">
                    {errors.server}
                </Form.Text>
                <Form.Text className="text-muted">
                    Do you not have an account? <a href="/register">Sign up</a>
                </Form.Text>

        </Form>
    </div>
  )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
