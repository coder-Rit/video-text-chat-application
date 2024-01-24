import { Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Img } from 'react-image';



const ImageComp = (props: any) => {

  const { url, fileName } = props.fileData
  const [imageLoaded, setImageLoaded] = useState(false);


  useEffect(() => {

    if (url) {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        setImageLoaded(true);
      };
    }

  }, [url]);



  return (
    <div>
      {imageLoaded ? (
         <Img src={url} className='imageFile' style={{marginBottom:"10px"}} alt={fileName}  />
      ) : (
        <Skeleton
          sx={{ bgcolor: 'grey.900' }}
          animation="wave"
          variant="rectangular" width={250} height={200} />
      )}
    </div>
  );





}

export default ImageComp