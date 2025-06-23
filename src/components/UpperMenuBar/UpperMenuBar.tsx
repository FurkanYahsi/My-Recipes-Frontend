import React, {useState} from 'react'
import './UpperMenuBar.css'
import { FaSearch } from "react-icons/fa";
import { IconBaseProps } from 'react-icons';
import { RiArrowDownSLine } from "react-icons/ri";

const IconSearch = FaSearch as React.FC<IconBaseProps>;
const IconArrowDown = RiArrowDownSLine as React.FC<IconBaseProps>;

const UpperMenuBar: React.FC = () => {

  const [isTrendsVisible, setIsTrendsVisible] = useState(false);
  const [isBlogsVisible, setIsBlogsVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [shouldRenderProfile, setShouldRenderProfile] = useState(false);

  const handleProfileClick = () => {
    if (!isProfileVisible) {
      setShouldRenderProfile(true); 
      setIsProfileVisible(true);
    } else {
      setIsProfileVisible(false);   
      setTimeout(() => setShouldRenderProfile(false), 500); // Animation is 0,5s
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
              <div className='text-on-mouse'>Trending Recipe 1</div>
              <div className='text-on-mouse'>Trending Recipe 2</div>
              <div className='text-on-mouse'>Trending Recipe 3</div>
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
              <div className='text-on-mouse'>Blog Post 1</div>
              <div className='text-on-mouse'>Blog Post 2</div>
              <div className='text-on-mouse'>Blog Post 3</div>
            </div>
          }
        </div>
        <div className='text-on-mouse'>Contact Us</div>
        <div className='search-bar-wrapper'>
          <input
            type="text"
            placeholder="Search..."
            className='search-bar'
          />
          <div className='search-icon'><IconSearch/></div>
        </div>
        
        <div className='profile-icon' onClick={handleProfileClick}/>
        {shouldRenderProfile &&
          <div className={`profile-menu${isProfileVisible ? ' animate-in' : ' animate-out'}`}>
            <div>My Profile</div>
            <div>Saved Recipes</div>
            <div>Likes</div>
            <div>Settings</div>
            <div>Logout</div>
          </div>
        }
        
      </div>
    </div>
  );
};


export default UpperMenuBar
