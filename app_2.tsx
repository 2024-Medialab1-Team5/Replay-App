import * as React from "react";
import { StyleSheet, View } from 'react-native';
import { Title, Button, Appbar, useTheme } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 80;

export default function App() {
  const { bottom } = useSafeAreaInsets();
  const theme = useTheme();

  return (
      <SafeAreaProvider>
          <View style={styles.container}>
              {/* <Title>Replay app UI</Title> */}
              <Appbar.Header>
                  <Appbar.BackAction onPress={() => {}} />
                  <Appbar.Content title="Lucas van der Vegt (2024-03-11)" subtitle="2024-03-11, 13:45-15:23"/>
                  {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
                  {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
              </Appbar.Header>
              {/* <Appbar
                style={[
                  styles.bottom,
                  {
                    height: BOTTOM_APPBAR_HEIGHT + bottom,
                    backgroundColor: theme.colors.elevation.level2,
                  },
                ]}
                safeAreaInsets={{ bottom }}
              >
                <Appbar.Action icon="archive" onPress={() => {}} />
                <Appbar.Action icon="email" onPress={() => {}} />
                <Appbar.Action icon="label" onPress={() => {}} />
                <Appbar.Action icon="delete" onPress={() => {}} />
              </Appbar> */}
          </View>
      </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    bottom: {
      backgroundColor: 'aquamarine',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
});