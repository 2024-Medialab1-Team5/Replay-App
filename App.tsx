import * as React from "react";
import { StyleSheet, View } from 'react-native';
import { Title, Button, Appbar, FAB, useTheme, BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import TopBar from "./src/components/TopBar";
import BottomBar from "./src/components/BottomBar";
import PlayBar from "./src/components/PlayBar";
import Model from "./src/components/Model";

const timeToString = (time: number) => time.toFixed(0);

const App = () => {
  const [totalTime, setTotalTime] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TopBar title="Lucas van der Vegt (2024-03-22)" />
        <Model onClipLoaded={(clipDuration) => { setTotalTime(clipDuration); }} onTimeUpdated={(newTime) => { setCurrentTime(newTime); }} paused={paused} />
        <PlayBar currentTime={timeToString(currentTime)} totalTime={timeToString(totalTime)} progress={currentTime / (totalTime + 0.0001)} />
        <BottomBar onPause={() => { setPaused(!paused) }} />
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
