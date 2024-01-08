import React from 'react'

export default function About({user}) {
    return (
        <section id="container-about" className="container-about">
            <h1>About Me</h1>
                <p>{user.about}</p>
        </section>
    )
}
