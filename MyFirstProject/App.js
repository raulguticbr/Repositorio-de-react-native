// In App.js in a new project

import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator } from "react-navigation";
const Tab = createBottomTabNavigator();


function ListadoScreen({navigation}) {
  const users = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      nombre: 'Raul Gutierrez España',
      edad:'19',
      sexo:'varon',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      nombre: 'Maria Paez Gomez',
      edad:'56',
      sexo:'hembra',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      nombre: 'Gonzalo Vernini Silva',
      edad:'23',
      sexo:'varon',
    },
  ]
  

  const Item = ({item, renderItem }) => (
    <View style={styles.item}>
      <TouchableOpacity
          style={styles.title}
          onPress={() =>
            navigation.navigate('Detalles',{item:item})
          }
        >
          <Text>{item.nombre}</Text>
        </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item nombre={item.nombre}  item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView> 
  );

}//ListadoScreen

function InformacionScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Esta APP te permite conocer en más profundidad las personas!</Text>
    </View>
  );
}//informacionScreen
function DetallesScreen({route}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>nombre:{route.params.item.nombre} </Text>
      <Text>edad: {route.params.item.edad}</Text>
      <Text>sexo: {route.params.item.sexo}</Text>
    </View>
    
  );
}//DetallesScreen
const Stack=createNativeStackNavigator();
function ListadoStack(){
  return(

      <Stack.Navigator initialRouteName="Listado">
        <Stack.Screen name="Listado" component={ListadoScreen} />
        <Stack.Screen name="Detalles" component={DetallesScreen}/>
      </Stack.Navigator>
  );
}//LISTADO STACK
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="ListadoScreen"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'ListadoTab') {
              iconName = focused
                ? 'ios-list-box'
                : 'ios-list';
            } else if (route.name === 'Informacion') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            }

            return <Ionicons name={iconName} size={40} color={'red'} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="ListadoTab" component={ListadoStack} />
        <Tab.Screen name="Informacion" component={InformacionScreen} />
      </Tab.Navigator>
      
      
    </NavigationContainer>
    
  );
  
}//app

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});