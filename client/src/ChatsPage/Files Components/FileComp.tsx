import React, { useEffect, useState } from 'react'
import { extractFileType, formatBytes } from '../commonFunc'
import DownloadFileIcon from '../../AuthPage/components/DownloadFileIcon'
import IndetermineProgress from '../../AuthPage/components/IndetermineProgress'
import { Box } from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';


const FileComp = (props: any) => {

  const { fileName, fileSize, url, mimeType } = props.fileData

  const [imageUrl, setimageUrl] = useState("")


  //  const  downloadFile=(selectedFile:any)=>{

  //   const downloadLink = document.createElement('a');
  //   downloadLink.download = fileName;

  //   // Create a URL for the Blob and set it as the href attribute
  //   downloadLink.href = URL.createObjectURL(selectedFile);

  //   // Append the anchor element to the document body
  //   document.body.appendChild(downloadLink);

  //   // Trigger a click event on the anchor element
  //   downloadLink.click();

  //   // Remove the anchor element from the document
  //   document.body.removeChild(downloadLink);
  //   }





  useEffect(() => {
    console.log(props);
    
    setimageUrl(extractFileType(mimeType)) 
  }, [mimeType])



  if (props.For === "preview") {

    return (<div className={`FileDisplay FileDisplay_Specific  ${imageUrl} `}>

      <span className="RemoveCircleOutlineIcon" onClick={() => props.removeFile(props.index)} >

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
    </div>)



  } else if(props.For==="downloadable_file") { 

    return (

      <div className={`FileDisplay ${imageUrl} `}>

        <div className='fileIconeDiv'>
          <div className='FileAnimation'>
            <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
              {url === "" && <IndetermineProgress></IndetermineProgress>}
              {url !== "" && <DownloadFileIcon></DownloadFileIcon>}
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