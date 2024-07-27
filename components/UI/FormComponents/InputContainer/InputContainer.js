import React from 'react'

const InputContainer = (props) => {
  return (
    <div className="flex flex-col gap-5">
        {props.children}
    </div>
  )
}

export default InputContainer