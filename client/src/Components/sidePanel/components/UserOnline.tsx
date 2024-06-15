import React, { memo } from 'react'

interface lastSeen {
 lastSeen :string
}

const UserOnline = (props:lastSeen) => {
  return (
    <>
    {<div className={props.lastSeen === "online" ? "online" : ""}>{ props.lastSeen === "online" ? "online" : null}</div>}
    </>
  )
}

export default memo(UserOnline)