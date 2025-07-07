import { logout } from '../../services/AuthServices/AuthService.export';
import { useNavigate } from 'react-router-dom';


const useDropDownMainMenu = () => {

    const navigate = useNavigate();

    const handleLogout =  async () => {
        logout().then((response:any) => {
            if (response && response.success){
                navigate("/login");
            }
        })
        .catch((error) => {
            console.error("Logout failed:", error);
        });   
    }

  return {
    handleLogout
  }
}

export default useDropDownMainMenu
