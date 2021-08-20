import { any, string } from 'prop-types';
import './index.scss';
import { InputType } from '../../Type';
import { useState } from 'react';
export default function Input({
  label,
  type,
  placeholder = '',
  name,
  postfix,
  onChange,
  value = '',
  className,
  register = null,
}: InputType) {
  const [inputValue, setInputValue] = useState(value);

  function onChangeHandler(event) {
    const value = event.target.value;
    setInputValue(value);
    if (onChange) onChange(value);
  }
  return (
    <div className={`input-wrapper ${className}`}>
      {label && <label>{label}</label>}
      <input
        type={type}
        defaultValue={inputValue ? inputValue : ''}
        placeholder={placeholder}
        onChange={onChangeHandler}
        {...(register && register(name, { required: false }))}
      />
      {postfix && <span className="postfix">{postfix}</span>}
    </div>
  );
}
