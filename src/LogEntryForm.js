import React, { useState,useEffect,useContext  } from 'react';
import { useHistory } from "react-router-dom";
import { createLogEntry,uploadFile } from './api/data.js';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import  {LoginContext} from './App';
const url ="/home";
const LogEntryForm = (location) => {
   const history = useHistory();
   const {account} = useContext(LoginContext);
 const initialPost = {
    latitude:location.location.latitude ,
    longitude:location.location.longitude,
    title: '',
    description: '',
    'comments':'',
    image: '',
    user:account.email,
    visitDate: ''
}
const [post, setPost] = useState(initialPost);
const [imageURL, setImageURL] = useState('');
const [file, setFile] = useState('');
useEffect(() => {
  const getImage = async () => { 
      if(file) {
        try{
          const data = new FormData();
          data.append("upload_preset", "blogappnihal");
          data.append("file", file);
          
          const image = await uploadFile(data);
          post.image = image.data.secure_url;
          setImageURL(image.data.secure_url);
        }
        catch(err){
          alert("invalid file format");
        }
      }
  }
  getImage();
  // post.username = account.email;
}, [file])
const handleChange = (e) => {
  setPost({ ...post, [e.target.name]: e.target.value });
    }
 const savePost = async (e) => {
 


await createLogEntry(post);
e.preventDefault();
  history.push('/');
    }

  return (
    <>
    <Paper >
    <form autoComplete="off" noValidate  onSubmit={(e) => savePost(e)}>
      <Typography variant="h6">{ 'Creating a Memory'}</Typography>
      <TextField name="title" variant="outlined" label="Title" fullWidth  onChange={(e) => handleChange(e)} />
      <TextField name="comments" variant="outlined" label="comments" fullWidth multiline rows={1}  onChange={(e) => handleChange(e)} />
      <TextField name="description" variant="outlined" label="description" fullWidth multiline rows={4}  onChange={(e) => handleChange(e)} />
      <input name="visitDate" type="date" for ="visitDate" onChange={(e) => handleChange(e)} />
      <div ><input type="file"  id="fileInput"
      onChange={(e) => setFile(e.target.files[0])}  /></div>
      <Button  variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
    </form>
  </Paper>
</>
  );
};

export default LogEntryForm;
