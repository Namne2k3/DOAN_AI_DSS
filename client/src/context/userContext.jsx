/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../../url";

const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`${URL}/api/auth/refetch`, { withCredentials: true })
                if (res) {
                    // console.log("Refetching data User >>> ", res?.data);
                    setUser(res?.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
        // console.log("Check process.env >>> ", import.meta.env.VITE_TEST);
        getUser();
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export {
    UserContext,
    UserProvider
}