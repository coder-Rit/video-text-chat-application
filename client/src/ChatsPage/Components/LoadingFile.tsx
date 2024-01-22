import { Box, Skeleton } from '@mui/material'
import React from 'react'

const LoadingFile = (props: any) => {

  return (
    <>
      <div className={`FileDisplay  `}>
        <div className='fileIconeDiv'>

          <div className={`fileIcone  `}>
            <Skeleton
              sx={{ bgcolor: 'grey.900', borderRadius: "5px" }}
              animation="wave"
              variant="rectangular" width={40} height={45} />
          </div>

        </div>

        <div className='fileDetails'>
          <Skeleton
            sx={{ bgcolor: 'grey.900', marginBottom: "12px", borderRadius: "2px" }}
            animation="wave"
            variant="rectangular" width={180} height={20} />

          <div className='filesTechnical'>

            <div>  <Skeleton
              sx={{ bgcolor: 'grey.900', borderRadius: "2px" }}
              animation="wave"
              variant="rectangular" width={30} height={15} /></div>

            <div style={{ textAlign: "right" }}>  <Skeleton
              sx={{ bgcolor: 'grey.900', borderRadius: "2px" }}
              animation="wave"
              variant="rectangular" width={50} height={15} /></div>
          </div>
        </div>
      </div>
       
      <span className='msgTime'>
        <Skeleton 
          sx={{ bgcolor: 'grey.900', borderRadius: "2px" }}
          animation="wave"
          variant="rectangular" width={200} height={18} />
      </span>

    </>
  )
}

export default LoadingFile