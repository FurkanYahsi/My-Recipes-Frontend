import React, { useState } from 'react'
import './UpperMenuBar.css'
import { FaSearch } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { IconBaseProps } from 'react-icons';
import { RiArrowDownSLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { GiRiceCooker } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/AuthServices/AuthService.export';

const IconSearch = FaSearch as React.FC<IconBaseProps>;
const IconBell = FaRegBell as React.FC<IconBaseProps>;
const IconArrowDown = RiArrowDownSLine as React.FC<IconBaseProps>;
const IconLogout = IoLogOutOutline as React.FC<IconBaseProps>;
const IconSettings = IoSettingsOutline as React.FC<IconBaseProps>;
const IconLike = BiLike as React.FC<IconBaseProps>;
const IconCalendar = FaRegCalendarAlt as React.FC<IconBaseProps>;
const IconBookmark = FaRegBookmark as React.FC<IconBaseProps>;
const IconProfile = MdAccountCircle as React.FC<IconBaseProps>;
const IconCooker = GiRiceCooker as React.FC<IconBaseProps>;


const UpperMenuBar: React.FC = () => {

  const [isTrendsVisible, setIsTrendsVisible] = useState(false);
  const [isBlogsVisible, setIsBlogsVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isClickedToProfile, setIsClickedToProfile] = useState(false);
  const [isMouseOnSendRecipe, setIsMouseOnSendRecipe] = useState(false);

  const handleProfileClick = () => {    
    setIsClickedToProfile(true);
    setIsProfileVisible(!isProfileVisible);
  }

  const navigate = useNavigate();
  const handleLogout =  async () => {
    try {
      // const response = await makeRequest(RequestMethod.POST, "/auth/logout");
      logout().then((response:any) => {console.log(response)}).catch((error) => {});
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      return;
    }
    
  }

  return (
    <div className='upper-menu-bar-1'>
      <div className='upper-menu-bar-1 left-side'>
        <div className='logo'><img src='/res/my-recipes-logo.jpg' alt='My Recipes Logo' /></div>
        <div className='tauri-font'>My Recipes</div>
      </div>
      <div className='upper-menu-bar-1 right-side'>
        <div
          onMouseEnter={() => setIsTrendsVisible(true)}
          onMouseLeave={() => setIsTrendsVisible(false)}
          className='dropdown-menu-wrapper'
        >
          <div className='header-text-with-arrow'>
            <span className={isTrendsVisible ? "title-on-mouse header-text" : "header-text"}>
              Trends
            </span>
            <IconArrowDown />
          </div>
          {isTrendsVisible &&
            <div className={`dropdown-menu animate`}>
              <div className='text'>Trending Recipe 1</div>
              <div className='text'>Trending Recipe 2</div>
              <div className='text'>Trending Recipe 3</div>
            </div>
          }
        </div>
        <div
          onMouseEnter={() => setIsBlogsVisible(true)}
          onMouseLeave={() => setIsBlogsVisible(false)}
          className='dropdown-menu-wrapper'
        >
          <div className='header-text-with-arrow'>
            <span className={isBlogsVisible ? "title-on-mouse header-text" : "header-text"}>
              Blogs
            </span>
            <IconArrowDown />
          </div>
          {isBlogsVisible && 
            <div className={`dropdown-menu animate`}>
              <div className='text'>Blog Post 1</div>
              <div className='text'>Blog Post 2</div>
              <div className='text'>Blog Post 3</div>
            </div>
          }
        </div>
        <div className='text'>Contact Us</div>
        <div className='search-bar-wrapper'>
          <input
            type="text"
            placeholder="Search..."
            className='search-bar'
          />
          <div className='search-icon'><IconSearch/></div>
        </div>

        <div 
          onMouseEnter={()=> setIsMouseOnSendRecipe(true)}
          onMouseLeave={()=> setIsMouseOnSendRecipe(false)}
          className='share-recipe'>{isMouseOnSendRecipe ? <IconCooker className='cooker-icon'/> : "Send Recipe"}</div>

        <div className='bell-icon'><IconBell/></div>
        
        <div className='profile-icon' onClick={handleProfileClick}><IconProfile className='icon'/></div>       
        {isClickedToProfile && (
          <div
            className={`profile-menu${isProfileVisible ? ' animate-in' : ' animate-out'}`}           
          >
            <div className='text'><IconProfile/>My Profile</div>
            <div className='text'><IconBookmark/>Saved Recipes</div>
            <div className='text'><IconLike/>Likes</div>
            <div className='text'><IconCalendar/>Plannings</div>
            <div className='text'><IconSettings/>Settings</div>
            <div className='text' onClick={handleLogout}><IconLogout/>Logout</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UpperMenuBar
