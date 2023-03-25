import { Button } from 'components/button';
import { useAuth } from 'contexts/auth-context';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const menuLinks = [
    {
        url: '/',
        title: 'Home',
    },
    {
        url: '/blog',
        title: 'Blog',
    },
    {
        url: '/contact',
        title: 'Contact',
    },
];

const HeaderStyles = styled.div`
    padding: 40px 0;
    .header-main {
        display: flex;
        align-items: center;
        position: relative;
    }

    .logo {
        display: block;
        max-width: 50px;
    }

    .menu {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-left: 40px;
        list-style: none;
        font-weight: 600;
    }

    .search {
        margin-left: auto;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 8px;
        width: 100%;
        max-width: 320px;
        display: flex;
        align-items: center;
        position: relative;
        font-weight: 500;
        margin-right: 20px;
    }
    .search-input {
        flex: 1;
        padding-right: 45px;
    }
    .search-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 25px;
    }
    .header-button {
        margin-left: 20px;
        justify-self: flex-end;
        position: absolute;
        right: 0;
        top: 0;
    }
    .header-auth {
        display: flex;
        align-items: center;
        gap: 20px;
    }
`;
const Header = () => {
    const { userInfo } = useAuth();
    return (
        <HeaderStyles>
            <div className="container">
                <div className="header-main">
                    <NavLink to="/">
                        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
                    </NavLink>
                    <ul className="menu">
                        {menuLinks.map((item) => (
                            <li className="menu-item" key={item.title}>
                                <NavLink to={item.url} className="menu-link">
                                    {item.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {!userInfo ? (
                        <Button type="button" height="56px" className="header-button" to="/sign-in">
                            Login
                        </Button>
                    ) : (
                        <div className="header-auth">
                            <Button type="button" height="56px" className="header-button" to="/dashboard">
                                Dashboard
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </HeaderStyles>
    );
};

export default Header;
