import { StyleSheet, View, Platform } from 'react-native';
import React from 'react';
import { Appbar, ProgressBar, Text, useTheme, MD3Colors } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 64;

const BottomBar2 = ({ currentTime, totalTime, progress }) => {
  const { bottom } = useSafeAreaInsets();
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
      safeAreaInsets={{ bottom }}
    >
      <View style={styles.contentContainer}>
        <View style={styles.timeTextContainer}>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <ProgressBar style={styles.progressBar} progress={progress} color={MD3Colors.primary} />
        </View>
        <View style={styles.timeTextContainer}>
          <Text style={[styles.timeText, styles.totalTimeText]}>{totalTime}</Text>
        </View>
      </View>
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
  },
  progressBarContainer: {
    flex: 1,
  },
  progressBar: {
    width: '100%',
  },
  timeTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
  totalTimeText: {
    paddingHorizontal: 10,
    marginLeft: 'auto',
  },
});

export default BottomBar2;
