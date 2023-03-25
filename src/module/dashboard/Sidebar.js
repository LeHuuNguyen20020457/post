import { auth } from 'firebase-app/firebase-config';
import { signOut } from 'firebase/auth';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const SidebarStyles = styled.div`
    width: 300px;
    background: #ffffff;
    box-shadow: 10px 10px 20px rgba(218, 213, 213, 0.15);
    border-radius: 12px;
    .menu-item {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 14px 20px;
        font-weight: 500;
        color: ${(props) => props.theme.gray80};
        margin-bottom: 20px;
        cursor: pointer;
        &.active,
        &:hover {
            background: #f1fbf7;
            color: ${(props) => props.theme.primary};
        }
    }
    @media screen and (max-width: 1023.98px) {
        display: none;
    }
`;
const sidebarLinks = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: <i class="fa-brands fa-foursquare w-6 h-6"></i>,
    },
    {
        title: 'Post',
        url: '/manage/posts',
        icon: <i className="fa-solid fa-book-open w-6 h-6"></i>,
    },
    {
        title: 'Category',
        url: '/manage/category',
        icon: <i class="fa-solid fa-trash w-6 h-6"></i>,
    },
    {
        title: 'User',
        url: '/manage/user',
        icon: <i class="fa-solid fa-user-group w-6 h-6"></i>,
    },
    {
        title: 'Logout',
        url: '/',
        icon: <i class="fa-solid fa-right-from-bracket w-6 h-6"></i>,
        onClick: () => signOut(auth),
    },
];
const Sidebar = () => {
    return (
        <SidebarStyles className="sidebar">
            {sidebarLinks.map((link) => {
                if (link.onClick)
                    return (
                        <div className="menu-item" onClick={link.onClick} key={link.title}>
                            <span className="menu-icon">{link.icon}</span>
                            <span className="menu-text">{link.title}</span>
                        </div>
                    );
                return (
                    <NavLink to={link.url} className="menu-item" key={link.title}>
                        <span className="menu-icon">{link.icon}</span>
                        <span className="menu-text">{link.title}</span>
                    </NavLink>
                );
            })}
        </SidebarStyles>
    );
};

export default Sidebar;
