import React from "react";
//import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  //const { logout } = useAuth0();
  const navigate = useNavigate();
    const handleClick = () => {
      navigate('/Welcome'); 
    };

  return (
    <button className='logoutButton' onClick={handleClick}>
      EXIT
    </button>
  );
};

export default LogoutButton;
