import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { IoMoon, IoPerson, IoSunny, IoSearch, IoList } from "react-icons/io5";
import { Transition } from '@headlessui/react';
import { logoutUser } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import AddPost from './AddPost'; // Import the AddPost component

const Navbar = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [dark, setDark] = useState(false);
    const [menuState, setMenuState] = useState({ mobile: false, dropdown: false });
    const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage the modal visibility
    const dispatch = useDispatch();

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    };

    const loginHandler = () => {
        navigate("/login");
        setUser(!user);
    };

    const signupHandler = () => {
        navigate("/signup");
        setUser(!user);

    };

    const logoutHandler = () => {
        dispatch(logoutUser());
        navigate("/", { replace: true });
        setUser(!user);
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
    }, [user]);
    return (
        <div className='w-full p-5 mx-0'>
            <nav className='flex justify-between items-center'>
                <div>
                    <span onClick={() => { navigate("/") }} className='text-xl cursor-pointer'>Stories</span>
                </div>
                <div className='hidden md:flex z-10'>
                    {[
                        ['1', 'Home', "/"],
                        ['2', 'Categories', "/categories"],
                        ['3', 'Authors', "/authors"],
                        ['4', 'Subscribe', "/subscribe"],
                        ['5', 'Add Post', "/newpost"], // Update the URL to open the modal
                    ].map(([id, title, url]) => (
                        <span key={id} onClick={title === 'Add Post' ? openModal : () => navigate(url)} className="p-5 hover:underline hover:decoration-[#81B29A] hover:decoration-2 text-xl cursor-pointer ">
                            {title}
                        </span>
                    ))}
                </div>

                <div className='flex items-center gap-2 text-xl'>
                    <span>
                        <IoSearch className='cursor-pointer' />
                    </span>
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
                            <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20'>
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
                    <div className="md:hidden">
                        <button onClick={toggleMobileMenu}>
                            <IoList className='cursor-pointer' />
                        </button>
                    </div>
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
                        ['2', 'Categories', "/categories"],
                        ['3', 'Authors', "/authors"],
                        ['4', 'Subscribe', "/subscribe"],
                    ].map(([id, title, url]) => (
                        <span key={id} onClick={() => { navigate(url) }} className="p-5 hover:underline hover:decoration-[#81B29A] hover:decoration-2 text-lg cursor-pointer dark:bg-black dark:text-white">{title}</span>
                    ))}
                </div>
            </Transition>
            <AddPost isOpen={modalIsOpen} onRequestClose={closeModal} />
        </div>
    );
};

export default Navbar;
