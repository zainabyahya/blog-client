import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUser } from '../actions/authActions';

const Signup = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);

        dispatch(signUpUser({ formData }));

        navigate("/", { replace: true })

    };

    return (
        <div className="flex justify-center mt-20">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

                <div className="mb-4 flex flex-col justify-center items-start gap-3">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                        First Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="firstName"
                        type="text"
                        placeholder="Full Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                        Last Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-4 flex flex-col justify-center items-start">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4 flex flex-col justify-center items-start">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6 flex flex-col justify-center items-start">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Image URL
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="file"
                        placeholder="Image URL"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-[#212529] hover:bg-[#0e1d15] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                </div>
                <div className='m-5'>Already a member?
                    <Link to="/login" className="m-2 inline-block align-baseline font-bold text-sm text-[#212529] hover:text-[#0e1d15]">
                        Login
                    </Link></div>
            </form>

        </div>
    );
};

export default Signup;
