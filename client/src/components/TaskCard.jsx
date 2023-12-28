/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { FaPen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios'
import { URL } from '../../url';
import { optionCityForecast } from '../api/apiCityForecast';
const TaskCard = ({ task }) => {
    const { city, title, _id, isDone, country } = task;

    const pathname = window.location.pathname
    // const [toggle, setToggle] = useState(false);
    const [proposeDay, setProposeDay] = useState([])
    const markDone = async () => {
        try {
            await axios.put(`${URL}/api/tasks/${_id}`, { city, title, isDone: !isDone, country })
            window.location.reload();

        } catch (err) {
            console.log(err);
        }
    }

    const handleCalculatePriority = (temp, humid, windspeed) => {
        const weatherData = {
            temperature: temp,
            relativeHumidity: humid,
            windSpeed: windspeed,
        }

        const temperatureWeight = 0.4;
        const humidityWeight = 0.3;
        const windSpeedWeight = 0.3;
        const priorityPoint =
            temperatureWeight * weatherData.temperature +
            humidityWeight * weatherData.relativeHumidity -
            windSpeedWeight * weatherData.windSpeed;

        return priorityPoint.toFixed(2) / 100; // lam tron de chu so thu 2
    }

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${URL}/api/tasks/${_id}`);
            if (res) {
                console.log("delete task successfully");
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const convertDate = (date) => {
        const currentDate = new Date(date);

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const formattedDate = `${year}${month}${day}`;
        console.log("Check convertDate >>> ", formattedDate);
        return formattedDate
    }

    useEffect(() => {
        const proposedDay = (data) => {
            setProposeDay((prevProposeDay) => {
                const newArray = [...prevProposeDay];

                data?.dayOfWeek.forEach((item, index) => {
                    if (
                        handleCalculatePriority(
                            data?.daypart[0].temperature[index * 2],
                            data?.daypart[0].relativeHumidity[index * 2],
                            data?.daypart[0].windSpeed[index * 2]
                        ) >= 0.32
                    ) {
                        newArray.push({
                            date: new Date(data?.validTimeLocal[index]).toLocaleDateString(),
                            dayOrNight: 'Day',
                        });
                    }

                    if (
                        handleCalculatePriority(
                            data?.daypart[0].temperature[index * 2 + 1],
                            data?.daypart[0].relativeHumidity[index * 2 + 1],
                            data?.daypart[0].windSpeed[index * 2 + 1]
                        ) >= 0.32
                    ) {
                        newArray.push({
                            date: new Date(data?.validTimeLocal[index]).toLocaleDateString(),
                            dayOrNight: 'Night',
                        });
                    }

                });

                return newArray;
            });
        };
        const handleFetchCityForeCast = async ({ lat, long, updatedAt }) => {
            const options = optionCityForecast(updatedAt, lat, long)

            try {
                const response = await axios.request(options);
                console.log(response.data);
                proposedDay(response.data['v3-wx-forecast-daily-15day']);
            } catch (error) {
                console.error(error);
            }
        }
        if (pathname == '/propose') {
            handleFetchCityForeCast(task);
        }
    }, [pathname, task])
    return (
        <div className={`bg-[#e5e7eb] max-h-[150px] overflow-auto rounded-md px-4 py-3 flex justify-between ${isDone && `line-through bg-slate-400 opacity-[0.7]`}`}>
            <div className="flex flex-col items-start">
                <h1 className='text-lg text-left font-semibold'>
                    {title}
                </h1>
                <span className='text-slate-600 font-semibold text-sm text-left mt-2'>City: {city}</span>
                <span className='text-slate-600 font-semibold text-sm text-left mt-2'>Country: {country}</span>
                {
                    pathname == '/propose' &&
                    proposeDay &&
                    <div className="">
                        <p className='text-slate-600 font-semibold text-sm text-left mt-2'>
                            Recommended days with good weather: {proposeDay.length}
                        </p>
                        <ul className='flex flex-col gap-2'>
                            {proposeDay.map((day, index) =>
                                <li className='font-semibold text-[15px] italic' key={index}>{day.date} - {day.dayOrNight}</li>
                            )}
                        </ul>
                    </div>
                }
            </div>
            <div className="flex items-center justify-center gap-2">
                <Link to={`/edit/${_id}`}>
                    <FaPen size={16} className='hover:cursor-pointer' />
                </Link>

                <MdDelete onClick={() => {
                    if (window.confirm("Are you sure delete this task?")) {
                        handleDelete();
                    }
                }} size={24} className='hover:cursor-pointer' />
                {
                    isDone
                        ?
                        <input type="checkbox" className='w-[20px] h-[20px]' onChange={() => {
                            markDone();
                        }} checked />
                        :
                        <input type="checkbox" className='w-[20px] h-[20px]' onChange={() => {
                            markDone();
                        }} />
                }
            </div>
        </div>
    )
}

export default TaskCard