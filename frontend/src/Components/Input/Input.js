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
  maxLength,
  disabled,
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
          maxLength={maxLength}
          required
          disabled={disabled}
        />
      </div>
    </>
  )
}

export default Input
