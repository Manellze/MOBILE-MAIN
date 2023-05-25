import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';

const HistoricalDataScreen = () => {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const getHistoricalData = async () => {
      try {
        const response = await axios.get('https://economia.awesomeapi.com.br/json/daily/USD-BRL/30');
        setHistoricalData(response.data);
      } catch (error) {
        console.log('Error fetching historical data:', error);
      }
    };

    getHistoricalData();
  }, []);

  if (historicalData.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Variação</Text>
      {historicalData.map((data) => (
        <View key={data.timestamp} style={styles.dataItem}>
          <Text style={styles.dataText}>{data.timestamp}</Text>
          <Text style={styles.dataText}>R$ {data.bid}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: '#FF5733',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 35,
    marginBottom: 20,
  },
  dataItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  dataText: {
    fontSize: 18,
  },
});

export default HistoricalDataScreen;
