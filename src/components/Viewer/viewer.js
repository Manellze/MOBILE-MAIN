import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';

const CotacaoDolar = () => {
  const [cotacaoDolar, setCotacaoDolar] = useState(null);
  const [cotacaoEuro, setCotacaoEuro] = useState(null);
  const [cotacaoIene, setCotacaoIene] = useState(null);

  useEffect(() => {
    const getCotacao = async () => {
      try {
        const responseDolar = await axios.get('https://economia.awesomeapi.com.br/json/daily/USD-BRL');
        setCotacaoDolar(responseDolar.data[0].bid);

        const responseEuro = await axios.get('https://economia.awesomeapi.com.br/json/daily/EUR-BRL');
        setCotacaoEuro(responseEuro.data[0].bid);

        const responseIene = await axios.get('https://economia.awesomeapi.com.br/json/daily/JPY-BRL');
        setCotacaoIene(responseIene.data[0].bid);
      } catch (error) {
        console.log('Error fetching currency conversions:', error);
      }
    };

    getCotacao();
  }, []);

  if (!cotacaoDolar || !cotacaoEuro || !cotacaoIene) {
    return null;
  }

  return (
    <View>
      <Text style={styles.texto}>EUA (Dólar)</Text>
      <Text style={styles.cotacao}>R$ {cotacaoDolar}</Text>

      <Text style={styles.texto}>Europa (Euro)</Text>
      <Text style={styles.cotacao}>R$ {cotacaoEuro}</Text>

      <Text style={styles.texto}>Japão (Iene)</Text>
      <Text style={styles.cotacao}>R$ {cotacaoIene}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    color: '#000',
    fontSize: 35,
    margin: 40,
  },
  cotacao: {
    color: '#fff',
    backgroundColor: '#ff5733',
    fontSize: 30,
    display: 'flex',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
  },
});

export default CotacaoDolar;
