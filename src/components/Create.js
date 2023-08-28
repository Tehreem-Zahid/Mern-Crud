import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {useNavigate} from "react-router-dom";

function Create() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [age,setAge]=useState(0);
    const [error,setError]=useState("");
    const [mess,setMess]=useState("");
    const navigate=useNavigate();
    console.log(name,email,age);

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const addUser={name,email,age
        };
        console.log(addUser);
        const response=await fetch("http://localhost:4000/",{
            method:"POST",
            body:JSON.stringify(addUser),
            headers:
            {
                "Content-Type":"application/json",
            }
        }
        );
        const result=await response.json();
        if (!response.ok){
            console.log(result.error);
            // setError(result.error.JSON());
        }
        if(response.ok){
            console.log(result);
            setName("");
            setAge(0);
            setEmail("");
            setMess("Successfully Posted!");
            // setError("");
            navigate("/all");
        }
    }
  return (
    <div className='container my-2'>
      {/* {error && <div class="alert alert-danger">
  {error}
</div>} */}
      <h2 className='text-center'>Enter the Data</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" aria-describedby="emailHelp" value={name} onChange={(e)=>setName(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Age</label>
    <input type="number" className="form-control" value={age} onChange={(e)=>setAge(e.target.value)}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Create
