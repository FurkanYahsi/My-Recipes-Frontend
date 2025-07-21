import React, { useState } from 'react'
import useUpperMenuBar from './UpperMenuBar.logic';
import './UpperMenuBar.css'

import DropDownMainMenu from '../DropDownMainMenu/DropDownMainMenu';
import DropdownMenuElement from '../DropdownMenuElement/DropdownMenuElement';

// React Icon imports
import { IconBaseProps } from 'react-icons';
import { FaSearch } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import { HiMiniArrowRight } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { GiRiceCooker } from "react-icons/gi";
import { HiOutlineMenu } from "react-icons/hi";

// Icons
const IconSearch = FaSearch as React.FC<IconBaseProps>;
const IconBell = FaRegBell as React.FC<IconBaseProps>;
const IconArrowDown = RiArrowDownSLine as React.FC<IconBaseProps>;
const IconArrowRight = HiMiniArrowRight as React.FC<IconBaseProps>;
const IconLogout = IoLogOutOutline as React.FC<IconBaseProps>;
const IconSettings = IoSettingsOutline as React.FC<IconBaseProps>;
const IconLike = BiLike as React.FC<IconBaseProps>;
const IconCalendar = FaRegCalendarAlt as React.FC<IconBaseProps>;
const IconBookmark = FaRegBookmark as React.FC<IconBaseProps>;
const IconProfile = MdAccountCircle as React.FC<IconBaseProps>;
const IconCooker = GiRiceCooker as React.FC<IconBaseProps>;
const IconMenu = HiOutlineMenu as React.FC<IconBaseProps>;


const UpperMenuBar: React.FC = () => {

  const { isProfileVisible,
          hasBeenClickedToProfile,
          profileMenuRef,
          mainMenuRef,
          menuContentRef,          
          isMenuVisible,
          handleRecipesClick,
          handleTrendsClick,
          handleSendRecipeClick,
          handleProfileClick,
          handleMenuClick,
          handleLogout} = useUpperMenuBar();

  const [isRecipesVisible, setIsRecipesVisible] = useState(false);
  const [isTrendsVisible, setIsTrendsVisible] = useState(false);
  const [isBlogsVisible, setIsBlogsVisible] = useState(false);
  const [isMouseOnSendRecipe, setIsMouseOnSendRecipe] = useState(false);

  return (
    <div className='upper-menu-bar-1'>
      <div className='upper-menu-bar-1 left-side'>
        <div className='logo'><img src='/res/my-recipes-logo.jpg' alt='My Recipes Logo' /></div>
        <div className='tauri-font'>My Recipes</div>
      </div>
      <div className='upper-menu-bar-1 right-side'>
        <div className='dropdown-menu-wrapper'
          onMouseEnter={() => setIsRecipesVisible(true)}
          onMouseLeave={() => setIsRecipesVisible(false)}
        >
          <div>
            <div className='header-text-with-arrow'>
              <span className={isRecipesVisible ? "title-on-mouse header-text" : "header-text"} onClick={handleRecipesClick}>
                Recipes
              </span>
              <IconArrowDown />
            </div>
            { isRecipesVisible &&
              <div className={`dropdown-menu animate`}>
                <DropdownMenuElement header='Meat Dishes' items={['Grilled Meatball', 'Fish & Seafood', 'Chicken', 'Hamburgers']} img='https://cdn-icons-png.flaticon.com/512/1046/1046751.png'/>
                <DropdownMenuElement header='Vegetable Dishes' items={['Stir-fried Vegetables', 'Roasted Vegetables', 'Steamed Vegetables']} img='https://cdn-icons-png.flaticon.com/512/258/258566.png' />
                <DropdownMenuElement header='Pasta Recipes' items={['Spaghetti Bolognese', 'Penne Arrabbiata', 'Fettuccine Alfredo']} img='https://cdn-icons-png.flaticon.com/512/3823/3823096.png' />
                <DropdownMenuElement header='Pizza Recipes' items={['Margherita Pizza', 'Pepperoni Pizza', 'Veggie Pizza']} img='https://cdn-icons-png.flaticon.com/512/3595/3595458.png' />
                <DropdownMenuElement header='Soup Recipes' items={['Chicken Soup', 'Vegetable Soup', 'Mushroom Soup']} img='https://cdn-icons-png.flaticon.com/512/2387/2387954.png' />
                <DropdownMenuElement header='Desserts' items={['Cakes', 'Milk Dessert', 'Ice Cream', 'Fruit Recipes']} img='https://cdn-icons-png.flaticon.com/512/8346/8346809.png' />
                <DropdownMenuElement header='Salads' items={['Caesar Salad', 'Greek Salad', 'Caprese Salad']} img='https://cdn-icons-png.flaticon.com/512/2515/2515183.png' />
                <DropdownMenuElement header='Beverages' items={['Cold Bevarages', 'Hot Bevarages']} img='https://cdn-icons-png.flaticon.com/512/2405/2405451.png' />
                <DropdownMenuElement header='Other Recipes' items={['Rice Dishes', 'Snacks', 'Egg Dishes', 'Legume Dishes', 'Bread Recipes']} img='https://cdn-icons-png.flaticon.com/512/4252/4252424.png' />
                <div className='bring-the-chosen-recipes'>Bring the chosen recipes<IconArrowRight/></div>
              </div>
            }
          </div>

        </div>
        <div
          onMouseEnter={() => setIsTrendsVisible(true)}
          onMouseLeave={() => setIsTrendsVisible(false)}
          className='dropdown-menu-wrapper'
        >
          <div className='header-text-with-arrow'>
            <span className={isTrendsVisible ? "title-on-mouse header-text" : "header-text"} onClick={handleTrendsClick}>
              Trends
            </span>
            <IconArrowDown />
          </div>
          {isTrendsVisible &&
            <div className={`dropdown-menu animate`}>
              <div className='text'>Daily Trends</div>
              <div className='text'>Weekly Trends</div>
              <div className='text'>Monthly Trends</div>
              <div className='text'>Annual Trends</div>
              <div className='text'>All Time Trends</div>
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
          className='share-recipe'
          onClick={handleSendRecipeClick}
          >
            {isMouseOnSendRecipe ? <IconCooker className='cooker-icon'/> : "Send Recipe"}
        </div>

        <div className='bell-icon'><IconBell/></div>
        
        <div ref={profileMenuRef}>
          <div className='profile-icon' onClick={handleProfileClick}><IconProfile className='icon'/></div>
          {hasBeenClickedToProfile && 
            <div className={`profile-menu${isProfileVisible ? ' animate-in' : ' animate-out'}`}>
              <div className='text'><IconProfile/>My Profile</div>
              <div className='text'><IconBookmark/>Saved Recipes</div>
              <div className='text'><IconLike/>Likes</div>
              <div className='text'><IconCalendar/>Plannings</div>
              <div className='text'><IconSettings/>Settings</div>
              <div className='text' onClick={handleLogout}><IconLogout/>Logout</div>
            </div>
          }
        </div>
        <div className='menu-icon' ref={mainMenuRef} onClick={handleMenuClick}><IconMenu /></div>
      </div>
      <DropDownMainMenu isMenuVisible={isMenuVisible} menuRef={menuContentRef}/>
    </div>
  );
};
export default UpperMenuBar
