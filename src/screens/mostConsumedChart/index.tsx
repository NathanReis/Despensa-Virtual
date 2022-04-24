import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import { VictoryPie, VictoryTheme } from 'victory-native';
import { Loading } from '../../components/loading';
import { SafeZoneScreen } from '../../components/safeZoneScreen';
import { Title } from '../../components/title';
import api from '../../services/api';
import { User } from '../../storage/User';
import { IUserGroupModel } from '../../storage/UserGroup';
import styles from './styles';

enum PeriodEnum {
  MONTH = 'month',
  WEEK = 'week'
}

interface IFilterChartData {
  averageConsumed?: IAverageConsumed[];
  limit?: number;
  period?: PeriodEnum
}

interface IAverageConsumed {
  id: number;
  name: string;
  average: number;
}

export function MostConsumedChart() {
  let [limit, setLimit] = useState<number>(5);
  let [averageConsumedByMonth, setAverageConsumedByMonth] = useState<IAverageConsumed[]>([]);
  let [averageConsumedByWeek, setAverageConsumedByWeek] = useState<IAverageConsumed[]>([]);
  let [averageConsumedToShow, setAverageConsumedToShow] = useState<IAverageConsumed[]>([]);
  let [isLoadingChart, setIsLoadingChart] = useState<boolean>(true);
  let [isLoadingScreen, setIsLoadingScreen] = useState<boolean>(true);
  let [period, setPeriod] = useState<PeriodEnum>(PeriodEnum.MONTH);
  let [selectedIdUserGroup, setSelectedIdUserGroup] = useState<number>();
  let [userGroups, setUserGroups] = useState<IUserGroupModel[]>([]);

  const COLORS = ['#EBA10F', '#9F43CC', '#0CA85D', '#2B87E3', '#F35959'];

  function filterCharData(params: IFilterChartData) {
    let averageConsumedAux: IAverageConsumed[] = [];

    if (params.averageConsumed) {
      averageConsumedAux = params.averageConsumed
    } else {
      averageConsumedAux = (params.period ?? period) === PeriodEnum.MONTH
        ? [...averageConsumedByMonth]
        : [...averageConsumedByWeek];
    }

    averageConsumedAux = averageConsumedAux.filter((_, index) => index < (params.limit ?? limit));

    setAverageConsumedToShow(averageConsumedAux);
  }

  function handleChangeLimit(value: number) {
    setLimit(value);
    filterCharData({ limit: value });
  }

  function handlePressRadio(option: PeriodEnum) {
    setPeriod(option);
    filterCharData({ period: option });
  }

  async function handleSelectUserGroup(idUserGroup: number) {
    setSelectedIdUserGroup(idUserGroup);

    await loadChartData(idUserGroup);
  }

  async function loadData() {
    setIsLoadingScreen(true);

    let user = await User.getLoggedUser();

    setUserGroups(user.userGroupEntities);

    if (user.idDefaultUserGroup) {
      setSelectedIdUserGroup(user.idDefaultUserGroup);

      await loadChartData(user.idDefaultUserGroup);
    }

    setIsLoadingScreen(false);
  }

  async function loadChartData(idUserGroup: number) {
    setIsLoadingChart(true);

    try {
      let monthRequest = api.get<IAverageConsumed[]>(`analytics/user-groups/${idUserGroup}/products/average-consumed-by-month?limit=${limit}`);
      let weekRequest = api.get<IAverageConsumed[]>(`analytics/user-groups/${idUserGroup}/products/average-consumed-by-week?limit=${limit}`);

      let [monthResponse, weekResponse] = await axios.all([monthRequest, weekRequest]);

      setAverageConsumedByMonth(monthResponse.data);
      setAverageConsumedByWeek(weekResponse.data);

      filterCharData({
        averageConsumed: period === PeriodEnum.MONTH
          ? monthResponse.data
          : weekResponse.data
      });
    } catch (error) {
      setAverageConsumedByMonth([]);
      setAverageConsumedByWeek([]);

      filterCharData({ averageConsumed: [] });

      Alert.alert('Erro', 'Não foi possível buscar os dados do gráfico');
    } finally {
      setIsLoadingChart(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (isLoadingScreen) {
    return <Loading />;
  }

  return (
    <SafeZoneScreen isWithoutScroll={true}>
      <Title content='Mais consumidos' />

      <View style={styles({}).periodContainer}>
        <View style={styles({}).radio}>
          <Text onPress={() => handlePressRadio(PeriodEnum.WEEK)}>Semana</Text>
          <RadioButton
            status={period === PeriodEnum.WEEK ? 'checked' : 'unchecked'}
            value={PeriodEnum.WEEK}
            onPress={() => handlePressRadio(PeriodEnum.WEEK)}
          />
        </View>

        <View style={styles({}).radio}>
          <Text onPress={() => handlePressRadio(PeriodEnum.MONTH)}>Mês</Text>
          <RadioButton
            status={period === PeriodEnum.MONTH ? 'checked' : 'unchecked'}
            value={PeriodEnum.MONTH}
            onPress={() => handlePressRadio(PeriodEnum.MONTH)}
          />
        </View>
      </View>

      <View style={styles({}).chartContainer}>
        {
          isLoadingChart
            ? <Loading />
            : <ScrollView>
              <VictoryPie
                colorScale={COLORS}
                data={
                  averageConsumedToShow
                    .map(({ average }) => { return { x: `${average.toFixed(2)} un`, y: average } })
                }
                innerRadius={40}
                height={240}
                origin={{ x: 240 * 0.75, y: 120 }}
                theme={VictoryTheme.material}
              />

              <View style={styles({}).subtitlesContainer}>
                {
                  averageConsumedToShow
                    .map(({ name }, index) => {
                      return (
                        <View key={index} style={styles({}).subtitleItem}>
                          <View style={styles({ subtitleColor: COLORS[index] }).subtitleColor}></View>
                          <Text>{name}</Text>
                        </View>
                      );
                    })
                }
              </View>
            </ScrollView>
        }
      </View>

      <View style={styles({}).pickerBorder}>
        <Picker
          style={styles({}).picker}
          mode='dropdown'
          selectedValue={selectedIdUserGroup}
          onValueChange={handleSelectUserGroup}
        >
          {
            userGroups.map(_userGroup => (
              <Picker.Item
                key={_userGroup.id}
                label={_userGroup.name}
                value={_userGroup.id}
              />
            ))
          }
        </Picker>
      </View>

      <View style={styles({}).sliderContainer}>
        <Text style={styles({}).sliderLabel}>Quantidade</Text>

        <Slider
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={limit}
          onValueChange={handleChangeLimit}
        />

        <Text style={styles({}).sliderLabel}>{limit}</Text>
      </View>
    </SafeZoneScreen>
  );
}
