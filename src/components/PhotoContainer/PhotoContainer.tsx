import './PhotoContainer.css';
import pasta from '../../assets/pasta-Photoroom.png';

const PhotoContainer = () => {
  return (
    <div className='photo-container'>
      <div className='photo'>
        <img src={pasta} />
      </div>
    </div>
  )
}

export default PhotoContainer
