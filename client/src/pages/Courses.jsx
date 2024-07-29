import React from 'react'
import { useSelector } from 'react-redux'

function Courses() {
  const user = useSelector(state => state.user);
  return (
    <div>
      {user}
    </div>
  )
}

export default Courses