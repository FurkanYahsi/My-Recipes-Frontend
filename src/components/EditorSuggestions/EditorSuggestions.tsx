import React from 'react'
import './EditorSuggestions.css'
import Contents from '../Contents/Contents'
import PhotoContainer from '../PhotoContainer/PhotoContainer';

// React Icon imports
import { IconBaseProps } from 'react-icons';
import { HiMiniArrowUp } from "react-icons/hi2";
import { HiMiniArrowDown } from "react-icons/hi2";


const EditorSuggestions = () => {

  // Icons
  const IconArrowUp = HiMiniArrowUp  as React.FC<IconBaseProps>;
  const IconArrowDown = HiMiniArrowDown  as React.FC<IconBaseProps>;

  return (
    <div className='editor-container'>
      <div className='sidebar-menu'>
        <div className='menu-item'><IconArrowUp/></div>
        <div className='menu-item'>1</div>
        <div className='menu-item'>2</div>
        <div className='menu-item'>3</div>
        <div className='menu-item'>4</div>
        <div className='menu-item'>5</div>
        <div className='menu-item'><IconArrowDown/></div>
      </div>
      <div className='content-container'>
        <Contents />
        <PhotoContainer />
      </div>
    </div>
  )
}

export default EditorSuggestions
