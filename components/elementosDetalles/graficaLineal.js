// graficaLineal.js
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const GraficaLineal = ({ data }) => {
    return (
        <LineChart
            data={data}
            width={width * 0.9} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: "#fdfdfd",
                backgroundGradientFrom: "#fdfdfd",
                backgroundGradientTo: "#fdfdfd",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(16, 16, 16, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(16, 16, 16, ${opacity})`,
                style: {
                    borderRadius: 10
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "4",
                    stroke: "rgba(183, 86, 86, 0.95)"
                }
            }}
            bezier
            style={styles.chart}
        />
    );
}

const styles = StyleSheet.create({
    chart: {
        marginVertical: 8,
        borderRadius: 16
    }
});

export default GraficaLineal;
