import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const Select = ({
  label,
  placeholder,
  value,
  setValue,
  items,
  setItems,
  error,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.content}>
      <Text style={[styles.label, error ? styles.errorLabel : null]}>
        {label}
      </Text>
      <DropDownPicker
        style={error ? styles.errorDropDown : styles.dropDown}
        listMode="MODAL"
        translation={{
          PLACEHOLDER: placeholder,
        }}
        searchable={true}
        searchPlaceholder="Pesquisar..."
        stickyHeader={true}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      {error ? <Text style={styles.errorHelpText}>{error}*</Text> : null}
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  content: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    paddingStart: 16,
  },
  dropDown: {
    zIndex: 1000,
  },
  errorLabel: {
    color: "#F03637",
  },
  errorDropDown:{
    zIndex: 1000,
    borderWidth: 2,
    borderColor: "#F03637",
  },
  errorHelpText: {
    fontSize: 12,
    paddingStart: 16,
    color: "#F03637",
  },
});
