import {StyleSheet} from 'react-native';
import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 63;

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
      <Appbar.Action icon="rewind" onPress={() => {}} size={40} />
      <Appbar.Action icon="pause" onPress={() => {}} size={40} />
      <Appbar.Action icon="fast-forward" onPress={() => {}} size={40} />
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

export default BottomBar;
