import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { thunkLogout } from "../../store/session";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from 'react-router-dom';

const ProfileButton = ({ user }) => {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const history = useHistory()

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false)
            };
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        closeMenu();
        history.push('/')
    };

    const ulClassName = 'profile-dropdown' + (showMenu ? "" : " hidden");

    return (
        <>
            <button id='profile-button' onClick={openMenu}>
                <i className="fa-solid fa-bars"></i>
                <i className="fa-solid fa-user" id="navElement"></i>
            </button>
            <ul className={ulClassName} ref={ulRef}>
                {user ? (
                    <>
                        <li>Hello, {user.firstName}</li>
                        <li>{user.email}</li>
                        <Link onClick={closeMenu} id='manage-spots-link' to='/spots/current'>Manage Spots</Link>
                        <li id='logout-button'>
                            <button onClick={logout}>Log Out</button>
                        </li>
                    </>
                ) : (
                    <>
                        <OpenModalMenuItem 
                            itemText="Log In" onItemClick={closeMenu}
                            modalComponent={<LoginFormModal />} />
                        <OpenModalMenuItem itemText="Sign Up" onItemClick={closeMenu} modalComponent={<SignupFormModal />} />
                    </>
                )}
            </ul>
        </>
    )
}

export default ProfileButton;
