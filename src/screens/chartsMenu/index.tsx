import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import { CustomButton } from '../../components/button';


export function ChartsMenu() {
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let isFocused = useIsFocused();
  let navigator = useNavigation();



  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused]);

  async function handleNavigate(screen: string) {
    navigator.navigate(screen as never);
  }

  return (
    <View style={styles.container}>
      <CustomButton onPress={() => handleNavigate('MostConsumedChart')}
        style={styles.cardContainer}>
        {/* <Image
          style={styles.image}
          source={require('../../../assets/chart1.png')}
        /> */}
        <Text>Mais consumidos</Text>
      </CustomButton>

      <CustomButton onPress={() => handleNavigate('PantryUniqueProducts')}
        style={styles.cardContainer}>
        {/* <Image
          style={styles.image}
          source={require('../../../assets/chart1.png')}
        /> */}
        <Text>Produtos vencidos x consumidos</Text>
      </CustomButton>

      <CustomButton onPress={() => handleNavigate('ExpiredsConsumedsChart')}
        style={styles.cardContainer}>
        {/* <Image
          style={styles.image}
          source={require('../../../assets/chart1.png')}
        /> */}
        <Text>Produtos vencidos x consumidos</Text>
      </CustomButton>

    </View>
  )
}
