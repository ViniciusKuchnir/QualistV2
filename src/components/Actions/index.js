import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Actions = ({ navigation }) => {
  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Classifications')}>
        <View style={styles.areaButton}>
        <MaterialIcons name="format-list-numbered" size={28} color='#232323' />
        </View>
        <Text style={styles.labelButton}>Classificações</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Checklists')}>
        <View style={styles.areaButton}>
        <MaterialIcons name="fact-check" size={28} color='#232323' />
        </View>
        <Text style={styles.labelButton}>Checklists</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Responsibles')}>
        <View style={styles.areaButton}>
        <MaterialIcons name="people-alt" size={28} color='#232323' />
        </View>
        <Text style={styles.labelButton}>Responsáveis</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Unconformities')}>
        <View style={styles.areaButton}>
        <MaterialIcons name="error" size={28} color='#232323' />
        </View>
        <Text style={styles.labelButton}>Inconformidades</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Settings')}>
        <View style={styles.areaButton}>
        <MaterialIcons name="settings" size={28} color='#232323' />
        </View>
        <Text style={styles.labelButton}>Configurações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Actions;

const styles = StyleSheet.create({
    container:{
        maxHeight: 84,
        marginBottom: 14,
        marginTop: 18,
        paddingEnd: 14,
        paddingStart: 14
    },
    actionButton:{
        alignItems: 'center',
        marginRight: 24
    },
    areaButton:{
        backgroundColor: '#ECF0F1',
        height: 52,
        width: 52,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelButton:{
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
