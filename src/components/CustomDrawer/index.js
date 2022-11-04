import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

const CustomDrawer = (props) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);


  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const dataUser = JSON.parse(user);
      if(user !== null) {
        setUser(dataUser.nome);
        setEmail(dataUser.email);
      }
    } catch(e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.content}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainer}
      >
        <TouchableOpacity
          style={styles.iconClose}
          onPress={() => props.navigation.closeDrawer()}
        >
          <MaterialIcons name="close" size={28} color="#299740" />
        </TouchableOpacity>
        <View style={styles.head}>
          <Text style={styles.nameCompany}>{user}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <View style={styles.drawerList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Login")}
          style={styles.footerButton}
        >
          <MaterialIcons name="exit-to-app" size={28} color="black" />
          <Text style={styles.footerButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 64,
  },
  head: {
    height: 80,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    paddingEnd: 16,
    paddingStart: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#299740",
  },
  iconClose: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingEnd: 16,
  },
  nameCompany: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#299740",
  },
  email: {
    color: "#A9A9A9",
  },
  drawerList: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 16,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#D9D9D9",
  },
  footerButton: {
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  footerButtonText: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: "600",
  },
});
