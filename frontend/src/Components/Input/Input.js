import React from 'react'

const Input = ({
  type,
  name,
  Labelname,
  value,
  placeholder,
  TrackChange,
  className,
  onBlur,
}) => {
  return (
    <>
      <div>
        <input
          type={type}
          className={className}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={TrackChange}
          onBlur={onBlur}
          required
        />
      </div>
    </>
  )
}

export default Input
