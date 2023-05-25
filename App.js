import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import axios from 'axios';

const Viewer = ({ title, type }) => {
  const [cotacao, setCotacao] = useState(null);

  useEffect(() => {
    const getCotacao = async () => {
      try {
        const response = await axios.get(`https://economia.awesomeapi.com.br/json/daily/${type}`);
        setCotacao(response.data[0].bid);
      } catch (error) {
        console.log(`Error fetching currency conversion for ${type}:`, error);
      }
    };

    getCotacao();
  }, [type]);

  if (!cotacao) {
    return null;
  }

  return (
    <View>
      <Text style={styles.texto}>{title}</Text>
      <Text style={styles.cotacao}>R$ {cotacao}</Text>
    </View>
  );
};

const CotacaoDolar = () => {
  return <Viewer title="EUA (Dólar)" type="USD-BRL" />;
};

const CotacaoEuro = () => {
  return <Viewer title="Europa (Euro)" type="EUR-BRL" />;
};

const CotacaoIene = () => {
  return <Viewer title="Japão (Iene)" type="JPY-BRL" />;
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>ADolarS</Text>
      <Text style={styles.texto}>Valor do Real em outros Lugares:</Text>
      <CotacaoDolar />
      <CotacaoEuro />
      <CotacaoIene />
    </View>
  );
}

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
  },
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
