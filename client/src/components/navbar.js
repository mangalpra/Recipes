import React from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const Logout = () => {
        setCookies("access_token", "");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    };

    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/create-recipes">Create Recipes</Link>
            {/*<Link to="/saved-recipes">Saved Recipes</Link>*/}
            {!cookies.access_token ? (
                <Link to="/auth">Login/Register</Link>
            ) : (
                <>
                    <Link to="/saved-recipes">Saved Recipes</Link>
                    <button onClick={Logout}>Logout</button>
                </>
            )}
        </div>
    );
};

export default Navbar;