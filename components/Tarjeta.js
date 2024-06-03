import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Tarjeta = () => {
  const ratio = 1.5; // Example ratio
  const HeroImg = require('../assets/img/eberhard-grossgasteiger-Gx_HfG-4eQo-unsplash.jpg'); // Replace with your actual image path

  return (
    <View style={styles.container}>
      <View style={styles.aspectRatio}>
        <Image source={HeroImg} style={styles.image} />
      </View>
      <Text style={styles.newsText}>NEWS</Text>
      <View style={styles.stack}>
        <Text style={styles.dateText}>May 26, 2024</Text>
        <Text style={styles.heading}>The Garden City</Text>
        <Text numberOfLines={4} ellipsizeMode="tail" style={styles.description}>
          Bengaluru (also called Bangalore) is the center of India's high-tech industry. It is located in southern India on the Deccan Plateau.The city is also known for its parks and nightlife. Bangalore is the major center of India's IT industry, popularly known as the Silicon Valley of India.
        </Text>
      </View>
      <View style={styles.hStack}>
        <Text style={styles.moreIcon}>⟩</Text>
        <Text style={styles.findOutMoreText}>Find out more</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 10,
    width: width * 0.8,
    backgroundColor: '#EDEDED', // Light mode background color
    margin: 10,
  },
  aspectRatio: {
    width: '100%',
    aspectRatio: 1.5, // Replace with your ratio
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  newsText: {
    position: 'absolute',
    color: '#EDEDED',
    top: 10,
    left: 10,
    fontWeight: 'bold',
  },
  stack: {
    padding: 16,
  },
  dateText: {
    color: '#A0A0A0',
  },
  heading: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 8,
  },
  description: {
    color: '#4A4A4A',
  },
  hStack: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  moreIcon: {
    color: '#2F855A',
    marginRight: 8,
  },
  findOutMoreText: {
    color: '#2F855A',
  },
});

export default Tarjeta;
