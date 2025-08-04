import '../MiniRecipeBox/MiniRecipeBox.css';
import useMiniRecipeBox from './MiniRecipeBox.logic';

import pasta from '../../assets/pasta.jpg';

import { IconBaseProps } from 'react-icons';
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from 'react-icons/fa6';
import { MdAccountCircle } from 'react-icons/md';
import { FaRegComment } from "react-icons/fa6";
import { GiTrashCan } from "react-icons/gi";



const HeartIconFilled = FaHeart  as React.FC<IconBaseProps>;
const HeartIcon = FaRegHeart as React.FC<IconBaseProps>;
const IconBookmark = FaRegBookmark as React.FC<IconBaseProps>;
const IconBookmarkFilled = FaBookmark as React.FC<IconBaseProps>;
const IconProfile = MdAccountCircle as React.FC<IconBaseProps>;
const IconComment = FaRegComment as React.FC<IconBaseProps>;
const IconTrashCan = GiTrashCan as React.FC<IconBaseProps>;


interface Recipe {
  id: string;
  recipe_name: string;
  username?: string;
  like_count: number;
  is_liked: boolean;
  bookmark_count: number;
  is_bookmarked: boolean;
  comment_count?: number;
}

interface MiniRecipeBoxProps {
  recipe: Recipe;
  onLikeChange?: () => void;
  onBookmarkChange?: () => void;
  onDeleteSuccess?: () => void;
  isUserAdmin?: boolean;
  isUserEditor?: boolean;
}
  
const MiniRecipeBox = ({recipe, onLikeChange, onBookmarkChange, onDeleteSuccess, isUserAdmin, isUserEditor}: MiniRecipeBoxProps) => {

  const {handleViewRecipe, handleLikeClick, handleBookmarkClick, handleEditRecipe, handleDeleteRecipe, isLiked, canTrashCanBeVisible, contextHolder, isBookmarked, addToEditorSuggestions} = useMiniRecipeBox(recipe.id, recipe.is_liked, recipe.is_bookmarked, onLikeChange, onBookmarkChange, onDeleteSuccess);

  return (
    <div>
      {contextHolder}
        <div className="mini-recipe-box">
            {(isUserAdmin || isUserEditor) && <div className='icon-backside' onClick={handleDeleteRecipe}><IconTrashCan/></div>}
            <div className="recipe-image" onClick={handleViewRecipe}>
                <img src={pasta} alt={recipe.recipe_name} />
            </div>
            <div className="explanation">
              <div className="recipe-details">
                  <div onClick={handleViewRecipe} className='recipe-details-header'>{recipe.recipe_name}</div>
                  <div className='quick-infos' onClick={addToEditorSuggestions}>8-10 kişilik, 1 saat Hazırlık, 30dk Pişirme</div>
              </div>
              <div className="recipe-popularity">
                  <div className='owner'><IconProfile className='icon-owner'/>{recipe.username}</div>
                  <div className='mini-recipe-box-buttons'>
                    <div className="like-button" onClick={handleLikeClick}> {isLiked ? <HeartIconFilled color="red" /> : <HeartIcon />}{recipe.like_count}</div>
                    <div className="bookmark-button" onClick={handleBookmarkClick}>{isBookmarked ? <IconBookmarkFilled/> : <IconBookmark/>}{recipe.bookmark_count}</div>
                    <div className="comment-button"><IconComment/>{recipe.comment_count}</div>
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default MiniRecipeBox
