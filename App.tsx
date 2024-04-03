import * as React from "react";
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TopBar from "./src/components/TopBar";
import PlayControls from "./src/components/PlayControls";
import VideoProgress from "./src/components/VideoProgress";
import ModelViewer from "./src/components/ModelViewer";

const App = () => {
  const [totalTime, setTotalTime] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [paused, setPaused] = React.useState(true);
  const [offset, setOffset] = React.useState(0);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <TopBar title="Lucas van der Vegt (2024-03-22)" />
        <ModelViewer onClipLoaded={(clipDuration) => { setTotalTime(clipDuration); }} onTimeUpdated={(newTime) => { setCurrentTime(newTime); }} paused={paused} offset={offset} setOffset={setOffset} />
        <VideoProgress currentTime={currentTime.toFixed(2)} totalTime={totalTime.toFixed(2)} progress={currentTime / (totalTime + 0.0001)} />
        <PlayControls onPause={() => { setPaused(!paused) }} onForward={() => { setOffset(1) }} onBackward={() => { setOffset(-1) }} paused={paused} />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
});

export default App;
