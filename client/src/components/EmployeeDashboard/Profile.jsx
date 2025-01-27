import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
const Profile = () => {
  const [singleUser, setSingleUser] = useState([]);
  const { user } = useAuth();
  console.log(user._id);
  const fetchSingleEmployee = async (req, res) => {
    const response = await axios.get(
      `http://localhost:5001/api/auth/getSingleUser/${user._id}`
    );

    setSingleUser(response.data.employee);
  };

  useEffect(() => {
    fetchSingleEmployee();
  }, []);

  console.log(singleUser);

  return (
    <div className="flex w-50 rounded-lg bg-slate-100 mx-auto">
      <div className="avatar mt-20 ml-20">
        <div className="ring-primary ring-offset-base-100 w-44 rounded-full ring ring-offset-2">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>

      <div className="mt-32 ml-4">
        <h2 className="font-bold">Name: {singleUser.name}</h2>
        <h2 className="font-semibold">Email: {singleUser.email}</h2>
        <h2 className="font-semibold">role: {singleUser.role}</h2>
      </div>
    </div>
  );
};

export default Profile;
