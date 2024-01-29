import React, { useEffect, useState } from 'react'
import useDisplay, { useDisplayI } from '../../../hooks/useDisplay'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MessageIcon from '@mui/icons-material/Message';
import { sidePanle_I } from '../../../Interfaces/common';



const GoBack = (props: sidePanle_I) => {

  const Display: useDisplayI = useDisplay()
  const [width, setWidth] = useState(1200)



  useEffect(() => {
    setWidth(Display.getScreenWidth())
  }, [window.innerWidth])


  return (
    <>
      {width <= 1000 && <span style={{display:"flex",alignItems:"center"}} onClick={() => props.goBack('index')}>

        {props.icon === "backIcon" && <ArrowBackIcon></ArrowBackIcon>}
        {props.icon === "message" && <MessageIcon></MessageIcon>}

      </span>}
    </>
  )
}

export default GoBack