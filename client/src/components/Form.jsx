/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import { URL } from '../../url';
import { useFormAction, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { optionCitySearch } from '../api';
const Form = () => {

    const [city, setCity] = useState('')
    const [title, setTitle] = useState('');

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext)
    const handleTestApi = async () => {
        const options = optionCitySearch(city)

        try {
            const response = await axios.request(options);
            console.log("Check Response data >>> ", response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    // const calculatePriority = (weatherData) => {
    //     const weights = {
    //         windSpeed: 0.3,
    //         humidity: 0.3,
    //         temperature: 0.4,
    //     };
    //     const priorityPoint =
    //         weights.temperature * weatherData.temp_c +
    //         weights.humidity * weatherData.humidity -
    //         weights.windSpeed * weatherData.wind_kph;

    //     return priorityPoint / 100;
    // }

    const handleCreate = async (e) => {
        e.preventDefault();

        const data = await handleTestApi();

        const task = {
            city: city,
            title: title,
            userId: user.id,
            country: data.location.country[0],
            lat: data.location.latitude[0],
            long: data.location.longitude[0],
        }
        console.log("Check Task >>> ", task);
        try {
            const res = await axios.post(`${URL}/api/tasks/create`, task);
            console.log("Check res >>> ", res);
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="my-24 w-full md:w-[500px] md:max-w-full mx-auto">
            <div className="p-6 border border-gray-300 sm:rounded-md">
                <form >
                    <label className="block mb-6">
                        <span className="text-gray-700 font-semibold">City name</span>
                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            name="city"
                            type="text"
                            className=" block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                            placeholder="eg:Ho Chi Minh ..."
                            required
                        />
                    </label>
                    <label className="block mb-6">
                        <span className="text-gray-700 font-semibold">Task title</span>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            name="title"
                            type="text"
                            className=" block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2"
                            placeholder="example: do homework"
                            required
                        />
                    </label>
                    <div className="mb-6 gap-4 flex">
                        <button
                            type="button"
                            onClick={handleCreate}
                            className=" h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
                        >
                            Add task
                        </button>
                        <Link to='/'>
                            <button
                                onClick={() => navigate('/')}
                                className=" h-10 px-5 text-indigo-100 bg-red-500 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
                            >
                                Cancel
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form