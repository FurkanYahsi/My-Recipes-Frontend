import React, { useState } from 'react'
import './Contents.css'
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';

// React Icon imports
import { IconBaseProps } from 'react-icons';
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const Contents = () => {

  const[isLiked, setIsLiked] = useState(false);
  // Icons
  const HeartIconFilled = FaHeart  as React.FC<IconBaseProps>;
  const HeartIcon = FaRegHeart as React.FC<IconBaseProps>;
  
  return (
    <div className='contents'>
      <div className='type-of-recipe'>Main Course</div>
      <div className='title'>Fettuccine with Bolognese Sauce</div>
      <div className='comment'>Here's a quick and easy recipe for spaghetti with bolognese sauce, both delicious and easy to make. I highly recommend you try this recipe, which perfectly complements spaghetti and makes it a delicious dish you won't be able to get enough of.</div>
      <div className='buttons'>
        <ButtonPrimary name='View Recipe'/>
        <button onClick={() => setIsLiked(!isLiked)} id='primary-2'>{isLiked ? <HeartIconFilled/> : <HeartIcon/>}</button>
      </div>
      <div className='owner-profile'>
        <div className='recipe-title'>Fettuccine with Bolognese Sauce</div>
        <div className='user-profile'>Nefis Yemek Tarifleri</div>
        <div className='dashed-lines'>
          <div className="dashed-line-1"></div>
          <div className="dashed-line-2"></div>
          <div className="yellow-circle"></div>
        </div>
      </div>
    </div>
  )
}

export default Contents
