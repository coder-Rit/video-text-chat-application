import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
const IndetermineProgress = () => {
    return (
        <div className='FileAnimation'>  <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <CircularProgress
                size={30}
                sx={{color:"white"}}
                thickness={2}
            />
        </Box></div>
    )
}

export default IndetermineProgress