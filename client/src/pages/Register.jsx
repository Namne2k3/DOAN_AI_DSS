/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBlog } from 'react-icons/fa'
import axios from 'axios'
import { URL } from '../../url'
const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(false)
    const navigate = useNavigate();
    //console.log(username, email, password);

    const handleRegister = async () => {
        try {
            const newUser = { username, email, password }
            const res = await axios.post(`${URL}/api/auth/register`, newUser)
            const verified = await axios.post(`${URL}/api/auth/verify`, res.data)
            if (verified) {
                alert("Register Successfully")
                console.log("Check ResData >>> ", res.data);
                // window.location.href = '/login'
            }

        } catch (err) {
            setErr(true)
            console.log(err)
        }
    }

    return (
        <>
            <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
                <h1 className='text-lg md:text-xl font-extrabold'>
                    <Link to='/' className='flex justify-between items-center gap-[8px]'>
                        <img src={'../public/logo.png'} alt="Logo" className="max-h-[40px] max-w-[100%] mr-[10px]" />
                        <p>
                            NPT Weather Task
                        </p>
                    </Link>
                </h1>
                <h3><Link to="/login">Login</Link></h3>
            </div>
            <div className="w-full flex justify-center items-center h-[90vh] ">
                <div className="flex flex-col justify-center items-center space-y-4 w-[70%] sm:w-[60%] md:w-[40%] lg:w-[30%]">

                    <h1 className="text-xl font-bold text-left">Create an account</h1>
                    <input onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your username" />
                    <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
                    <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
                    <button onClick={handleRegister} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Register</button>
                    {err && <h3 className='text-red-500 text-sm'>Somethings went wrong!</h3>}
                    <div className="flex justify-center items-center space-x-3">
                        <p>Already have an account?</p>
                        <p className="text-gray-500 hover:text-black"><Link to="/login">Login</Link></p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Register