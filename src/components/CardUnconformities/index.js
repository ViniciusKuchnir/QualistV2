import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const CardUnconformities = ({description, responsible, sector, date}) => {
  
    function handleDate(date){
        if(date !== null){
            return date.split('-').reverse().join('/');
        }else{
            return null;
        }
    }
  
    return (
    <TouchableOpacity style={styles.content}>
        <Text style={styles.title}>{description}</Text>
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
  }

});
