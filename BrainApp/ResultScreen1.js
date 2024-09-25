import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ImageBackground } from 'react-native';

const ResultScreen1 = () => {
  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch classification results and resized image data from backend API
  const fetchData = async () => {
    try {
      const response = await fetch('http://10.110.41.71:5000/api/get_resized_image', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setResultData(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ImageBackground
      source={require('./assets/result.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.heading}>Below is the prediction result for Alzheimer disease:</Text>
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : resultData && resultData.resized_image_data ? (
            <>
              <Image
                source={{ uri: `data:image/jpeg;base64,${resultData.resized_image_data}` }}
                style={styles.image}
                resizeMode="contain"
              />
              <View style={styles.container2}>
                <Text>Classification: {resultData.classification_results.classification}</Text>
                <Text>Confidence: {resultData.classification_results.confidence}%</Text>
              </View>
            </>
          ) : (
            <Text>No data available</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={fetchData}>
            <Text style={styles.buttonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // Optional: To add a dark overlay for better readability
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container2: {
   
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    width: 300,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonGap: {
    marginVertical: 10,
  },
});

export default ResultScreen1;
