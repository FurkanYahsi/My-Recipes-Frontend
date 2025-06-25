import './ButtonPrimary.css';

interface ButtonPrimaryProps {
  name: string;
  onClick?: () => void;
  id?: string;
}

const ButtonPrimary:React.FC<ButtonPrimaryProps>  = ({name}) => {
  return (
    <button id='primary'>{name}</button>
  )
}

export default ButtonPrimary
