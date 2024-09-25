// Instructions.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you're using Expo for icons

const Instructions = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="menu-book" size={60} color="#007bff" style={styles.icon} />
      <Text style={styles.heading}>Follow these instructions:</Text>
      <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>Step 1: You can predict Alzheimer or Parkinsons disease by using sidebar or Home screen and clicking on "Predict Alzheimer" or "Predict Parkinson" button.</Text>
      </View>
      <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>Step 2: Select brain MRI image from your mobile gallery by clicking on "Pick An Image" button.</Text>
      </View>
      <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>Step 3: Then click on "Upload Image" button and wait for results. It may take a momoment!</Text>
      </View>
      <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>Step 4: Once image is uploaded successfully click on "GO To Results" button to see prediction results.</Text>
      </View>
     
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 580,
    marginTop: 50,
    backgroundColor: 'rgb(248, 251, 251  )', 
    alignSelf:'center',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 10,
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  instruction: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the start
    marginBottom: 10,
  },
  infoIcon: {
    marginRight: 10,
    marginTop: 3, // Adjusted margin top
  },
  instructionText: {
    flex: 1, // Allow text to wrap
    fontSize: 16,
    color: '#555',
  },
});

export default Instructions;
