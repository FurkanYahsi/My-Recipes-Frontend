import './DropDownMainMenu.css';

interface DropDownMainMenuProps {
  isMenuVisible: boolean;
}

const DropDownMainMenu:React.FC<DropDownMainMenuProps> = ({isMenuVisible}) => {
  return (
    <div className={`menu ${isMenuVisible ? '' : ' close'}`}>
      
    </div>
  )
}

export default DropDownMainMenu
