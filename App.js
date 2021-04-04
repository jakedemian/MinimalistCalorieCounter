/**
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
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
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import AddItem from './src/components/AddItem';
import ResetDay from './src/components/ResetDay';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [dialog, setDialog] = useState({});
  const [calories, setCalories] = useState(0);

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
    setCalories(Number(calories) + Number(itemCalories));
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
            <Text style={styles.calories}>{calories}</Text>
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
