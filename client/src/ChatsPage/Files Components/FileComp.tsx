import React, { useEffect, useState } from 'react'
import { formatBytes } from '../commonFunc'
import DownloadFileIcon from '../../AuthPage/components/DownloadFileIcon'
import IndetermineProgress from '../../AuthPage/components/IndetermineProgress'

const FileComp = (props: any) => {

  const { fileName, fileSize,url } = props.fileData

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









  return (

    <div className={`FileDisplay ${props.imageUrl} `}>

    <div className='fileIconeDiv'>
     {url===""&&<IndetermineProgress></IndetermineProgress>}
      <img className={`fileIcone ${url===""?'opacity7':null} `} src={`/images/${props.imageUrl}.png`} alt="" />
    </div>

      <div className='fileDetails'>
        <h4>{fileName}</h4>
        <div className='filesTechnical'>
          <div>{props.imageUrl}</div>
          <div style={{ textAlign: "right" }}>{formatBytes(parseInt(fileSize))}</div>
        </div>
      </div>
    </div>
  )
}

export default FileComp