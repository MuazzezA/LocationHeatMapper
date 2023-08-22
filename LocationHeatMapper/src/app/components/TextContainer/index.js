import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export const TextContainer = ({text, title}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};
