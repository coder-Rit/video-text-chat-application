import React, { useEffect, useState } from 'react'

const FileComp = (props: any) => {

  const { mimeType,fileName,fileSize } = props.fileData

  const [imageUrl, setimageUrl] = useState("")



 const  downloadFile=(selectedFile:any)=>{

  const downloadLink = document.createElement('a');
  downloadLink.download = fileName;

  // Create a URL for the Blob and set it as the href attribute
  downloadLink.href = URL.createObjectURL(selectedFile);

  // Append the anchor element to the document body
  document.body.appendChild(downloadLink);

  // Trigger a click event on the anchor element
  downloadLink.click();

  // Remove the anchor element from the document
  document.body.removeChild(downloadLink);
  }

  function formatBytes(bytes:number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}



  useEffect(() => {


    switch (mimeType) {

      case "application/pdf":
        setimageUrl("pdf")
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        setimageUrl("doc")
        break;
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        setimageUrl("ppt")
        break;
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        setimageUrl("xls")
        break;
        default:
        setimageUrl("unknown")
        break;
    }
 
  }, [])




  return (
    <div className={`FileDisplay ${imageUrl} `}>
       

      <img className='fileIcone' onClick={()=>downloadFile(props.Blob)} src={`/images/${imageUrl}.png`} alt="" />
       
      <div className='fileDetails'>
        <span>{fileName}</span>
        <div className='filesTechnical'>
          <span>{imageUrl}</span>
          <span style={{ textAlign: "right" }}>{formatBytes(parseInt(fileSize))}</span>
        </div>
      </div>
    </div>
  )
}

export default FileComp