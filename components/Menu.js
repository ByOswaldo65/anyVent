import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333',
    padding: 10,
  },
  menuItem: {
    padding: 10,
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
  },
});

<View style={styles.container}>
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuText}>Home</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuText}>Profile</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.menuItem}>
    <Text style={styles.menuText}>Settings</Text>
  </TouchableOpacity>
</View>

