import React from 'react';
import { CustomButton, ICustomButtonProps } from '../button';
import styles from './styles';

interface IOrangeButtonProps extends ICustomButtonProps { }

export function OrangeButton(props: IOrangeButtonProps) {
  let {
    style,
    ...rest
  } = props;

  return <CustomButton {...rest} style={[style, styles.button]} />;
}
