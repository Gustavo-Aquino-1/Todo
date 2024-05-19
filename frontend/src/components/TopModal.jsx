import React, { useEffect } from 'react'

function TopModal({ children }) {
  return (
    <div className='absolute top transform left-0 flex justify-center z-50'>
      {children}
    </div>
  )
}

export default TopModal
