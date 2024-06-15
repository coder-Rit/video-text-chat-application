import React from 'react'

import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorIcon from '@mui/icons-material/Error';
const DeliveryStatus = ({delivery}:{delivery:String}) => {

  switch (delivery) {
    case "seen":
      return <DoneAllIcon sx={{color:"#915effe1",fontSize:"12px"}}></DoneAllIcon>

    case "unseen":
      return <DoneAllIcon sx={{color:"white",fontSize:"12px"}}></DoneAllIcon> 

    case "out":
      return <CheckIcon sx={{color:"white",fontSize:"12px"}}></CheckIcon>

    case "processing":
      return <AccessTimeIcon sx={{color:"white",fontSize:"12px"}}></AccessTimeIcon>
  
    default:
      return <ErrorIcon sx={{color:"red",fontSize:"12px"}}></ErrorIcon>
  }
  
  
}

export default DeliveryStatus