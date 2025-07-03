import UpperMenuBar from '../../../components/UpperMenuBar/UpperMenuBar'
import EditorSuggestions from '../../../components/EditorSuggestions/EditorSuggestions'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className='home-page'>
      <UpperMenuBar/>
      <EditorSuggestions/>
    </div>
  )
}

export default HomePage
