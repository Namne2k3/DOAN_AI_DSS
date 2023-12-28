/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'
import { Link } from 'react-router-dom'
import { navigates } from '../utils/tempData'
import { URL } from '../../url'
import axios from 'axios'
import { IoIosAddCircle } from "react-icons/io";

const Completed = () => {
    // console.log("Check nav >>> ", nav);

    // const currentURL = window.location.href // returns the absolute URL of a page

    const pathname = window.location.pathname //returns the current url minus the domain name

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchAllTasks = async () => {
            const res = await axios.get(`${URL}/api/tasks`);
            if (res) {
                setTasks(res.data);
            }
        };
        fetchAllTasks();
    }, [])

    return (
        <>
            {/* <Navbar /> */}
            <div className="flex flex-col md:h-screen items-center md:p-[100px] sm:px-[50px] md:py-[32px] lg:px-[200px]">
                <div className="flex gap-10 justify-between items-start">
                    {navigates.map((item) =>
                        <Link
                            onClick={() => {
                                console.log("Check pathname >>> ", pathname);
                            }}
                            key={item.name} to={item.url}
                            className={`${pathname == item.url && 'bg-black text-white'} p-4 rounded-lg text-[2rem] hover:underline`}
                        >
                            {item.name}
                        </Link>
                    )}
                </div>

                <div className="flex flex-col justify-between w-full">
                    <div className="flex items-center justify-between">
                        <h1 className='text-[2rem] font-bold my-6'>{pathname === '/completed' && 'Completed'}</h1>
                        <Link to='/create'>
                            <IoIosAddCircle size={30} />
                        </Link>
                    </div>
                    <div className="flex w-full my-4">

                        <div className="gap-3 flex-1">

                            <div className="flex flex-col gap-4">
                                {tasks.map((task) => {
                                    if (task.isDone) {
                                        return (
                                            <TaskCard key={task.title} task={task} />
                                        )
                                    }
                                }
                                )}
                            </div>
                        </div>
                        {/* <div className="flex flex-1">
                            <Form />
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Completed