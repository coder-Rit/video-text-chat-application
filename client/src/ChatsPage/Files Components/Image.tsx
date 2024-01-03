import React, { useEffect, useState } from 'react'
 
const Image = (props:any) => {

  const [imgSrc, setimgSrc] = useState<any>("")

  useEffect(() => {
     
     const dataurl = URL.createObjectURL(props.Blob);
      setimgSrc(dataurl)
    
  }, [ props.BufferFile])

  return (
    
    <img src={imgSrc} className='imageFile' alt={imgSrc} />

  )
}

export default Image