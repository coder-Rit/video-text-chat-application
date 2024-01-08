import React from 'react'
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { motion } from "framer-motion";
import CloseIcon from '@mui/icons-material/Close';

const SelectFileType = (props: any) => {
  const { storeFile, setSelectFileState,setselectedType } = props
  return (


    <motion.div className='selectFile'
      initial={{ opacity: 0, y: 150 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut', // You
      }}
    >
      <div className="RemoveCircleOutlineIcon" onClick={() => setSelectFileState(false)}>
        <CloseIcon></CloseIcon>
      </div >
      <div className='selectFileDiv'>

        <label className="lable" >
          <input type="file" hidden multiple accept="image/*" onChange={storeFile}  />
          <div className="btn-up iconStyle" onClick={()=>setselectedType('photos')}>
            <div>
              <PhotoSizeSelectActualIcon></PhotoSizeSelectActualIcon>
            </div>
            <div>Photos</div>
          </div>
        </label>


        {/* <div>
        <span>
          <label className="lable">
            <input type="file" hidden multiple accept="video/mp4, video/webm, video/ogg" onChange={storeFile} />
            <div className="btn-up iconStyle"><VideoFileIcon></VideoFileIcon></div>
          </label>
        </span>
        <span>Video File</span>
      </div> */}
        <label className="lable">
          <input type="file" hidden multiple onChange={storeFile} />
          <div className="btn-up iconStyle" onClick={()=>setselectedType('files')}>
            <div>
              <FilePresentIcon></FilePresentIcon>
            </div>
            <div>Doucments</div> 
          </div>
        </label>

      </div>

    </motion.div>
  )
}

export default SelectFileType