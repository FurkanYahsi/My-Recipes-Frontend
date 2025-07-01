import React, { useEffect, useRef, useState } from 'react'
import { logout } from '../../services/AuthServices/AuthService.export';
import { useNavigate } from 'react-router-dom';

const useUpperMenuBar = () => {

    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [isClickedToProfile, setIsClickedToProfile] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const handleLogout =  async () => {
        logout().then((response:any) => {
            if (response && response.success){
                navigate("/login");
            }
        })
        .catch((error) => {
            console.error("Logout failed:", error);
        });   
    }

    const handleProfileClick = () => {    
        setIsClickedToProfile(true);
        setIsProfileVisible(!isProfileVisible);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
            setIsProfileVisible(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return() => {
        document.removeEventListener('mousedown', handleClickOutside); // Component unmount
        }
    }, [])


  return {
    isProfileVisible,
    isClickedToProfile,
    profileMenuRef,
    handleProfileClick,
    handleLogout
  }
  
}

export default useUpperMenuBar
