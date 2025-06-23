import React from 'react'
import './Contents.css'

const Contents = () => {
    
  return (
    <div className='contents'>
      <div className='type-of-recipe'>Type of recipe</div>
      <div className='title'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      <div className='comment'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut commodi deserunt ipsum, quidem totam repellat. Dolore, nobis vel esse dolorem, veniam aliquam natus dicta maiores necessitatibus, voluptatum et sequi porro?</div>
      <div className='buttons'>
        <button id='primary-1'>View Recipe</button>
        <button id='primary-2'>Button 2</button>
      </div>
      <div className='owner-profile'>
        <div className='recipe-title'>Recipe Title</div>
        <div className='user-profile'>User Profile</div>
      </div>
    </div>
  )
}

export default Contents
