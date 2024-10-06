import React from 'react'
//import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom';

// handles login with auth0 redirect 

const LogIn = () => {
    //const { loginWithRedirect } = useAuth0();
    const navigate = useNavigate();
    const handleClick = () => {
      navigate('/Dashboard'); 
    };


  return (
    <div className='center-button'>
        <button className='loginButton' onClick={handleClick}>
            Get Started!
        </button>
    </div>
  );
};

export default LogIn;
