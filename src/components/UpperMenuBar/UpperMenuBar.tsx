
import React, {useState} from 'react'
import './UpperMenuBar.css'
import { GiHotMeal } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { IconBaseProps } from 'react-icons';

const IconMeal = GiHotMeal as React.FC<IconBaseProps>;
const IconSearch = FaSearch as React.FC<IconBaseProps>;

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
        <IconMeal size={36}/>
        <div className='quicksand'>My Recipes</div>
      </div>
      <div className='upper-menu-bar-1 right-side'>
        <div  onMouseEnter={()=>setIsTrendsVisible(!isTrendsVisible)}
              onMouseLeave={()=>setIsTrendsVisible(!isTrendsVisible)} 
              className='dropdown-menu-wrapper'
          >
          {isTrendsVisible ? <div className='title-on-mouse'>Trends ˅</div> : <div>Trends ˅</div>}
          {isTrendsVisible &&
            <div className={`dropdown-menu${isTrendsVisible ? ' animate' : ''}`}>
              <div className='text-on-mouse'>Trending Recipe 1</div>
              <div className='text-on-mouse'>Trending Recipe 2</div>
              <div className='text-on-mouse'>Trending Recipe 3</div>
            </div>
          }
        </div>
        <div onMouseEnter={()=>setIsBlogsVisible(!isBlogsVisible)}
              onMouseLeave={()=>setIsBlogsVisible(!isBlogsVisible)}
              className='dropdown-menu-wrapper'
        >
          {isBlogsVisible ? <div className='title-on-mouse'>Blogs ˅</div> : <div>Blogs ˅</div>}
          {isBlogsVisible && 
            <div className={`dropdown-menu${isBlogsVisible ? ' animate' : ''}`}>
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
