import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleLogin = () => {
        dispatch(loginUser({ email, password }));
        navigate("/")

    };


    return (
        <div className="flex justify-center items-center mt-20">
            <form className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4 flex flex-col justify-center items-start">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6  flex flex-col justify-center items-start">
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
                <div className="flex items-center justify-between">
                    <button
                        className=" bg-[#212529] hover:bg-[#0e1d15] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleLogin}
                    >
                        Sign In
                    </button>
                </div>
                <div className='m-5'>Don't have an account?
                    <Link to="/signup" className="m-2 inline-block align-baseline font-bold text-sm  text-[#212529] hover:text-[#0e1d15]">
                        Sign Up
                    </Link></div>

            </form>
        </div>
    );
};

export default Login;
