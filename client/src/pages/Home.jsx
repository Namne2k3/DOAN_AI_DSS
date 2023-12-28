/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { navigates } from '../utils/tempData'
import { URL } from '../../url'
import axios from 'axios'
import { IoIosAddCircle } from "react-icons/io";
import { UserContext } from '../context/userContext'
import BackGround from './BackGround'

const Home = () => {

    // const { nav, changeNav } = useContext(NavContext);
    const { user } = useContext(UserContext)


    const pathname = window.location.pathname //returns the current url minus the domain name
    // console.log("Check nav >>> ", nav);

    const [tasks, setTasks] = useState([]);
    // console.log("Check search location >>> ", search);
    useEffect(() => {
        const fetchAllTasks = async () => {
            const res = await axios.get(`${URL}/api/tasks/user/${user?.id}`);
            if (res) {
                // console.log("Fetch all task done!");
                // console.log("Check res data >>> ", res.data);
                // console.log("Check user data >>> ", user);
                setTasks(res.data);
            }
        };

        fetchAllTasks();
    }, [user])

    return (
        <>
            {
                user ?
                    <div className="flex flex-col md:h-screen items-center md:px-[100px] sm:px-[50px] md:py-[32px] lg:px-[200px]">
                        <div className="flex gap-10 justify-between items-start">
                            {navigates.map((item) =>
                                <Link
                                    onClick={() => {
                                        changeNav(item.name)
                                        console.log("Check pathname >>> ", pathname);
                                    }}
                                    key={item.name} to={item.url}
                                    className={`${pathname == item.url && 'bg-black text-white'} sm:text-[32px] md:text-[32px] p-4 rounded-lg hover:underline`}
                                >
                                    {item.name}
                                </Link>
                            )}
                        </div>

                        <div className="flex flex-col justify-between w-full">
                            <div className="flex justify-between items-center">
                                <h1 className='text-[2rem] font-bold my-6'>{pathname === '/' && 'All Tasks'}</h1>
                                <Link to='/create'>
                                    <IoIosAddCircle size={30} />
                                </Link>
                            </div>
                            <div className="flex w-full my-4">

                                <div className="gap-3 flex-1">

                                    <div className="flex flex-col gap-4">
                                        {tasks.map((task) => {
                                            if (!task.isDone) {
                                                return (
                                                    <TaskCard key={task.title} task={task} />
                                                )
                                            }
                                        }
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <BackGround />
            }
        </>
    )
}

export default Home