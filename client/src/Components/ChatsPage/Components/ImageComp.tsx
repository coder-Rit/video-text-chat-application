import { Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Img } from 'react-image';
import { selectMessage } from '../../../actions/selectAction';
import { fileI } from '../../../Interfaces/message';
import { useDispatch } from 'react-redux';


interface fileDataI {
  fileData:fileI,
  idx:number
}



const ImageComp = (props: fileDataI) => {

  const Dispatch = useDispatch()

  const { url, fileName } = props.fileData
  const [imageLoaded, setImageLoaded] = useState(false);


  const dispathMessageIndex =(idx:number)=>{
    Dispatch(selectMessage(idx))
  }

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
         <Img src={url} onClick={()=>dispathMessageIndex(props.idx)} className='imageFile' style={{marginBottom:"10px"}} alt={fileName}  />
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