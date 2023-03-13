import React from 'react'

const Alert = ({type = '', message = ''}) => {
  return (
    <div className={`${type === "error" ? 'bg-red-600' : 'bg-green-600'} p-2 text-white font-bold rounded-lg shadow-lg text-center`}>
        <p>{message}</p>
    </div>
  )
}

export default Alert