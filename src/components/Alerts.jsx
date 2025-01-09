import React from 'react'
import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Alerts = ({txt, err}) => {
    useEffect(()=>{
        if(err) toast.error(err)
        else toast.success(txt)
    }, [txt,err])
  return (
    <div>
      <ToastContainer/>
    </div>
  )
}

export default Alerts
