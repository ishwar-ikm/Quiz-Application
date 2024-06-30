import React from 'react'

const LoadingSpinner = ({size="md"}) => {
  return (
    <span className={`loading loading-spinner loading-${size}`}></span>
  )
}

export default LoadingSpinner
