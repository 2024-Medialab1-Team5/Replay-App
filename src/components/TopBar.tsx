import React from 'react';
import {Appbar} from 'react-native-paper';

const TopBar = props => {
  return (
    <Appbar.Header style={{backgroundColor: '#FFF'}}>
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title={props.title} />
    </Appbar.Header>
  );
};

export default TopBar;