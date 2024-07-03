import React from 'react'

const LoadingSpinner = ({size="md"}) => {
  console.log("spinnning");
  return (
    <span className={`loading loading-spinner loading-${size}`}></span>
  )
}

export default LoadingSpinner
