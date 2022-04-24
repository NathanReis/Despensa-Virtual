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
    if (screen === 'ExpiredsConsumedsChart' || screen === 'ExpiredConsumedChart') {
      navigator.navigate('PantryUniqueProducts' as never, { screen } as never);
    } else
      navigator.navigate(screen as never);
  }

  return (
    <View style={styles.container}>
      <CustomButton onPress={() => handleNavigate('MostConsumedChart')}
        style={styles.cardContainer}>
        <Text style={styles.chartTitle}>Mais consumidos</Text>
        <Text style={styles.chartDescription}>
          Esse gráfico analisa seus produtos que mais foram consumidos, e mostra seu consumo médio do mesmo
          por semana ou por mês
        </Text>
      </CustomButton>

      <CustomButton onPress={() => handleNavigate('ExpiredConsumedChart')}
        style={styles.cardContainer}>
        <Text style={styles.chartTitle}>Vencidos x consumidos</Text>
        <Text style={styles.chartDescription}>
          Esse gráfico analisa com base em sua última compra de
          determinado produto, o quanto foi consumido e quantas unidades deste produto venceram.
        </Text>
      </CustomButton>

      <CustomButton onPress={() => handleNavigate('ExpiredsConsumedsChart')}
        style={styles.cardContainer}>
        <Text style={styles.chartTitle}>Vencidos x consumidos</Text>
        <Text style={styles.chartDescription}>
          Esse gráfico analisa com base em todas suas compras de
          determinado produto, uma porcentagem de quantas unidades do produto que foram compradas que acabaram vencendo
        </Text>
      </CustomButton>

    </View>
  )
}
