
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const HomeScreen = ({ navigation }) => {


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Multiple Brain Disease Detection </Text>
      <Text style={styles.subtitle}>This is a platfrom where you can upload picture of Brain MRI to predict Alzheimers and Parkinson Disease.</Text>
      
      <View style={styles.infoBox}>
          <Image source={require('./assets/123.png')} style={styles.boxImage} />
          <Text style={styles.boxTitle}>General Information</Text>
          <Text style={styles.boxText}>
            {'\u2022'}&nbsp;&nbsp;Parkinsons and Alzehimers disease can be severe to health.This App is designed to predict these two diseases at very early stages so that users can detect disease at early stages.User just have to upload picture of MRI from their mobile gallery and predict disease.{"\n"}

           
          </Text>
         
        </View>

      <View style={styles.infoBox}>
        <Image source={require('./assets/brain.png')} style={styles.boxImage} />
        <Text style={styles.boxTitle}>Create Alzheimer Disease</Text>
        <Text style={styles.boxText}> A person diagnosed with Parkinson.s disease may face lack of body movements and will be unable to move properly.

</Text>

        <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>Mild Dimentia.</Text>
       </View>
       
       <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>Very Mild Dimented </Text>
       </View>
       
       <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>Non Dimented </Text>
       </View>
       
       <View style={styles.instruction}>
        <MaterialIcons name="info" size={24} color="#007bff" style={styles.infoIcon} />
        <Text style={styles.instructionText}>Moderate Dimented </Text>
       </View>


        <TouchableOpacity
          style={styles.learnMoreButton}
          onPress={() => navigation.navigate('Alzheimer')}
        >
          <Text style={styles.buttonText}>Predict Alzheimer Disease</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoBox}>
        <Image source={require('./assets/brain.png')} style={styles.boxImage} />
        <Text style={styles.boxTitle}>Parkinson,s Disease</Text>
        <Text style={styles.boxText}>
        

</Text>
<TouchableOpacity
          style={styles.learnMoreButton}
          onPress={() => navigation.navigate('Parkinson')}
        >
          <Text style={styles.buttonText}>Predict Parkinson,s Disease</Text>
        </TouchableOpacity>
      </View>
      
    
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 40, // Add padding to the top and bottom to avoid content being cut off
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  boxImage: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 10,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  boxText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  learnMoreButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
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

export default HomeScreen;
