import { logout } from '../../services/AuthServices/AuthService.export';
import { useNavigate } from 'react-router-dom';


const useDropDownMainMenu = () => {

    const navigate = useNavigate();

    const handleSendRecipe = () => {
        navigate("/send-recipe");
    }

    const handleTrends = () => {
        navigate("/trends");
    }

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
    handleSendRecipe,
    handleTrends,
    handleLogout
  }
}

export default useDropDownMainMenu
