import { logout } from '../../services/AuthServices/AuthService.export';
import { useNavigate } from 'react-router-dom';


const useDropDownMainMenu = () => {

    const navigate = useNavigate();

    const handleSavedRecipes = () => {
        // If the user is already on the saved-recipes page, do not navigate again
        if (window.location.pathname === "/saved-recipes") {
            return; 
        }
        navigate("/saved-recipes");
    }

    const handleLikedRecipes = () => {
        // If the user is already on the liked-recipes page, do not navigate again
        if (window.location.pathname === "/liked-recipes") {
            return; 
        }
        navigate("/liked-recipes");
    }

    const handleSendRecipe = () => {
        // If the user is already on the send-recipe page, do not navigate again
        if (window.location.pathname === "/send-recipe") {
            return; 
        }
        navigate("/send-recipe");
    }

    const handleTrends = () => {
        // If the user is already on the trends page, do not navigate again
        if (window.location.pathname === "/trends") {
            return; 
        }
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
    handleSavedRecipes,
    handleLikedRecipes,
    handleSendRecipe,
    handleTrends,
    handleLogout
  }
}

export default useDropDownMainMenu
