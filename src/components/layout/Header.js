import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components"
import { useAuth } from "../../contexts/auth-context";
import { Button } from "../button";

const HeaderStyles = styled.div`
    padding: 40px 0;
    .header-main{
        display: flex;
        align-items: center;
    }

    .logo{
        display: block;
        max-width: 50px;
    }

    .menu{
        display: flex;
        align-items: center;
        gap: 20px;
        margin-left: 40px;
        list-style:none;
        font-weight: 600;
    }
    

    .search{
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
    .search-input{
        flex: 1;
        padding-right: 45px;
    }
    .search-icon{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 25px;
    }
    .header-button{
        margin-left: 20px;
    }
`
const menuLinks = [
    {
        url: '/',
        title:'Home'
    },
    {
        url: '/blog',
        title:'Blog'
    },
    {
        url: '/contact',
        title:'Contact'
    },

]

function getLastName(name) {
    if(name) {
        const length = name.split(' ').length
        return name.split(' ')[length-1]
    }
    return ''
}

const Header = () => {
    const {userInfo} = useAuth();

    return (
        <HeaderStyles>
            <div className='container'>
                <div className="header-main">
                    <NavLink to="/">
                        <img srcSet="logo.png" alt="monkey-bloggin" className="logo"/>
                    </NavLink>
                    <ul className="menu">
                        {menuLinks.map(item => (
                            <li className="menu-item" key={item.title}>
                                <NavLink to={item.url} className="menu-link">{item.title}</NavLink>
                            </li>
                        ))}
                    </ul>
                   
                    <div className="search">
                            <input type="text" className="search-input" placeholder="search-post"/>
                            <span className="search-icon">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                    </div>
                    {userInfo ? <div className="header-auth">
                                    <span>Welcome back </span>
                                    <strong className="text-primary">{getLastName(userInfo?.displayName)}</strong>
                                </div> : 
                                <Button type="button" style={{maxWidth: "200px"}} height="56px" className="header-button" to='sign-up'>Sign Up</Button>}
                </div>
            </div>
        </HeaderStyles>
    )
}

export default  Header;
