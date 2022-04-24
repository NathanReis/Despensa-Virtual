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
  let [chartData, setChartData] = useState<IChartResponse[]>();
  let route = useRoute();
  let routeParams = route.params as IParams;
  let isFocused = useIsFocused();

  let data: Array<any> = [];
  let tickValues: Array<any> = [];
  let tickFormat: Array<any> = [];
  let labels: Array<any> = [];

  let i = 1;
  chartData?.map(x => {
    if (x.qtdTotal != 0) {
      tickValues.push(i);
      tickFormat.push(DateHelper.convertFromStoreToViewFormat(x.purchaseDate).substring(0, 10))
      let value = ((x.qtdVencida / x.qtdTotal) * 100);
      data.push({ key: i, value: value });
      labels.push(`${value}%`);
      i++;
    }
  })

  async function loadData() {
    setIsLoading(true);

    try {
      let response = await api.get<IChartResponse[]>(`/analytics/user-groups/${routeParams.idUserGroup}/product/${routeParams.idProduct}/all-purchases`)
      let data = response.data;
      // data.purchaseDate = DateHelper.convertFromStoreToViewFormat(chartData!.purchaseDate).substring(0, 10)
      setChartData(data.reverse());
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
        <Text style={styles.chartDescription}>Análise com base em suas últimas compras desse produto</Text>
        <Text style={styles.productName}>{chartData![0].nomeProduto}</Text>
        <VictoryChart
          // adding the material theme provided with Victory
          theme={VictoryTheme.material}
          domainPadding={20}
        >
          <VictoryAxis
            tickValues={tickValues}
            tickFormat={tickFormat}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (x)}
          />
          <VictoryBar
            labels={labels}
            data={data}
            x="key"
            y="value"
            style={{
              data: {
                fill: '#F35959',
              },
              labels: { fill: "black" }
            }}
          />
        </VictoryChart>
      </View>
    )
}
