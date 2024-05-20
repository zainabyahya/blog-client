import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import decodeJWT from './utils/jwt';
import Navbar from './components/Navbar';
import EditPost from './components/EditPost';
import Footer from './components/Footer';
import PostPage from './pages/PostPage';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './pages/HomePage';

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = decodeJWT(token);
        setUser(decodedToken);
      } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, [])
  return (
    <div className='min-h-screen'>
      <Navbar user={user} setUser={setUser} />
      <div className='w-4/5 m-auto'>
        < Routes >
          < Route path="/login" element={<Login />} />
          < Route path="/signup" element={<Signup />} />
          < Route path="/profile" element={<></>} />
          <Route path="/edit/:postId" element={<EditPost />} />
          < Route path="/" element={< HomePage />} />
          < Route path={`/post/:postId`} element={< PostPage />} />
        </Routes >
      </div>
      < Footer />
    </div >


  );
}

export default App;
