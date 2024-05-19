import React from 'react'

function Modal({ children }) {
  return (
    <div className='absolute top-1/2 transform -translate-y-1/2 left-0 right-0 flex justify-center backdrop-blur-lg'>
      {children}
    </div>
  )
}

export default Modal
