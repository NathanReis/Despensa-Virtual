import React from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";

import styles from './style';

interface ICustomButtonProps extends TouchableOpacityProps {
  title: string;
}

export function CustomButton(props: ICustomButtonProps) {
  let {
    activeOpacity,
    style,
    title,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={activeOpacity ?? 0.25}
      style={[styles.button, style]}
    >
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
}
