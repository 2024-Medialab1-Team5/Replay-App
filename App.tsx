import * as React from "react";
import { StyleSheet, View } from 'react-native';
import { Title, Button, Appbar, useTheme,  BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', focusedIcon: 'rewind',},
    { key: 'albums', focusedIcon: 'pause', unfocusedIcon: 'play'},
    { key: 'recents', focusedIcon: 'fast-forward' },
    // { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => { }} />
          <Appbar.Content title="Lucas van der Vegt (2024-03-11)" subtitle="2024-03-11, 13:45-15:23" />
          {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
          {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
        </Appbar.Header>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />

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
  },
  bottom: {
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default App;