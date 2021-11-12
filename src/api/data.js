import axios from 'axios';

const url = 'https://travellog-backend-server.herokuapp.com';

export const getAllLogs = async (data) => {
    try {
        return await axios.get(`${url}/getlog/?email=${data}`);
    } catch (error) {
        console.log('Error while calling uploadFile API ', error);
    }
}
export const createLogEntry = async (data) => {
    try {
        return await axios.post(`${url}/savelog`,data);
       
      
    } catch (error) {
        console.log('Error while calling uploadFile API ', error);
    }
}
export const uploadFile = async (post) => {
    console.log(post);
    try {
        const info= await axios.post(`https://api.cloudinary.com/v1_1/de9j6ufii/image/upload `, post);
        alert("image save successfully");
        return info;
    } catch (error) {
        console.log('Error while calling uploadFile API ', error);
    }
}

export const deletePost = async (id) => {
    try {
        return await axios.delete(`${url}/delete/${id}`);
    } catch(error) {
        console.log('Error while calling deletePost API ', error)
    }
}


