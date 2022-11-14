import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import api from "../../services/api";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import Checkbox from "../../components/Inputs/Checkbox";
import CardData from "../../components/CardData";

const Items = ({ route, navigation }) => {
  const { idChecklist } = route.params;
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [unconformities, setUnconformities] = useState(null);
  const [load, setLoad] = useState(false);

  function getItems(idChecklist) {
    api
      .get(`/items/${idChecklist}`)
      .then((response) => {
        setTotalItems(response.data.count);
        setItems(response.data.items);
      })
      .catch((err) => console.log(err.message));
  }

  function getUnconformities(idChecklist) {
    api
      .get(`/Unconformities/${idChecklist}`)
      .then((response) => {
        setUnconformities(response.data.count);
      })
      .catch((err) => console.log(err));
  }

  function calculateAdherence() {
    if (totalItems > 1) {
      let percentage = ((totalItems - unconformities) / totalItems) * 100;
      return Math.round(percentage);
    } else {
      return 0;
    }
  }

  useEffect(() => {
    setLoad(true);
    getItems(idChecklist);
    getUnconformities(idChecklist);
    setLoad(false);
  }, []);

  return (
    <Layout navigation={navigation}>
      <Title
        title="Items"
        subtitle="Veja aqui os itens do checklist selecionado"
      />
          <View style={styles.cards}>
            <CardData
              label="Não conformidades"
              data={`${unconformities}/${totalItems}`}
              load={load}
            />
            <CardData 
              label="Aderência" 
              data={`${calculateAdherence()}%`}
              load={load}
            />
          </View>
          <Text style={styles.title}>Checklist</Text>
          <FlatList
            data={items}
            renderItem={({ item, index }) => (
              <Checkbox idItem={item.id} initValue={item.confirmado} navigation={navigation}>
                {item.descricao}
              </Checkbox>
            )}
            keyExtractor={(item) => item.id}
          />
      
    </Layout>
  );
};

export default Items;

const styles = StyleSheet.create({
  cards: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    height: 80,
    backgroundColor: "#299740",
  },
  titleChecklist: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#A9A9A9",
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    textAlign: "center",
    color: '#232323',
    marginBottom:16
  }
});
