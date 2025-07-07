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
      
    </div>
  )
}

export default DropDownMainMenu
