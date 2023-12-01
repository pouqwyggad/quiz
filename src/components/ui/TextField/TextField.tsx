import React, { FC, PropsWithChildren } from 'react';
import classes from './TextField.module.scss';

interface TextFieldProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  user?: Record<string, string>;
  packName?: string;
  text: string;
  name: string;
}

export const TextField: FC<PropsWithChildren<TextFieldProps>> = (
  {
    onChange,
    packName,
    user,
    text,
    name,
  },
) => (
  <div className={classes.FormInput}>

    <input
      onChange={user ? (e) => onChange(e) : (e) => onChange(e)}
      className={`${classes.Input} ${!(user) || user[name] ? classes.InputActive : ''}`}
      type={`${name === 'password' ? 'password' : 'text'}`}
      value={user ? user[name] : packName}
      placeholder=""
      name={name}
      required
    />

    <label
      className={classes.Label}
      htmlFor={name}
    >
      {text}
    </label>
  </div>
);

TextField.defaultProps = {
  packName: undefined,
  user: undefined,
};
