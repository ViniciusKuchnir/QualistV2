import React, { useState, useEffect, memo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import api from '../../../services/api';
import { MaterialIcons } from "@expo/vector-icons";

const Checkbox = ({idItem, children, initValue }) => {
  const [value, setValue] = useState(initValue);

  function handleCheck() {
    setValue(!value);
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
