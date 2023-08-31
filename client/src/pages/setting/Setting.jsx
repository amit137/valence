
import { useState } from "react";
import { useContext } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import "./setting.css";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";

const Setting = () => {
  const { user,dispatch } = useContext(AuthContext);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
 

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success,setSuccess]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:'UPDATE_START'})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;

      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
    const res=await axios.put("/users/" + user._id, updatedUser);//second is req.body
    setSuccess(true)
    dispatch({type:'UPDATE_SUCCESS',payload:res.data})
    } catch (err) {
      dispatch({type:'UPDATE_FAILURE'})
    }
  };

  const deleteAccount=async(e)=>{
    e.preventDefault()
    dispatch({type:'DELETE_START'})
    const deleteUser = {
      userId: user._id,
    };
    try{
     //there's a difference between how u send data in axios.put and axios.delete
    //in delete request,we need to send it as data key
    const res=await axios.delete("/users/"+user._id,{data:deleteUser})
    console.log(res.data)
    dispatch({type:"DELETE_SUCCESS",payload:res.data})
    
    }
    catch(err){
     dispatch({type:"DELETE_FAILURE"})
    }
  }

  

  return (
    <>
    <Topbar/>
    <div className="setting">
      <Sidebar/>
      <div className="settingWrapper">
        <div className="settingTitle">
          <span className="settingUpdateTitle">Update Your Account</span>
          <span className="settingDeleteTitle" onClick={deleteAccount}>Delete Account</span>
        </div>
        <form action="" className="settingForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingDP">
            <img src={file ? URL.createObjectURL(file) : PF+user.profilePicture} alt='profilepic'/>
            <label htmlFor="fileInput">
              <button className="settingDPIcon">+</button>
            </label>
            <input type="file" name="" id="fileInput" 
            onChange={(e)=>setFile(e.target.files[0])}/>
          </div>
          <label htmlFor="">Username</label>
          <input type="text" name="" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)} />
          <label htmlFor="">Email</label>
          <input type="email" name="" placeholder={user.email} onChange={(e)=>setEmail(e.target.value)} />
          <label htmlFor="">Password</label>
          <input type='password'  onChange={(e)=>setPassword(e.target.value)}/>
          <button className="settingSubmit" type="submit">Update</button>

          {success && (
            <span>Profile has been updated</span>
          )}
        </form>
      </div>
    </div>
    </>
  );
};

export default Setting;
