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
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Dialog from 'react-native-dialog';

import AddItem from './src/components/AddItem';

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

  const handleAddItemCancel = () => {
    setDialog({
      ...dialog,
      addItem: false
    })
  };
  const handleAddItem = () => {
    setDialog({
      ...dialog,
      addItem: false
    })
  };

  const handleResetDayCancel = () => {
    setDialog({
      ...dialog,
      resetDay: false
    })
  };
  const handleResetDay = () => {
    setDialog({
      ...dialog,
      resetDay: false
    })
  };




  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>          
          <View style={styles.container}>
            <Text>1750</Text>
            <Button title="Add Item" onPress={() => {
              setDialog({
                ...dialog,
                addItem: true
              })
            }} />
            <Button title="Reset Day" onPress={() => {
              setDialog({
                ...dialog,
                resetDay: true
              })
            }} />


            {/*Add Food Dialog*/}
            <AddItem 
              visible={dialog.addItem} 
              cancel={handleAddItemCancel}
              confirm={handleAddItem}
            />

            {/*Reset Day Dialog*/}
            <Dialog.Container visible={dialog.resetDay}>
              <Dialog.Title>Reset?</Dialog.Title>
              <Dialog.Description>
                Do you want to reset the counter?
              </Dialog.Description>
              <Dialog.Button label="Cancel" onPress={handleResetDayCancel} />
              <Dialog.Button label="Yes, Reset" onPress={handleResetDay} />
            </Dialog.Container>
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});

export default App;
