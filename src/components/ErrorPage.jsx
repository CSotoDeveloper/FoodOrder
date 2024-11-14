import React from 'react'

const ErrorPage = ({title, message}) => {
  return (
    <div className='center'>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )
}

export default ErrorPage