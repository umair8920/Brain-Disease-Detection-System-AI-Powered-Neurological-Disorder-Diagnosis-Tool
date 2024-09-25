import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/serlogo.png')} style={styles.icon} />
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.description}>
        Welcome to our app! We are dedicated to providing a platform that connects Service providers across the area with the clients that are in need of work.
      </Text>
      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>Contact Us:</Text>
        <View style={styles.contactDetailContainer}>
          <Ionicons name="mail-outline" size={24} color="#555" />
          <Text style={styles.contactDetail}>sadaqatalii731@gmail.com</Text>
        </View>
        <View style={styles.contactDetailContainer}>
          <Ionicons name="call-outline" size={24} color="#555" />
          <Text style={styles.contactDetail}>+92 3413728184</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  contactContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactDetail: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AboutScreen;
