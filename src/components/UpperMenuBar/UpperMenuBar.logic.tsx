import { useEffect, useRef, useState } from 'react'
import { logout } from '../../services/AuthServices/AuthService.export';
import { useNavigate } from 'react-router-dom';

const useUpperMenuBar = () => {

    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [hasBeenClickedToProfile, setHasBeenClickedToProfile] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement>(null);

    const mainMenuRef = useRef<HTMLDivElement>(null);
    const menuContentRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const handleMenuClick = () => {
        setIsMenuVisible(!isMenuVisible);
    }

    useEffect(() => {
        if (isProfileVisible)
            setHasBeenClickedToProfile(true);
    }, [isProfileVisible])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if ((mainMenuRef.current && !mainMenuRef.current.contains(event.target as Node)) &&
            (menuContentRef.current && !menuContentRef.current.contains(event.target as Node))) {
            setIsMenuVisible(false);
        }
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
            setIsProfileVisible(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return() => {
        document.removeEventListener('mousedown', handleClickOutside); // Component unmount
        }
    }, [])

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
        setIsProfileVisible(!isProfileVisible);
    }

    const handleSendRecipeClick = () => {
        navigate("/send-recipe");
    }

  return {
    isProfileVisible,
    profileMenuRef,
    handleProfileClick,
    hasBeenClickedToProfile,
    handleMenuClick,
    mainMenuRef,
    menuContentRef,
    handleSendRecipeClick,
    handleLogout,
    isMenuVisible
  }
  
}

export default useUpperMenuBar
