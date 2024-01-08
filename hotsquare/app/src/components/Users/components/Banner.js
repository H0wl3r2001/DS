import React from 'react'
import logo from './user_logo.jpg';

export default function Banner({user, isAuth}) {
    
    var profile_page = "/edit_profile/";

    return (
        <section id="container-about" className="container-banner">
            <img id="profilepic" src={logo} width="170" height="170" alt="profilepic"/>
            <h1> {user.username}</h1>

            {isAuth === true ? (
                <a className="btn btn-primary" href={profile_page} role="button">Edit</a>
            ) : <></> 
            }
                {user.preferred_contact === "Phone" ? (
                    <p id="paragraph1"> Preferred Contact: {user.phone}</p>
                ) : (
                    <p id="paragraph1"> Preferred Contact: {user.email}</p>
                )}

            <p id="paragraph1"> Location: {user.location} </p>
            {user.is_open_to_move === "1" ? (
                <button className="btn btn-primary mr-4">Open to Move</button> 
            ) : (
                <p></p>
            )}
            {user.is_available_to_share === "1" ? (
                <button className="btn btn-primary">Available to Share a House</button> 
            ) : (
                <p></p>
            )}
            
        </section>
    )
}
