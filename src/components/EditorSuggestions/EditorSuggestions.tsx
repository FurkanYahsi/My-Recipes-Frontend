import React from 'react'
import './EditorSuggestions.css'
import Contents from '../Contents/Contents'
import { HiMiniArrowUp } from "react-icons/hi2";
import { HiMiniArrowDown } from "react-icons/hi2";
import { IconBaseProps } from 'react-icons';


const EditorSuggestions = () => {

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
        <img src='/res/black-background.jpg'/>
      </div>
    </div>
  )
}

export default EditorSuggestions
