import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import './App.css'
import Footer from './components/Header';
import Form from './components/Form';
import UserProfile from './components/UserProfile';

function App() {
  
  return (
    <BrowserRouter>
    <Footer />
    <Routes>
      <Route path='/' element={<Form />} />
      <Route path='/:userName' element={<UserProfile />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
