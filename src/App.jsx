import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './home'
import Layout from './layout'
import Projects from './projects'
import Profile from './profile'
export default function App() {
  return (
    <div className='flex'>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/projects' element={<Projects/>} />
          <Route path='/profile' element={<Profile/>} />
        </Route>
      </Routes>
    </div>
  )
}