import React from 'react'
import './EditorSuggestions.css'

const EditorSuggestions = () => {
  return (
    <div className='editor-container'>
      <div className='sidebar-menu'>
        <div>↑</div>
        <div className='menu-item'>1</div>
        <div className='menu-item'>2</div>
        <div className='menu-item'>3</div>
        <div className='menu-item'>4</div>
        <div className='menu-item'>5</div>
        <div>↓</div>
      </div>
      <div className='image-container'>
        <img src='/res/black-background.jpg'/>
      </div>
    </div>
  )
}

export default EditorSuggestions
