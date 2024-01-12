import React, { useEffect, useState } from 'react'
 
const ImageComp = (props:any) => {

  const {url,fileName} = props.fileData
 
  return ( 
    <img src={url} className='imageFile' alt={fileName} />
  )
}

export default ImageComp