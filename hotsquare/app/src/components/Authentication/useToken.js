import {useState} from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        if(tokenString){
            return JSON.parse(tokenString);
        }
        else{
            return undefined;
        }
    
    };
    
    const [token, setToken] = useState(getToken());
    
    const saveToken = userToken => {
        if(userToken === undefined){
            sessionStorage.removeItem('token');
        } else {
            sessionStorage.setItem('token', JSON.stringify(userToken));
            setToken(userToken.token);
        }
    };
    
    return {
        token,
        setToken: saveToken
    }
}
