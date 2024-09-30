import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

//moment

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({email:"", name:"",role:"", _id:""})

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/all-user`, {
        withCredentials: true,
      });
      // console.log("all user data", response.data)
      setAllUsers(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Couldn't fetch user data");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white p-4">
      <table className="w-full userTable">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser && allUser.data ? (
            allUser.data.map((el, index) => (
              <tr>
                <td className="p-3">{index + 1}</td>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.role}</td>
                <td>{new Date(el.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                  onClick={() => {
                    setUpdateUserDetails(el)
                    setOpenUpdateRole(true)
                  }}>
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        openUpdateRole && (
            <ChangeUserRole onClose = {()=> setOpenUpdateRole(false)} 
            name={updateUserDetails.name} email={updateUserDetails.email} role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callFunc = {fetchAllUsers}/>
        )
      }
    </div>
  );
};

export default AllUsers;
