/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from 'axios'
import { URL } from "../../url";
import { useNavigate } from 'react-router-dom'
const Verify = () => {
    const { id } = useParams();
    const [verifyCode, setVerifyCode] = useState('')
    const [saveCode, setSaveCode] = useState("");

    const navigate = useNavigate();

    const generateCode = () => {
        const min = 100000
        const max = 999999

        const randomCode = Math.floor(Math.random() * (max - min + 1)) + min

        setSaveCode(randomCode)
    }

    useEffect(() => {
        generateCode();
    }, [])

    const handleSendCode = async () => {
        console.log("Sent!")

        const user = await axios.get(`${URL}/api/user/${id}`);

        const body = {
            email: user.data.email,
            _id: id,
            code: saveCode
        }

        await axios.post(`${URL}/api/auth/verify`, body)
    }

    const handleSubmit = async () => {
        try {
            if (verifyCode == saveCode) {
                await axios.put(`${URL}/api/auth/confirm/${id}`, { verified: true })
                alert("Verify successfully!")
                navigate('/login')
            } else {
                alert("Verify Unsuccessfully!")
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mx-auto p-4">
            <label className="font-semibold" htmlFor="verificationCode">Enter verify code from your email:</label>
            <input
                type="number"
                id="verificationCode"
                name="verificationCode"
                value={verifyCode}
                onChange={(e) =>
                    setVerifyCode(e.target.value)
                }
                placeholder="e.g., 123456"
                className="p-2"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md my-2" onClick={handleSendCode}>Send code</button>

            <button className="px-4 py-2 bg-black text-white rounded-md my-2" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Verify