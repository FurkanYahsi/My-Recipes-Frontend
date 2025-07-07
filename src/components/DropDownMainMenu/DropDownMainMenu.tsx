import './DropDownMainMenu.css';
import { useState, useEffect } from 'react';

interface DropDownMainMenuProps {
  isMenuVisible: boolean;
}

const DropDownMainMenu: React.FC<DropDownMainMenuProps> = ({ isMenuVisible }) => {
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
      <div className={`menu${isMenuVisible ? '' : ' close'}`}>      
        My Recipes
        <div>Recipes</div>
        <div>Saved Recipes</div>
        <div>Trends</div>
        <div>Blogs</div>
        <div>Shopping List</div>
        <div>Plannings</div>
        <div>Q&A</div>
        <div>Calorie Calculator</div>
        Other
        <div>Contact</div>
        <div>About</div>      
      </div>
    </div>
  )
}

export default DropDownMainMenu
