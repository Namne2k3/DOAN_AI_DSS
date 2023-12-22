/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import axios from 'axios'
import { optionCitySearch } from '../api';
const Navbar = () => {

    const navigate = useNavigate();
    const [prompt, setPrompt] = useState('');
    const pathname = window.location.pathname
    const [city, setCity] = useState(null)

    const { user, setUser } = useContext(UserContext)

    const handleFetchLocationCity = async () => {
        const options = optionCitySearch(prompt)
        try {
            const response = await axios.request(options);
            console.log(response.data.location);
            return response.data.location;
        } catch (error) {
            console.error(error);
        }
    }

    const handleLogout = async () => {
        const apiUrl = new URL('http://localhost:5000/api/auth/logout');
        try {
            const res = await axios.post(apiUrl, {}, { withCredentials: true })
            if (res) {
                console.log("Check res logout >>> ", res.data);
                setUser(null)
                navigate('/')
            }

        } catch (err) {
            console.log(err);
        }
    }

    const handleSearch = useDebouncedCallback(async (searchTern) => {
        console.log("Check searchTern after 1 second >>> ", searchTern);
        // navigate(prompt && `?search=${prompt}`)
        const dataCity = await handleFetchLocationCity();
        setCity(dataCity)
    }, 1000);

    return (
        <div className={`${pathname === '/register' || pathname === '/login' && 'hidden'} justify-between md:px-[100px] sm:px-[50px] lg:px-[200px]  flex items-center px-4 py-2 bg-black text-white`}>
            <div className="flex">
                <Link to='/' className='flex justify-between items-center gap-[8px]'>
                    <img src={'../public/logo.png'} alt="Logo" className="max-h-[40px] max-w-[100%] mr-[10px]" />
                    <p className='font-bold'>
                        NPT Weather Task
                    </p>
                </Link>
            </div>

            <div className="text-center flex">
                {
                    user
                        ?
                        <input
                            onChange={(e) => {
                                // console.log(e.target.value);
                                handleSearch(e.target.value)
                                setPrompt(e.target.value)
                            }}
                            type="text"
                            value={prompt} placeholder="city name eg: Ho Chi Minh ... " className="relative p-[12px] rounded-md w-[350px] text-black"
                        />
                        :
                        <div className='flex gap-4'>
                            <Link to={'/login'}>Login</Link>
                            <Link to={'/register'}>Register</Link>
                        </div>
                }
                {
                    prompt &&
                    city &&
                    <div className="absolute top-[50px] z-10 text-black bg-[#e5e7eb] p-2 w-[350px] rounded-md">
                        <ul className='flex flex-col text-left text-lg'>
                            {city.city.map((item, index) =>
                                <li className='hover:bg-[#c3c8d1] mt-2' key={index}>
                                    <Link to={`/city/${city.placeId[index]}`} className='w-full block' onClick={() => setPrompt('')}>
                                        {item}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                }
            </div>
            {
                user
                &&
                <button
                    onClick={() => {
                        if (window.confirm("Are you sure you want to sign out?")) {
                            handleLogout();
                        }
                    }}
                    className={`px-[12px] py-[8px] rounded-lg bg-white text-black font-bold`}
                >
                    Log Out
                </button>
            }

        </div>
    );
};

export default Navbar;
