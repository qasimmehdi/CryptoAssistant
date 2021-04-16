import axios from "axios";


export const getProfile = () => {
    return axios.get(`/profile`);
  };

  export const updateProfile = (data) => {
    return axios.put(`/profile/update`,data);
  };
  
  export const changePassword = async (oldp,newp) => {
    const profile =  await axios.get(`/profile`);
    const data = {
        ...profile.data,
        oldPassword:oldp,
        newPassword:newp
    };
    return axios.put(`/profile/update`,data);
  }