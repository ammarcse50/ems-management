import axios from "axios";

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_EMS_Base_URL,
});
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;