import React, {useEffect, useRef} from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { MaterialIcons } from "@expo/vector-icons";

const Select = ({ label, placeholder, data, value, setValue, error }) => {
  
  return (
    <View style={styles.content}>
      <Text style={[styles.label, error && styles.errorLabel]}>{label}</Text>
      <SelectDropdown
        data={data}
        defaultValue={value}
        buttonStyle={error ? styles.errorTextField : styles.button}
        defaultButtonText={placeholder}
        search={true}
        searchPlaceHolder="Pesquisar responsável"
        searchPlaceHolderColor="#A9A9A9"
        rowStyle={styles.row}
        rowTextStyle={styles.rowTextStyle}
        renderSearchInputLeftIcon={() => (
          <MaterialIcons name="search" size={28} color="black" />
        )}
        dropdownIconPosition="right"
        renderDropdownIcon={() => error && (
          <MaterialIcons name="error" size={24} color="#F03637" />
        )}
        onSelect={(selectedItem, index) => {
          setValue(selectedItem);
        }}
      />
      {error && <Text style={styles.errorHelpText}>{error}*</Text>}
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  content: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    paddingStart: 16,
  },
  button: {
    width: "100%",
    height: 48,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#232323",
    backgroundColor: "transparent",
  },
  row: {
    backgroundColor: "#E9E9E9",
  },
  rowTextStyle: {
    letterSpacing: 1,
  },
  errorLabel: {
    color: "#F03637",
  },
  errorTextField:{
    width: "100%",
    height: 48,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#F03637',
    backgroundColor: "transparent",
  },
  errorHelpText: {
    fontSize: 12,
    paddingStart: 16,
    color: "#F03637",
  },
});
