import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { Loading } from '../../components/loading';
import api from '../../services/api';
import styles from './styles';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { DateHelper } from '../../helpers/DateHelper';

interface IChartResponse {
  nomeProduto: string,
  qtdConsumida: number,
  qtdVencida: number,
  qtdDisponivel: number,
  qtdTotal: number,
  purchaseDate: string
}

interface IParams {
  idProduct: number,
  idUserGroup: number
}
export function ExpiredsConsumedsChart() {
  let [isLoading, setIsLoading] = useState<boolean>(true);
  let [chartData, setChartData] = useState<IChartResponse>();
  let route = useRoute();
  let routeParams = route.params as IParams;
  let isFocused = useIsFocused();
  const data = [
    { key: 1, value: chartData?.qtdTotal },
    { key: 2, value: chartData?.qtdConsumida },
    { key: 3, value: chartData?.qtdVencida },
  ];

  let barColor = {
    1: '#7AF8E1',
    2: '#8BF359',
    3: '#F35959'
  }
  async function loadData() {
    setIsLoading(true);

    try {
      let response = await api.get<IChartResponse>(`/analytics/user-groups/${routeParams.idUserGroup}/product/${routeParams.idProduct}/last-purchase`)
      let data = response.data;
      // data.purchaseDate = DateHelper.convertFromStoreToViewFormat(chartData!.purchaseDate).substring(0, 10)
      setChartData(data);
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Erro inesperado!');
    }

    setIsLoading(false);
  }


  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  return isLoading
    ? <Loading />
    : (
      <View style={styles.container}>
        <Text style={styles.chartDescription}>Análise com base em sua última compra desse produto</Text>
        <Text style={styles.productName}>{chartData?.nomeProduto}</Text>
        <VictoryChart
          // adding the material theme provided with Victory
          theme={VictoryTheme.material}
          domainPadding={20}
        >
          <VictoryAxis
            tickValues={[1, 2, 3]}
            tickFormat={["Total", "Consumidos", "Vencidos"]}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (x)}
          />
          <VictoryBar
            labels={[String(chartData?.qtdTotal), String(chartData?.qtdConsumida), String(chartData?.qtdVencida)]}
            data={data}
            x="key"
            y="value"
            style={{
              data: {
                fill: ({ datum }) => barColor[datum.key],
              },
              labels: { fill: "black" }
            }}
          />
        </VictoryChart>
        <Text style={styles.purchaseDateText}>Data da compra: {chartData?.purchaseDate}</Text>
      </View>
    )
}
