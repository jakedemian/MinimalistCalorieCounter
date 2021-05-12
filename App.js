/**
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef} from 'react';
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
  Modal,
  TextInput,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AddItem from './src/components/AddItem';
import ResetDay from './src/components/ResetDay';

const App: () => Node = () => {
  const inputRef = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';
  const [calories, setCalories] = useState(null);
  const [dabVisible, setDabVisible] = useState(false);
  const [addItemModalVisible, setAddItemModalVisible] = useState(false);
  const [resetModalVisible, setResetModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
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
    setInputValue('');
    setAddItemModalVisible(false);
  };

  const handleAddItem = () => {
    const itemCalories = inputValue;
    if (isNaN(itemCalories)) {
      return;
    }

    setInputValue('');
    setAddItemModalVisible(false);
    const newCals = Number(calories) + Number(itemCalories);
    setCalories(newCals);
    storeData(newCals);

    // DAB !!!! \o>
    setDabVisible(true);
    setTimeout(() => {
      setDabVisible(false);
    }, 2000);
  };

  const handleResetDay = () => {
    setResetModalVisible(false);
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
          {/* ---------------- BEGIN ADD ITEM MODAL ---------------- */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={addItemModalVisible}
            onShow={() => inputRef.current.focus()}>
            <View style={styles.modal}>
              <Text style={{fontSize: 30, textAlign: 'center'}}>Add Item</Text>
              <TextInput
                ref={inputRef}
                textAlign="center"
                style={styles.addItemInput}
                keyboardType="numeric"
                placeholder="enter calories"
                onChangeText={newVal => {
                  setInputValue(newVal);
                }}
                onSubmitEditing={handleAddItem}
                value={inputValue}
              />
              <View style={styles.modalButtons}>
                <View style={styles.modalButton}>
                  <Button
                    onPress={handleAddItemCancel}
                    color="#f06767"
                    title="Cancel"
                  />
                </View>
                <View style={styles.modalButton}>
                  <Button
                    onPress={handleAddItem}
                    title="Add"
                    disabled={!inputValue}
                  />
                </View>
              </View>
            </View>
          </Modal>
          {/* ---------------- END ADD ITEM MODAL ---------------- */}

          {/* ---------------- BEGIN RESET DAY MODAL ---------------- */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={resetModalVisible}>
            <View style={styles.modal}>
              <Text style={{fontSize: 30, textAlign: 'center'}}>
                Reset Day?
              </Text>

              <Text>{inputValue}</Text>
              <View style={styles.modalButtons}>
                <View style={styles.modalButton}>
                  <Button
                    onPress={() => setResetModalVisible(false)}
                    color="#f06767"
                    title="Cancel"
                  />
                </View>
                <View style={styles.modalButton}>
                  <Button onPress={handleResetDay} title="Reset" />
                </View>
              </View>
            </View>
          </Modal>
          {/* ---------------- END RESET DAY MODAL ---------------- */}

          <View>
            <Text style={styles.calories}>{calories || 0}</Text>
            <Text style={{textAlign: 'center'}}>calories today</Text>
          </View>

          <View style={styles.spacer}></View>

          <View style={{width: 200}}>
            <Button
              onPress={() => setAddItemModalVisible(true)}
              title="Add Item"
            />
          </View>

          <View style={styles.resetDay}>
            <Button
              onPress={() => setResetModalVisible(true)}
              title="Reset Day"
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
    fontSize: 105,
    marginBottom: 0,
    textAlign: 'center',
  },
  resetDay: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 150,
  },
  modal: {
    flex: 1,
    width: '100%',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalButton: {
    width: 100,
    marginRight: 16,
  },
  addItemInput: {
    fontSize: 24,
  },
  spacer: {
    marginTop: 64,
  },
});

export default App;
