import axios from "axios"

const baseurl = import.meta.env.VITE_API_URL

export const generate = async (email) => {
    try {

        const res = await axios.post(`${baseurl}/api/auth/generateOTP`, { email })
        console.log(res)
        return res.data

    } catch (error) {
        console.log(error);

        return { message: error.response?.data?.message || "Something went wrong" }
    }
}

export const verify = async (email, otp) => {
    try {

        const res = await axios.post(`${baseurl}/api/auth/verifyOTP`, { email, otp })

        return res.data
    } catch (error) {
        return error.response?.data?.message || "Something went wrong"
    }
}

export const register = async (formdata) => {
    try {

        const res = await axios.post(`${baseurl}/api/auth/register`, formdata)

        return res.data
    } catch (error) {
        return error.response?.data?.message || "Something went wrong"
    }
}

