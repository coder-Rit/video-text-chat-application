import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GoBack from '../AuthPage/components/GoBack';



const MyProfile = (props: any) => {
  const { setopenSiderState } = props
  return (
    <>
      <GoBack goBack={props.goBack} icon="goBack"></GoBack>

      <div style={{ width: "300px" }}>
        <h2 className='sidepanle_heading'>PROFILE</h2>
      </div>
    </>
  )
}

export default MyProfile