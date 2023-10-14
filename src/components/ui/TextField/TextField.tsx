import React, { FC, PropsWithChildren } from 'react';
import classes from './TextField.module.scss';

interface TextFieldProps {
  user?: Record<string, string>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  text: string
  name: string
  packName?: string
}

export const TextField: FC<PropsWithChildren<TextFieldProps>> = ({
  user, onChange, text, name, packName,
}) => (
  <div className={classes.FormInput}>
    <input
      required
      className={`${classes.Input} ${!(user) || user[name] ? classes.InputActive : ''}`}
      value={user ? user[name] : packName}
      type={`${name === 'password' ? 'password' : 'text'}`}
      name={name}
      placeholder=""
      onChange={user ? (e) => onChange(e) : (e) => onChange(e)}
    />
    <label
      htmlFor={name}
      className={classes.Label}
    >
      {text}
    </label>
  </div>
);

TextField.defaultProps = {
  user: undefined,
  packName: undefined,
};
