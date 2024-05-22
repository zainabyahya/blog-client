import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { IoMoon, IoPerson, IoSunny, IoSearch, IoList } from "react-icons/io5";
import { Transition } from '@headlessui/react';
import { logoutUser } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import AddPost from './AddPost';

const Navbar = ({ user }) => {

    const navigate = useNavigate();
    const [dark, setDark] = useState(false);
    const [menuState, setMenuState] = useState({ mobile: false, dropdown: false });
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dispatch = useDispatch();

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    };

    const loginHandler = () => {
        navigate("/login");
    };

    const signupHandler = () => {
        navigate("/signup");

    };

    const logoutHandler = () => {
        dispatch(logoutUser());
        navigate("/", { replace: true });
    };

    const toggleMobileMenu = () => {
        setMenuState({ mobile: !menuState.mobile, dropdown: false });
    };

    const toggleDropdownMenu = () => {
        setMenuState({ mobile: false, dropdown: !menuState.dropdown });
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    useEffect(() => {

    }, [user, dispatch]);
    return (
        <div className='w-full p-5 mx-0 dark:bg-[#212529] dark:text-white'>
            <nav className='flex justify-between items-center'>
                <div>
                    <span onClick={() => { navigate("/") }} className='text-xl cursor-pointer'>Stories</span>
                </div>
                <div className='hidden md:flex z-10'>
                    {user && [
                        ['1', 'Home', "/"],
                        // ['2', 'Subscribe', "/subscribe"],
                        ['3', 'Bookmarked', "/bookmarks"],
                        ['4', 'Add Post', "/newpost"],
                    ].map(([id, title, url]) => {
                        return <div><span key={id} onClick={title === 'Add Post' ? openModal : () => navigate(url)} className="p-5 hover:underline hover:decoration-[#81B29A] hover:decoration-2 text-xl cursor-pointer ">
                            {title}
                        </span></div>
                    })}
                </div>

                <div className='flex items-center justify-center gap-2 text-xl'>
                    {/* <span>
                        <IoSearch className='cursor-pointer' />
                    </span> */}
                    <span onClick={darkModeHandler} className=''>
                        {dark ? <IoSunny className='cursor-pointer' /> : <IoMoon className='cursor-pointer' />}
                    </span>
                    <span onClick={toggleDropdownMenu} className='relative'>
                        <IoPerson className='cursor-pointer' />
                        <Transition
                            show={menuState.dropdown}
                            as={Fragment}
                            enter="transition ease-out duration-200 transform"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-150 transform"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-[#212529]  border border-gray-200 dark:border-[#212529] rounded-md shadow-lg z-20'>
                                {!user ? (
                                    <>
                                        <span className="block px-4 py-2 hover:underline text-xl cursor-pointer" onClick={loginHandler}>Log in</span>
                                        <span className="block px-4 py-2 hover:underline text-xl cursor-pointer" onClick={signupHandler}>Sign up</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="block px-4 py-2 hover:underline text-xl cursor-pointer" onClick={() => navigate("/profile")}>Profile</span>
                                        <span className="block px-4 py-2 hover:underline text-xl cursor-pointer" onClick={logoutHandler}>Logout</span>
                                    </>
                                )}
                            </div>
                        </Transition>
                    </span>
                    {/* <div className="md:hidden"> */}
                    <button onClick={toggleMobileMenu} className='md:hidden'>
                        <IoList className='cursor-pointer' />
                    </button>
                    {/* </div> */}
                </div>
            </nav>
            <Transition
                show={menuState.mobile}
                as={Fragment}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 translate-y-[-200%]"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-[-200%]"
            >
                <div className={`flex-col items-center border-b-[1px] md:hidden ${!menuState.mobile ? "hidden" : "flex"}`} id="navbar-hamburger">
                    {[
                        ['1', 'Home', "/"],
                        // ['2', 'Subscribe', "/subscribe"],
                        ['3', 'Bookmarked', "/bookmarks"],
                        ['4', 'Add Post', "/newpost"],

                    ].map(([id, title, url]) => {
                        return <span key={id} onClick={() => { navigate(url) }} className="p-5 hover:underline hover:decoration-[#81B29A] hover:decoration-2 text-lg cursor-pointer dark:bg-[#212529]  dark:text-white">{title}</span>
                    })}
                </div>
            </Transition>
            <AddPost isOpen={modalIsOpen} onRequestClose={closeModal} />
        </div>
    );
};

export default Navbar;
