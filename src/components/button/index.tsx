import React, { ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styles from './style';

export interface ICustomButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

export function CustomButton(props: ICustomButtonProps) {
  let {
    activeOpacity,
    children,
    style,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={activeOpacity ?? 0.25}
      style={[styles.button, style]}
    >
      {children}
    </TouchableOpacity>
  );
}
