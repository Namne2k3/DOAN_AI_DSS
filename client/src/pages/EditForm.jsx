/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { URL } from '../../url'
const EditForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // console.log("Check Id params >>> ", id);
    const { nav, changeNav } = useContext(NavContext);
    const [city, setCity] = useState('');
    const [title, setTitle] = useState('')
    const [data, setData] = useState({});

    const calculatePriority = (weatherData) => {
        const weights = {
            windSpeed: 0.3,
            humidity: 0.3,
            temperature: 0.4,
        };
        const priorityPoint =
            weights.temperature * weatherData.temp_c +
            weights.humidity * weatherData.humidity -
            weights.windSpeed * weatherData.wind_kph;

        return priorityPoint / 100;
    }

    const handleTestApi = async () => {
        const options = {
            method: 'GET',
            url: import.meta.env.VITE_TEST_API_URL,
            params: { q: city },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_TEST_API_URL_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_TEST_API_URL_HOST,
            }
        };

        try {
            const response = await axios.request(options);
            setData(response.data);
            console.log("Check Response data >>> ", response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdate = async () => {
        try {
            const data = await handleTestApi();

            const task = {
                city: city,
                title: title,
                country: data.location.country,
                lat: data.location.lat,
                long: data.location.lon,
                priority: calculatePriority(data.current),
            }


            await axios.put(`${URL}/api/tasks/${id}`, task)
            // redirect("/")
            changeNav(nav)

            if (nav === 'Important')
                navigate("/important")
            else if (nav === 'All Tasks')
                navigate('/')

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchPostById = async () => {
            const res = await axios.get(`${URL}/api/tasks/${id}`)
            if (res) {
                setTitle(res.data.title)
                setCity(res.data.city)
            }
        };

        fetchPostById();
    }, [id])

    return (

        <div className="w-full md:w-[500px] mt-12 md:max-w-full mx-auto flex items-center justify-center">
            <div className="p-6 border border-gray-300 sm:rounded-md w-full">
                <form>
                    <label className="block mb-6">
                        <span className="text-gray-700 font-semibold">City name</span>
                        <input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            name="city"
                            type="text"
                            className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            p-2
          "
                            placeholder="eg:Ho Chi Minh ..."
                            required
                        />
                    </label>
                    <label className="block mb-6">
                        <span className="text-gray-700 font-semibold">Task title</span>
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            name="title"
                            type="text"
                            className="
            block
            w-full
            mt-1
            border-gray-300
            rounded-md
            shadow-sm
            focus:border-indigo-300
            focus:ring
            focus:ring-indigo-200
            focus:ring-opacity-50
            p-2
          "
                            placeholder="example: do homework"
                            required
                        />
                    </label>

                    <div className="">

                        {/* <span className='text-slate-700 text-sm text-left font-semibold'>Độ C: {data.current.feelslike_c}</span>
                        <span className='text-slate-700 text-sm text-left font-semibold'>Độ C: {data.current}</span> */}
                    </div>
                    <div className="mb-6 gap-4 flex">
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="
            h-10
            px-5
            text-indigo-100
            bg-indigo-700
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
                        >
                            Update task
                        </button>
                        <Link to='/'>
                            <button
                                onClick={() => changeNav(nav)}
                                className="
            h-10
            px-5
            text-indigo-100
            bg-red-500
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-indigo-800
          "
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

export default EditForm