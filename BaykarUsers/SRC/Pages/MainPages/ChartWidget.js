import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

const barChartData = {
  labels: ['Yazılım Mühendisi', 'Mimar', 'Doktor', 'Diğer'],
  datasets: [
    {
      data: [30, 15, 25, 20],
    },
  ],
};

const pieChartData = [
  {
    name: 'Yazılım Mühendisi',
    population: 30,
    color: '#FF5733',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Mimar',
    population: 15,
    color: '#C70039',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Doktor',
    population: 25,
    color: '#900C3F',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
  {
    name: 'Diğer',
    population: 20,
    color: '#FFC300',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
];

const ChartWidget = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Programdaki Meslek Dağılımları</Text>
      <View style={styles.chartContainer}>
        <BarChart
          data={barChartData}
          width={400}
          height={200}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={styles.chartStyle}
        />
      </View>

      <View style={styles.chartContainer}>
        <PieChart
          data={pieChartData}
          width={400}
          height={200}
          accessor="population"
          chartConfig={{
            backgroundColor: '#FFFFFF',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={styles.chartStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    marginVertical: 16,
  },
  chartStyle: {
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8A2BE2',
    marginBottom: 20,
  },
});

export default ChartWidget;
