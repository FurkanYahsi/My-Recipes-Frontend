import React, { useState } from 'react'
import './Contents.css'
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary';

// React Icon imports
import { IconBaseProps } from 'react-icons';
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

interface ContentsProps {
  recipeType?: string;
  title: string;
  editorComment?: string;
  isLiked: boolean;
  onLikeToggle: () => void;
  userName?: string;
}

const Contents: React.FC<ContentsProps> = ({recipeType, title, editorComment, isLiked, onLikeToggle, userName}) => {

  // Icons
  const HeartIconFilled = FaHeart  as React.FC<IconBaseProps>;
  const HeartIcon = FaRegHeart as React.FC<IconBaseProps>;
  
  return (
    <div className='contents'>
      <div className='type-of-recipe'>{recipeType}</div>
      <div className='title'>{title}</div>
      <div className='comment'>{editorComment}</div>
      <div className='buttons'>
        <ButtonPrimary name='View Recipe'/>
        <button id='primary-2'>{isLiked ? <HeartIconFilled/> : <HeartIcon/>}</button>
      </div>
      <div className='owner-profile'>
        <div className='recipe-title'>{title}</div>
        <div className='user-profile'>{userName}</div>
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
