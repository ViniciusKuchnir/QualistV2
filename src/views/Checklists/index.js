import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import Layout from "../../components/Layout";
import Title from "../../components/Title";
import CardChecklist from '../../components/CardChecklist';

const Checklists = ({ navigation }) => {
  
  const data = ['Medição e análise', 'Engenahria de Requisitos'];
  
  return (
    <Layout navigation={navigation}>
      <Title
        title="Checklists"
        subtitle="Veja a lista de todos os seus checklists"
      />
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <CardChecklist key={index} title={item} />
        )}
        keyExtractor={item => item.id}
      />
    </Layout>
  );
};

export default Checklists;

const styles = StyleSheet.create({});
