import axios from 'axios';
import React, { useState } from 'react';
import './App.css';
import { FiUsers, FiMapPin, FiLink } from "react-icons/fi";

function App() {

  const [users, setUsers] = useState("");
  const [inputUsers, setInputUsers] = useState({
    name: "",
    username: "",
    img: "",
    location: "",
    followers: "",
    following: "",
    repo: "",
    blog: "",
    bio: ""
  });

  const fetchUsers = () => {
    axios.get(`https://api.github.com/users/${users}`)
    .then((res) => {
      setInputUsers({
        name: res.data.name,
        username: res.data.login,
        img: res.data.avatar_url,
        location: res.data.location,
        followers: res.data.followers,
        following: res.data.following,
        repo: res.data.public_repos,
        blog: res.data.blog,
        bio: res.data.bio
      })
      console.log(res)
    })
    .catch(() => {
      alert("Foydalanuvchi topilmadi!")
    })
  }
  
  return (
    <>
    <div className="box">
      <div className='top'>
        <input type="text" onChange={(event) => setUsers(event.target.value)} placeholder="Foydalanuvchi nomini kiriting..."/>
        <button onClick={fetchUsers}>Search</button>
      </div>
      <div className='bottom'>
        <img className='userPhoto' src={inputUsers.img} alt="Foydalanuvchi rasmi"/>
        <h1 className='user'>{inputUsers.name}</h1>
        <p className='username'>{inputUsers.username}</p>
        <p className='bio'>{inputUsers.bio}</p>
        <p className='followers'><FiUsers/> <span>{inputUsers.followers}</span> Followers • <span>{inputUsers.following}</span> following</p>
        <p className='location'><FiMapPin/> {inputUsers.location}</p>
        <p className='blog'><FiLink/> <a href={inputUsers.blog} target="_blank">{inputUsers.blog}</a></p>
      </div>
    </div>
    </>
  );
}

export default App;
