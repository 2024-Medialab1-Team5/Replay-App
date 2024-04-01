import * as React from "react";
import { StyleSheet, View } from 'react-native';
import { Title, Button, Appbar, FAB, useTheme,  BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import TopBar from "./src/components/TopBar";
import BottomBar from "./src/components/BottomBar";
import PlayBar from "./src/components/PlayBar";
import Model from "./src/components/Model";
const App = () => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TopBar title="Lucas van der Vegt (2024-03-22)"/>
        <Model />
        <PlayBar currentTime="0:50" totalTime="10:00" progress={0.5}/>
        <BottomBar />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    height: '100%',
  },
});

export default App;
