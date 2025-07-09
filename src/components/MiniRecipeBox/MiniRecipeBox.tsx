import '../MiniRecipeBox/MiniRecipeBox.css';
import useMiniRecipeBox from './MiniRecipeBox.logic';

import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IconBaseProps } from 'react-icons';
import { FaRegBookmark } from "react-icons/fa";
import { MdAccountCircle } from 'react-icons/md';


const HeartIconFilled = FaHeart  as React.FC<IconBaseProps>;
const HeartIcon = FaRegHeart as React.FC<IconBaseProps>;
const IconBookmark = FaRegBookmark as React.FC<IconBaseProps>;
const IconProfile = MdAccountCircle as React.FC<IconBaseProps>;


interface Recipe {
  id: string;
  recipe_name: string;
  username?: string;
  like_count: number;
  is_liked: boolean;
}

interface MiniRecipeBoxProps {
  recipe: Recipe;
  onLikeChange?: () => void;
  onBookmarkChange?: () => void;
}
  
const MiniRecipeBox = ({recipe, onLikeChange}: MiniRecipeBoxProps) => {

  const {handleLikeClick, handleBookmarkClick, isLiked} = useMiniRecipeBox(recipe.id, recipe.is_liked, onLikeChange);

  return (
    <div>
        <div className="mini-recipe-box">
            <div className="recipe-image">
                <img src="/res/pasta.jpg" alt={recipe.recipe_name} />
            </div>
            <div className="explanation">
              <div className="recipe-details">
                  <h3>{recipe.recipe_name}</h3>
                  <div className='quick-infos'>8-10 kişilik, 1 saat Hazırlık, 30dk Pişirme</div>
              </div>
              <div className="recipe-popularity">
                  <div className='owner'><IconProfile className='icon-owner'/>{recipe.username}</div>
                  <div className='mini-recipe-box-buttons'>
                    <div className="like-button" onClick={handleLikeClick}> {isLiked ? <HeartIconFilled color="red" /> : <HeartIcon />}{recipe.like_count}</div>
                    <div className="bookmark-button" onClick={handleBookmarkClick}><IconBookmark/>10</div>
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default MiniRecipeBox
