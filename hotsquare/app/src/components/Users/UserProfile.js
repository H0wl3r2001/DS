import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import useToken from '../Authentication/useToken';
import NotFound from '../Error/NotFound';
import Banner from './components/Banner';
import About from './components/About';
import PublicationsList from './Publication/PublicationsList';
import CreatePublicationForm from "./Publication/CreatePublicationForm";
import { VIEW_PROFILE, NEW_PROPERTY } from './ProfileScreenMode';

function UserProfile() {

    const [user, setUser] = useState(null);
    const [isError] = useState(false);
    
    const [screenMode, setScreenMode] = useState(VIEW_PROFILE);

    const onScreenModeChange = (newState) => {
        setScreenMode(newState);
    };

    const { id } = useParams();

    const {token} = useToken();

    var isAuth = false;

    if (id === undefined) { // fetch by token
        useEffect(() => {
    
            fetch(`http://localhost:4000/edit_profile/${token.token}`, {
                method: 'GET',
            })
            .then((res) => res.json())
            .then((json) => setUser(json))
            .catch(err => console.log(err));
    
        });
    }
    else { // fetch by id
        useEffect(() => {
    
            fetch(`http://localhost:4000/profile/${id}`, {
                method: 'GET',
            })
            .then((res) => res.json())
            .then((json) => setUser(json))
            .catch(err => console.log(err));
    
        });
    }

    var profileToken = user ? user.token : null;

    if (token.token === profileToken){
        isAuth = true;
    }

    if (true === isError) {
        return <NotFound />;
    }
    
    if (null == user) {
        return <h3><i>Loading...</i></h3>;
    } 

    if (VIEW_PROFILE === screenMode) {
        return (
            <div>
                <Banner user={user} isAuth={isAuth} />
                <hr/>
                <About user={user} />
                <hr/>
                <PublicationsList 
                    changeScreenMode={onScreenModeChange} 
                    propertyOwnerId={user._id}
                />
            </div>
        );
    } 

    let title = "";
    let screen = null;
    if (NEW_PROPERTY === screenMode) {
        title = "New Publication";
        screen = <CreatePublicationForm
                    propertyOwnerId={user._id}
                    changeScreenMode={onScreenModeChange}
                />;
    }

    return (
        <Col>
            <h2 className='my-4'>{title}</h2>
            <div id='profile-screen' className='bg-white py-3 px-4'>
                {screen}
            </div>
        </Col>
    );
    
};

export default UserProfile;
