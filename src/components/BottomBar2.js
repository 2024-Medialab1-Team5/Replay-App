import {StyleSheet} from 'react-native';
import React from 'react';
import {Appbar, FAB, useTheme, ProgressBar, MD3Colors} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 80;

const BottomBar = () => {
  const {bottom} = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <Appbar
      style={[
        styles.bottom,
        {
          height: BOTTOM_APPBAR_HEIGHT + bottom,
          backgroundColor: theme.colors.elevation.level2,
        },
      ]}
      safeAreaInsets={{bottom}}>
      <ProgressBar style={styles.progressBar} progress={0.5} color={MD3Colors.primary} />
      {/* <Appbar.Action icon="rewind" onPress={() => {}} />
      <Appbar.Action icon="pause" onPress={() => {}} />
      <Appbar.Action icon="fast-forward" onPress={() => {}} /> */}
      {/* <FAB size="medium" icon="plus" onPress={() => {}} style={[styles.fab]} /> */}
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    
  }
//   fab: {
//     position: 'absolute',
//     right: 16,
//     top: -20,
//     borderRadius: 50,
//     backgroundColor: '#F25165',
//   },
});

export default BottomBar;