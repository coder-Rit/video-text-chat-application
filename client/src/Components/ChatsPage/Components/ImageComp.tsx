import { Skeleton } from '@mui/material';
import React, { useEffect, useState, useMemo } from 'react';
import { Img } from 'react-image';
import { selectMessage } from '../../../actions/selectAction';
import { fileI } from '../../../Interfaces/message';
import { useDispatch } from 'react-redux';

interface fileDataI {
  fileData: fileI;
  idx: number;
}

const ImageComp = (props: fileDataI) => {
  const Dispatch = useDispatch();
  const { url, fileName } = props.fileData;

  // Use useMemo to create a cached image object reference
  const cachedImage = useMemo(() => (url ? new Image() : null), [url]);

  // Load the image conditionally based on cachedImage existence and url change
  useEffect(() => {
    if (url && !cachedImage?.src) { // Use optional chaining here
      // @ts-ignore
      cachedImage.src = url ?? ''; // Use nullish coalescing here
      // @ts-ignore
      cachedImage.onload = () => {
        setImageLoaded(true);
      };

    }
  }, [url, cachedImage]);




  const [imageLoaded, setImageLoaded] = useState(false);

  const dispatchMessageIndex = (idx: number) => {
    Dispatch(selectMessage(idx));
  };

  return (
    <div>
      {imageLoaded ? (
        <Img
          src={url}
          onClick={() => dispatchMessageIndex(props.idx)}
          className="imageFile"
          style={{ marginBottom: "10px" }}
          alt={fileName}
        />
      ) : (
        <Skeleton
          sx={{ bgcolor: 'grey.900' }}
          animation="wave"
          variant="rectangular"
          width={250}
          height={200}
        />
      )}
    </div>
  );
};

export default ImageComp;
