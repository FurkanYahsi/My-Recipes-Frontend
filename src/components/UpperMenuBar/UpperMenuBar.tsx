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

  const { contextHolder,
          isProfileVisible,
          hasBeenClickedToProfile,
          profileMenuRef,
          mainMenuRef,
          menuContentRef,          
          isMenuVisible,
          handleLogoClick,
          handleRecipesClick,
          handleTrendsClick,
          handleSendRecipeClick,
          handleProfileClick,
          handleMenuClick,
          handleLogout,
          handleBringTheChosens,
          selectedCategories,
          setSelectedCategories,
          selectedTypes,
          setSelectedTypes } = useUpperMenuBar();

  const [isRecipesVisible, setIsRecipesVisible] = useState(false);
  const [isTrendsVisible, setIsTrendsVisible] = useState(false);
  const [isBlogsVisible, setIsBlogsVisible] = useState(false);
  const [isMouseOnSendRecipe, setIsMouseOnSendRecipe] = useState(false);

  return (
    <div className='upper-menu-bar-1'>
      { contextHolder }
      <div className='upper-menu-bar-1 left-side' onClick={handleLogoClick}>
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
                <DropdownMenuElement selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} header='Meat Dishes' items={['Grilled Meatball', 'Fish & Seafood', 'Chicken', 'Hamburgers', 'Other Meat Dishes']} img='https://cdn-icons-png.flaticon.com/512/1046/1046751.png'/>
                <DropdownMenuElement selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} header='Vegetable Dishes' items={['Stir-fried Vegetables', 'Roasted Vegetables', 'Steamed Vegetables', 'Other Vegetable Dishes']} img='https://cdn-icons-png.flaticon.com/512/258/258566.png' />
                <DropdownMenuElement selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} header='Pasta Recipes' items={['Spaghetti Bolognese', 'Penne Arrabbiata', 'Fettuccine Alfredo', 'Other Pasta Recipes']} img='https://cdn-icons-png.flaticon.com/512/3823/3823096.png' />
                <DropdownMenuElement selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} header='Pizza Recipes' items={['Margherita Pizza', 'Pepperoni Pizza', 'Veggie Pizza', 'Other Pizza Recipes']} img='https://cdn-icons-png.flaticon.com/512/3595/3595458.png' />
                <DropdownMenuElement selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} header='Soup Recipes' items={['Chicken Soup', 'Vegetable Soup', 'Mushroom Soup', 'Other Soups']} img='https://cdn-icons-png.flaticon.com/512/2387/2387954.png' />
                <DropdownMenuElement selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} header='Desserts' items={['Cakes', 'Milk Dessert', 'Ice Cream', 'Fruit Recipes', 'Other Desserts']} img='https://cdn-icons-png.flaticon.com/512/8346/8346809.png' />
                <DropdownMenuElement selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} header='Salads' items={['Caesar Salad', 'Greek Salad', 'Caprese Salad', 'Other Salads']} img='https://cdn-icons-png.flaticon.com/512/2515/2515183.png' />
                <DropdownMenuElement selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} header='Beverages' items={['Cold Beverages', 'Hot Beverages']} img='https://cdn-icons-png.flaticon.com/512/2405/2405451.png' />
                <DropdownMenuElement selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} header='Other Recipes' items={['Rice Dishes', 'Snacks', 'Egg Dishes', 'Legume Dishes', 'Bread Recipes', 'Other Recipes']} img='https://cdn-icons-png.flaticon.com/512/4252/4252424.png' />
                <div className='bring-the-chosen-recipes' onClick={handleBringTheChosens}>Bring the chosen recipes<IconArrowRight/></div>
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
              <DropdownMenuElement header='Daily Trends' img='res/trends/24-hours.png'/>
              <DropdownMenuElement header='Weekly Trends' img='res/trends/week.png'/>
              <DropdownMenuElement header='Monthly Trends' img='res/trends/month.png'/>
              <DropdownMenuElement header='Annual Trends' img='res/trends/annual-calendar.png'/>
              <DropdownMenuElement header='All Time Trends' img='res/trends/all.png'/>
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
              <DropdownMenuElement header='Cooking' items={['Cooking Tips', 'Kitchen Hacks']} img='res/blogs/cooking.png'/>
              <DropdownMenuElement header='Health' items={['Healthy Eating', 'Diet', 'How Much Calories?']} img='res/blogs/healthy-heart.png'/>
              <DropdownMenuElement header='Life' items={['Useful Informations', 'Travel Guide']} img='res/blogs/daily-tasks.png'/>
              <DropdownMenuElement header='What Are The Benefits?' items={['What are the benefits of olive oil for skin?', 'What are the benefits of cherries?']} img='res/blogs/question.png'/>
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
