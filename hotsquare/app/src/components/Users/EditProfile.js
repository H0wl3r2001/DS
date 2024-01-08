import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './components/user.css';
import useToken from '../Authentication/useToken';

const INITIAL_STATE = {
    id: 0,
    username: "",
    email: ""
};

export default function EditProfile() {

    const navigate = useNavigate();

    const [user, setUser] = useState(INITIAL_STATE);

    const {token} = useToken();

    useEffect(() => {
        fetch(`http://localhost:4000/edit_profile/${token.token}`)
            .then(res => res.json())
            .then(json => setUser(json))
            .catch(err => console.log(err));
    }, []);
      
    const handleInput = (e) => {
        //console.log(e.target.name, " : ", e.target.value);
        setUser({ ...user, [e.target.name]: e.target.value });
    };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("Data for update : ", JSON.stringify(user));
        fetch(`http://localhost:4000/edit_profile/${token.token}`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(user),
        })
            .then(res => {
                return res.json()
            }).catch(err => {
                console.log(err)
            })

        return navigate('/profile');
    };

    return (
        <div class="user_edit_form">
            <h2>Personal Info</h2>
            <form class="form-horizontal" onSubmit={handleSubmit}>
                <div class="form-group">
                    <label class="col-lg-3 control-label">Username: </label>
                    <div class="col-lg-8">
                        <input type="text" name="username" class="form-control" value={user.username} placeholder={"Username"} onChange={handleInput}></input><br></br>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-lg-3 control-label">Location: </label>
                    <div class="col-lg-8">
                        <input type="text" name="location" class="form-control" value={user.location} onChange={handleInput}></input><br></br>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-lg-3 control-label">Phone: </label>
                    <div class="col-lg-8">
                        <input type="text" name="phone" maxLength="9" class="form-control" value={user.phone} onChange={handleInput}></input><br></br>
                    </div>
                </div>

                <div class="form-group">
                    <label>Is Open to Move: &nbsp;</label>
                    <label class="col-lg-3 control-label"> Yes:&nbsp; 
                    {user.is_open_to_move === "1" ? 
                        <input type="radio" name="is_open_to_move" value="1" checked onChange={handleInput}></input> : 
                        <input type="radio" name="is_open_to_move" value="1" onChange={handleInput}></input>}
                    </label>  
                    <label class="col-lg-3 control-label">&nbsp;No:&nbsp; 
                    {user.is_open_to_move === "0" ?
                        <input type="radio" name="is_open_to_move" value="0" checked onChange={handleInput}></input> :
                        <input type="radio" name="is_open_to_move" value="0" onChange={handleInput}></input>}
                </label>  
                </div>

                <br></br>

                <div class="form-group">
                    <label>Is Available to Share: &nbsp;</label>
                    <label class="col-lg-3 control-label"> Yes:&nbsp; 
                        {user.is_available_to_share === "1" ?
                            <input type="radio" name="is_available_to_share" value="1" checked onChange={handleInput}></input> :
                            <input type="radio" name="is_available_to_share" value="1" onChange={handleInput}></input>}
                    </label>
                    <label class="col-lg-3 control-label">&nbsp;No:&nbsp; 
                        {user.is_available_to_share === "0" ?
                            <input type="radio" name="is_available_to_share" value="0" checked onChange={handleInput}></input> :
                            <input type="radio" name="is_available_to_share" value="0" onChange={handleInput}></input>}
                    </label>    
                </div>

                
                <br></br>

                <div class="form-group">
                    <label>Preferred Contact: </label>
                    <div class="col-lg-8">
                        <div class="ui-select">
                            <select name="preferred_contact" class="form-control" onChange={handleInput}>
                            {user.preferred_contact === "Email" ?
                                <option value="Email" selected>Email</option> :
                                <option value="Email">Email</option>}
                            {user.preferred_contact === "Phone" ?
                                <option value="Phone" selected>Phone</option> :
                                <option value="Phone">Phone</option>}
                            </select>
                        </div>
                    </div>
                </div>

                <br></br>

                <div class="form-group">
                    <label class="col-lg-3 control-label">About: </label>
                    <div class="col-lg-8">
                        <textarea name="about" class="form-control" rows="10" cols="30" value={user.about} onChange={handleInput}></textarea><br></br>
                    </div>
                </div>                
                
                <br></br>

                <input type="submit" class="form-submit-button" value="Submit"/>
            </form>
        </div>
    );
}
