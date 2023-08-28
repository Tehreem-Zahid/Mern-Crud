import React, { useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

function Update() {
  const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [age,setAge]=useState(0);
    const navigate=useNavigate();
    const {id}=useParams();


    //get single user data
    const getSingleUser=async ()=>{
      
      const response=await fetch(`http://localhost:4000/${id}`);
      const result=await response.json();
      if (!response.ok) {
        console.log(result.error);
      }
      if (response.ok) {
        console.log("Updated user",result);
        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      };

    };
    useEffect(()=>{
      getSingleUser();
    },[]);

    //send updated data to backend
    const handleEdit=async (e)=>{
      e.preventDefault();
        const updatedUser={name,email,age
        };
        console.log(updatedUser);
        const response=await fetch(`http://localhost:4000/${id}`,{
            method:"PATCH",
            body:JSON.stringify(updatedUser),
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
            navigate("/all");
        }
    }
  return (
    <div>
      <div className='container my-2'>
      {/* {error && <div class="alert alert-danger">
  {error}
</div>} */}
      <h2 className='text-center'>Edit the Data</h2>
      <form onSubmit={handleEdit}>
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
    </div>
  )
}

export default Update
