import {StyleSheet} from 'react-native';
import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const PlayControls = ({onPause, onForward, onBackward, paused}) => {
  const {bottom} = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Appbar
      style={[
        styles.bottom,
        {
          height: 64 + bottom,
          backgroundColor: theme.colors.elevation.level2,
        },
      ]}
      safeAreaInsets={{bottom}}>
      <Appbar.Action icon="rewind" onPress={() => {onBackward()}} size={40} />
      <Appbar.Action icon={paused ? "play" : "pause"} onPress={() => {onPause()}} size={40} />
      <Appbar.Action icon="fast-forward" onPress={() => {onForward()}} size={40} />
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayControls;
