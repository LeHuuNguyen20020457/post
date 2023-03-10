import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useContext, useState, useEffect} from 'react'

import {auth} from '../firebase/firebase-config'

const AuthContext = createContext();

function AuthProvider({...props}) {
    const [userInfo, setUserInfo] = useState({});
    const value = {userInfo, setUserInfo}
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUserInfo(user)
        })
    }, [])
    return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext)
    if(typeof context === 'undefined') {
        throw new Error('useAuth must be used with in AuthProvider')
    }
    return context;
}

export { AuthProvider, useAuth}