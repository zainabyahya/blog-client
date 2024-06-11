import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import EditPost from './components/EditPost';
import Footer from './components/Footer';
import PostPage from './pages/PostPage';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './pages/HomePage';
import { useDispatch, useSelector } from 'react-redux';
import { checkForToken } from './actions/authActions';
import Bookmarks from './components/Bookmarks';
import Profile from './components/Profile';

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = checkForToken(token)
    dispatch({ type: "auth/getUser", payload: userInfo })
  }, [dispatch])

  return (
    <div className='dark:bg-[#212529] dark:text-white'>
      <Navbar user={user} />
      <div className='min-h-[70vh] w-4/5 m-auto'>
        < Routes >
          {user ? <>
            < Route path="/" element={< HomePage />} />
            < Route path={`/post/:postId`} element={< PostPage />} />
            < Route path="/profile" element={<Profile />} />
            < Route path="/bookmarks" element={<Bookmarks />} />
            < Route path="/edit/:postId" element={<EditPost />} />
          </>
            :
            <>
              < Route path="/login" element={<Login />} />
              < Route path="/signup" element={<Signup />} />
              < Route path="/" element={< HomePage />} />
              < Route path={`/post/:postId`} element={< PostPage />} />
            </>}

        </Routes >
      </div>
      < Footer />
    </div >


  );
}

export default App;
