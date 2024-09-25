import React, { useState, useEffect } from "react"
import {useNavigation} from '@react-navigation/native'
import {View, StyleSheet,Image,Text,TouchableOpacity, SafeAreaView, Alert,} from "react-native"
import * as ImagePicker from "expo-image-picker"
import axios from "axios"

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
const Parkinson = () => {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [downloadURL, setDownloadURL] = useState("")
  const [sendButtonDisabled, setSendButtonDisabled] = useState(true)
  const navigation = useNavigation();
  const goToResult = () => {
    navigation.navigate('ParkinsonResult');
  };
  useEffect(() => {
    // Check if downloadURL is not empty to enable Send Link button
    if (downloadURL !== "") {
      setSendButtonDisabled(false)
    } else {
      setSendButtonDisabled(true)
    }
  }, [downloadURL])

  const storage = getStorage()

  const uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = function () {
        // return the blob
        resolve(xhr.response)
      }
      xhr.onerror = function () {
        reject(new Error("uriToBlob failed"))
      }
      xhr.responseType = "blob"
      xhr.open("GET", uri, true)

      xhr.send(null)
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    const source = { uri: result.assets[0].uri }
    console.log(source)
    setImage(source)
  }

  const uploadImage = async () => {
    setUploading(true)

    const blob = await uriToBlob(image?.uri)
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1)

    const storageRef = ref(storage, "images/" + filename)
    const snapshot = await uploadBytes(storageRef, blob)

    const downloadURL = await getDownloadURL(snapshot.ref)

    console.log(downloadURL)
    Alert.alert("Photo uploaded!!")

    setUploading(false)
    setImage(null)

    axios.post("http://10.110.41.71:5000/api/download_parkinson", { downloadURL })
    .then((response) => {
      console.log(response.data)
      Alert.alert("Photo uploaded!!")
    })
    .catch((error) => {
      console.error(error)
      Alert.alert("Upload failed!")
    })
    .finally(() => {
      setUploading(false)
      setImage(null)
    })

  }

  const handleSendLink = () => {
    // Send downloadURL to backend when Send Link button is pressed
    uploadImage()
  }

  return (
    <SafeAreaView style={styles.container}>
       <Image source={require('./assets/media1.png')} style={styles.icon} />
    <TouchableOpacity style={styles.button} onPress={pickImage}>
      <Text style={styles.buttonText}>Pick an Image</Text>
    </TouchableOpacity>
    <View style={styles.imageContainer}>
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.sendButton, { opacity: sendButtonDisabled ? 0.5 : 1 }]}
        onPress={handleSendLink}
        disabled={sendButtonDisabled}
      >
        <Text style={[styles.buttonText, styles.sendButtonText]}>Send Link</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToResult}>
        <Text style={styles.buttonText}>Go to Result</Text>
      </TouchableOpacity>

    </View>

  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#28a745',
  },
  sendButtonText: {
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain', // This ensures the image scales properly
    marginBottom: 20, // Adjust as needed for spacing
  },
})
export default Parkinson
