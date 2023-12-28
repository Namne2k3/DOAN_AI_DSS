/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../../url'
import { UserContext } from '../context/userContext'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(false)

    const [notVer, setNotVer] = useState(false);
    const [tempUser, setTempUser] = useState({})
    const { setUser } = useContext(UserContext)

    const handleLogin = async () => {
        try {
            const resUser = await axios.get(`${URL}/api/user/email/${email}`)
            setTempUser(resUser.data[0])
            console.log("Check userData >>> ", resUser.data[0]);

            const res = await axios.post(`${URL}/api/auth/login`, { email, password }, { withCredentials: true })
            if (res) {
                setUser(res.data);
                alert("Login successfully!")
                window.location.href = '/'
            }
        }
        catch (err) {
            setNotVer(true);
            console.log(err.response.data.message);
        }
    }

    return (
        <>
            <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
                <h1 className='text-lg md:text-xl font-extrabold'>
                    <Link to='/' className='flex justify-between items-center gap-[8px]'>
                        <img src={'../public/logoNPT_out.png'} alt="Logo" className="max-h-[40px] max-w-[100%] mr-[10px]" />
                        <p>
                            NPT Weather Task
                        </p>
                    </Link>
                </h1>
                <h3><Link to="/register">Register</Link></h3>
            </div>
            <div className="w-full flex justify-center items-center h-[90vh] ">
                <div className="flex flex-col justify-center items-center space-y-4 w-[70%] sm:w-[60%] md:w-[40%] lg:w-[30%]">
                    <h1 className="text-xl font-bold text-left">Log in to your account</h1>
                    <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
                    <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
                    <button onClick={handleLogin} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Log in</button>
                    {err && <h3 className='text-red-500 text-sm'>Somethings went wrong!</h3>}
                    <div className="flex justify-center items-center space-x-3">
                        <p>Don't have an account?</p>
                        <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p>
                    </div>

                    {
                        notVer &&
                        <div>
                            <p className='text-red-500 font-light'>Email hasn't been verified!</p>
                            <Link className='text-blue-500 underline' to={`/verify/${tempUser?._id}`}>Click here to verify your email</Link>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Login