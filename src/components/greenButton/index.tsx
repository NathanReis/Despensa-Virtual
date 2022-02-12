import React from 'react';
import { CustomButton, ICustomButtonProps } from '../button';
import styles from './styles';

interface IGreenButtonProps extends ICustomButtonProps { }

export function GreenButton(props: IGreenButtonProps) {
  let {
    style,
    ...rest
  } = props;

  return <CustomButton {...rest} style={[style, styles.button]} />;
}
