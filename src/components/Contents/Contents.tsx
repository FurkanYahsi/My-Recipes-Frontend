import './Contents.css'
import ButtonPrimary from '../ButtonPrimary/ButtonPrimary'
import { FaHeart } from "react-icons/fa";
import { IconBaseProps } from 'react-icons';


const Contents = () => {

  const LikeIcon = FaHeart  as React.FC<IconBaseProps>;
    
  return (
    <div className='contents'>
      <div className='type-of-recipe'>Type of recipe</div>
      <div className='title'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
      <div className='comment'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut commodi deserunt ipsum, quidem totam repellat. Dolore, nobis vel esse dolorem, veniam aliquam natus dicta maiores necessitatibus, voluptatum et sequi porro?</div>
      <div className='buttons'>
        <ButtonPrimary name='View Recipe'/>
        <button id='primary-2'><LikeIcon/></button> {/* İçi boş bir kalp iken tıkjlanıldığında içi dolu bir kalp haline gelsin */ }
      </div>
      <div className='owner-profile'>
        <div className='recipe-title'>Recipe Title</div>
        <div className='user-profile'>User Profile</div>
      </div>
    </div>
  )
}

export default Contents
