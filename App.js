/**
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AddItem from './src/components/AddItem';
import ResetDay from './src/components/ResetDay';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [dialog, setDialog] = useState({});
  const [calories, setCalories] = useState(null);
  const [dabVisible, setDabVisible] = useState(false);

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@Caloreee_calories', String(value));
    } catch (e) {}
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@Caloreee_calories');

      if (calories === null) {
        setCalories(jsonValue != null ? JSON.parse(jsonValue) : 0);
      }
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  });

  const handleAddItemCancel = () => {
    setDialog({
      ...dialog,
      addItem: false,
    });
  };
  const handleAddItem = itemCalories => {
    setDialog({
      ...dialog,
      addItem: false,
    });
    const newCals = Number(calories) + Number(itemCalories);
    console.log(newCals);
    setCalories(newCals);
    storeData(newCals);
    setDabVisible(true);
    setTimeout(() => {
      setDabVisible(false);
    }, 2000);
  };

  const handleResetDayCancel = () => {
    setDialog({
      ...dialog,
      resetDay: false,
    });
  };
  const handleResetDay = () => {
    setDialog({
      ...dialog,
      resetDay: false,
    });
    setCalories(0);
    storeData(0);
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentContainerStyle={backgroundStyle}>
        <View style={styles.container}>
          <View>
            <Text style={styles.calories}>{calories || 0}</Text>
          </View>
          <Button
            title="Add Item"
            onPress={() => {
              setDialog({
                ...dialog,
                addItem: true,
              });
            }}
          />
          <View style={styles.resetDay}>
            <Button
              title="Reset Day"
              onPress={() => {
                setDialog({
                  ...dialog,
                  resetDay: true,
                });
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              top: 16,
              opacity: dabVisible ? 1 : 0,
            }}>
            <Image source={require('./src/assets/fugma_ass.png')} />
          </View>

          {/*Add Food Dialog*/}
          <AddItem
            visible={dialog.addItem}
            cancel={handleAddItemCancel}
            confirm={handleAddItem}
          />

          {/*Reset Day Dialog*/}
          <ResetDay
            visible={dialog.resetDay}
            cancel={handleResetDayCancel}
            confirm={handleResetDay}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calories: {
    fontSize: 85,
    marginBottom: 64,
  },
  resetDay: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default App;
