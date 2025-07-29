import './DropDownMainMenu.css';
import useDropDownMainMenu from './DropDownMainMenu.logic';
import { useState, useEffect } from 'react';

// React Icon imports
import { IconBaseProps } from 'react-icons';
import { FaSearch } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { GiRiceCooker } from "react-icons/gi";
import { VscFlame } from "react-icons/vsc";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { IoBookOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { BsCalculator } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoIosSend } from "react-icons/io";



// Icons
const IconBell = FaRegBell as React.FC<IconBaseProps>;
const IconArrowDown = RiArrowDownSLine as React.FC<IconBaseProps>;
const IconLogout = IoLogOutOutline as React.FC<IconBaseProps>;
const IconSettings = IoSettingsOutline as React.FC<IconBaseProps>;
const IconCalendar = FaRegCalendarAlt as React.FC<IconBaseProps>;
const IconBookmark = FaRegBookmark as React.FC<IconBaseProps>;
const IconProfile = MdAccountCircle as React.FC<IconBaseProps>;
const IconCooker = GiRiceCooker as React.FC<IconBaseProps>;
const IconTrends = VscFlame as React.FC<IconBaseProps>;
const IconShoppingCart = FiShoppingCart as React.FC<IconBaseProps>;
const IconHeart = FaRegHeart as React.FC<IconBaseProps>;
const IconBlogs = IoBookOutline as React.FC<IconBaseProps>;
const IconHelp = GoQuestion as React.FC<IconBaseProps>;
const IconCalculator = BsCalculator as React.FC<IconBaseProps>;
const IconInfo = IoMdInformationCircleOutline as React.FC<IconBaseProps>;
const IconSend = IoIosSend as React.FC<IconBaseProps>;


interface DropDownMainMenuProps {
  isMenuVisible: boolean;
  menuRef?: React.RefObject<HTMLDivElement | null>;
}

const DropDownMainMenu: React.FC<DropDownMainMenuProps> = ({ isMenuVisible, menuRef }) => {
const { handleSavedRecipes, handleLikedRecipes, handleSendRecipe, handleTrends, handleLogout } = useDropDownMainMenu();


  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  
  useEffect(() => {
    if (isMenuVisible) {
      setHasBeenVisible(true);
    }
  }, [isMenuVisible]);

  // When the page refreshes, the menu will not be visible
  if (!hasBeenVisible) {
    return null;
  }

  return (
    <div className={`menu-background${isMenuVisible ? '' : ' close'}`}>
      <div ref={menuRef} className={`menu${isMenuVisible ? '' : ' close'}`}>
        <div className='categories'>My Recipes<IconArrowDown/></div>
        <div className='options'><IconProfile/>My Profile</div>
        <div className='options' onClick={handleSavedRecipes}><IconBookmark/>Saved Recipes</div>
        <div className='options' onClick={handleLikedRecipes}><IconHeart/>Likes</div>
        <div className='options' onClick={handleSendRecipe}><IconSend/>Send Recipe</div>
        <div className='options'><IconShoppingCart/>Shopping List</div>
        <div className='options'><IconCalendar/>Plannings</div>
        <div className='options' onClick={handleTrends}><IconTrends/>Trends</div>
        <div className='options'><IconBlogs/>Blogs</div>        
        <div className='options'><IconCalculator/>Calorie Calculator</div>
        <div className='categories'>Other<IconArrowDown/></div>
        <div className='options'><IconInfo/>About</div>
        <div className='options'><IconHelp/>Help</div>
        <div className='options'><IconSettings/>Settings</div>
        <div className='options' onClick={handleLogout}><IconLogout/>Logout</div>    
      </div>
    </div>
  )
}

export default DropDownMainMenu
