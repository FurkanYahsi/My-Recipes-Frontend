import '../MiniRecipeBox/MiniRecipeBox.css';

import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IconBaseProps } from 'react-icons';
import { FaRegBookmark } from "react-icons/fa";


const HeartIconFilled = FaHeart  as React.FC<IconBaseProps>;
const HeartIcon = FaRegHeart as React.FC<IconBaseProps>;
const IconBookmark = FaRegBookmark as React.FC<IconBaseProps>;

  
const MiniRecipeBox = () => {
  return (
    <div>
        <div className="mini-recipe-box">
            <div className="recipe-image">
                <img src="/res/pasta.jpg" alt="Recipe" />
            </div>
            <div className="explanation">
              <div className="recipe-details">
                  <h3>Kıymalı Makarna</h3>
                  <div className='quick-infos'>8-10 kişilik, 1 saat Hazırlık, 30dk Pişirme</div>
              </div>
              <div className="recipe-popularity">
                  <div className='owner'>Oktay Usta</div>
                  <div className="like-button"><HeartIcon/>18</div>
                  <div className="bookmark-button"><IconBookmark/>10</div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default MiniRecipeBox
