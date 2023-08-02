import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Delete from "../form/Delete"
import { Outlet } from 'react-router-dom'

function Formupdate({ setSselect, sselect }) {
  const [change,setChange]=useState(false)
  const [data, setData] = useState([])
  const [loader, setLoader] = useState(false)
  //const [formdata,setFormdata]=useState({})
  useEffect(() => {
    setLoader(true);
    axios.get(`//localhost:5001/api/sdata`)
      /* .then((res)=>console.log(JSON.stringify(res.data))) */
      .then((res) => {
        setData(res.data)
        setSselect(res.data[0])
        console.log(res)
      })
      .then(() => { 
        setLoader(false)  
        setChange(false)
      })

  }, [setSselect,change])

  const deleteform = async (form) => {
    try {
      console.log(form)
      const res = await axios.delete(`//localhost:5001/api/sdata/${form}`)
      setChange(true)
      console.log(res.data);
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleDelete = (e,id) => {
    e.preventDefault()
    deleteform(id)
  }
  if (loader) {
    return (
      <div>feaching..</div>
    )
  }
  else if (data === undefined || data.length === 0) {
    return (
      <div>no data:{console.log("nodata")}</div>
    )
  }
  else
    return (
      <>
      <div className="top">
        {
          data.map((value) => (
            <div className="navcontainer">
              <div
                onClick={() => setSselect(value)}
                className={value === sselect ? "nav-select" : "nav"}
              >
                {value}

              </div>
              <div onClick={(event)=>handleDelete(event,value)}>
              <Delete/>
              </div>
            </div>
          ))
        }
      </div>
      <Outlet/>
      </>
    )
}


export default Formupdate