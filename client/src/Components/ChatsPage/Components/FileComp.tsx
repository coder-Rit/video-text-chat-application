import React, { useEffect, useState } from 'react'
import { extractFileType, formatBytes } from '../commonFunc'
import DownloadFileIcon from '../../AuthPage/components/DownloadFileIcon'
import IndetermineProgress from '../../AuthPage/components/IndetermineProgress'
import { Box } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
 


const FileComp = (props: any) => {

  const { fileName, fileSize, url, mimeType } = props.fileData 

  const [imageUrl, setimageUrl] = useState("")



  const set_fileCaption =()=>{
    props.set_fileCaption(props.index + 1)
  }




  useEffect(() => {
    if (mimeType) {

      setimageUrl(extractFileType(mimeType))
    }

  }, [mimeType])

  useEffect(() => {

    if (props.index ===0) {
      set_fileCaption()
    }
    
  }, [])
  



  if (props.For === "preview") {

    return (
      <>


        <div style={{ backgroundColor: props.fileCaption - 1 === props.index ? "rgba(255, 255, 255, 0.081)" : "rgba(0, 0,0, 0)" }} onClick={set_fileCaption }>
          <div className={`FileDisplay FileDisplay_Specific  ${imageUrl} `}>

            <span className="RemoveCircleOutlineIcon" onClick={() => {
              props.removeFile(props.index)
              props.set_fileCaption(0)
            }} >

              <RemoveCircleOutlineIcon sx={{ fontSize: "13px" }} ></RemoveCircleOutlineIcon>
            </span>


            <img className='fileIcone' src={`./images/${imageUrl}.png`} alt="" />

            <div className='fileDetails'>
              <span>{fileName}</span>
              <div className='filesTechnical'>
                <span>{imageUrl}</span>
                <span style={{ textAlign: "right" }}>{formatBytes(fileSize)}</span>
              </div>
            </div>


          </div>
        </div>

      </>

    )



  } else   {
    

    return (
      <div className={`FileDisplay ${imageUrl} `}>
        <div className='fileIconeDiv'>
          <div className='FileAnimation'>
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
              {url === "" && <IndetermineProgress></IndetermineProgress>}
              {url !== "" && <a href={url} target='_blank'> <DownloadFileIcon  ></DownloadFileIcon></a>}
            </Box>
          </div>
          <img className={`fileIcone ${'opacity7'} `} src={`/images/${imageUrl}.png`} alt="" />
        </div>

        <div className='fileDetails'>
          <h4>{fileName}</h4>
          <div className='filesTechnical'>
            <div>{imageUrl}</div>
            <div style={{ textAlign: "right" }}>{formatBytes(parseInt(fileSize))}</div>
          </div>
        </div>
      </div>
    )

  
 
  }



}

export default FileComp