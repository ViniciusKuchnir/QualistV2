import React, { useState, useEffect, memo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import api from '../../../services/api';
import Toast from "react-native-toast-message";
import { MaterialIcons } from "@expo/vector-icons";

const Checkbox = ({idItem, children, initValue, navigation }) => {
  const [value, setValue] = useState(initValue);

  async function handleCheck() {
    if(value){
      navigation.navigate('Justification', {
        idItem: idItem,
        confirmation: value
      });
    }else{
      setValue(!value);
      api.put('/setItem', {
        idItem: idItem,
        confirmation: value
      });
    }
  }

  return (
    <View style={styles.content}>
      <TouchableOpacity onPress={() => handleCheck()}>
        {value === true ? (
          <MaterialIcons name="check-box" size={28} color="#299740" />
        ) : (
          <MaterialIcons
            name="check-box-outline-blank"
            size={28}
            color="#232323"
          />
        )}
      </TouchableOpacity>
      <Text style={styles.label}>{children}</Text>
    </View>
  );
};

export default memo(Checkbox);

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  label: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
});
