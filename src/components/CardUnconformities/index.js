import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const CardUnconformities = ({description, responsible, sector, date, checklistId, navigation}) => {
  
    function handleDate(date){
        if(date !== null){
            return date.split('-').reverse().join('/');
        }else{
            return null;
        }
    }
  
    return (
    <TouchableOpacity style={styles.content} activeOpacity={0.7} onPress={() => navigation.navigate('Items', {
      idChecklist: checklistId
    })} >
          <View style={styles.head}>
            <Text style={styles.title}>{description}</Text> 
            <MaterialIcons name="arrow-forward" size={24} color="#F03637" /> 
          </View>
          <Text style={styles.description}><Text style={styles.strong}>{responsible}</Text> do setor <Text style={styles.strong}>{sector}</Text> tem até o dia <Text style={styles.strong}>{handleDate(date)}</Text> para resolver esta não conformidade.</Text>
    </TouchableOpacity>
  );
};

export default CardUnconformities;

const styles = StyleSheet.create({
  content: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#F03637",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  head:{
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title:{
    fontSize: 14,
    fontWeight: "bold",
    color: '#232323',
  },
  description: {
    marginTop: 4
  },
  strong:{
    fontWeight: "bold",
    color: "#F03637"
  },

});
