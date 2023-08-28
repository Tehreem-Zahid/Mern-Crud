import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";


function Read() {

  const [data, setData] = useState([]);
  // const [error,setError]=useState("");

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const response = await fetch("http://localhost:4000");
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
    }
    if (response.ok) {
      setData(result);
    }

  }
  // const getData = async () => { 
  //   const res = await fetch("http://localhost:4000/");
  //   const d = await res.json();
  //   return setData(d); 
  //   }

  const handleDelete=async (id)=>{
    const response=await fetch(`http://localhost:4000/${id}`,{
      method:"DELETE"
    });

    const result=await response.json();
    if (!response.ok) {
      console.log(result.error);
    }
    if (response.ok) {
      // setError("");
      setTimeout(() => {
        getData();
      }, 1000);
    };
    
  };
  
  console.log(data);
  return (
    <>
    <div className='container my-2'>
      <h2 className='text-center'>All data</h2>
      <div className='row gy-3'>
        {data?.map((ele) => {
          return(<div key={ele._id} className='col-4'>
          <div className="card" >
            <div className="card-body">
              <h5 className="card-title">{ele.name}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">{ele.email}</h6>
              <p className="card-text">{ele.age}</p>
              <a href="#" className="card-link" onClick={()=>handleDelete(ele._id)}>Delete</a>
              <Link to={`/${ele._id}`} className="card-link">Edit</Link>
            </div>
          </div>
        </div>);
          
        })}

      </div>
    </div>
    </>
  )
}

export default Read
