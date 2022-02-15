import { AntDesign } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import { Modal, ModalProps, View } from 'react-native';
import { CustomButton } from '../button';
import styles from './styles';

interface ICustomModalProps extends ModalProps {
  children: ReactNode;
  handleVisible: Function;
  isVisible: boolean;
}

export function CustomModal(props: ICustomModalProps) {
  let {
    animationType,
    children,
    handleVisible,
    isVisible,
    style,
    ...rest
  } = props;

  return (
    <Modal
      {...rest}
      animationType={animationType ?? 'fade'}
      transparent={true}
      visible={isVisible}
      onRequestClose={() => handleVisible()}
    >
      <View style={[style, styles.container]}>
        <CustomButton style={styles.closeButton} onPress={() => handleVisible()}>
          <AntDesign name='close' size={24} color='#5A6CF3' />
        </CustomButton>

        {children}
      </View>
    </Modal>
  );
}
