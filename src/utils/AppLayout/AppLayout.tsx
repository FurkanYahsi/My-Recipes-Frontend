import { Outlet } from 'react-router-dom';
import UpperMenuBar from '../../components/UpperMenuBar/UpperMenuBar'
import './AppLayout.css'

const AppLayout = () => {
  return (
    <div className='app-layout'>
      <UpperMenuBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
