from flask import Flask, request, jsonify
import os
from tensorflow.keras.models import load_model
import requests
from PIL import Image
import numpy as np
import base64
from flask_cors import CORS
from tensorflow.keras.preprocessing import image

app = Flask(__name__)
CORS(app)



#  // For Alzheimer Prediction Model
app.config['UPLOAD_FOLDER'] = 'uploads'


# For Parkinson's Prediction Model
app.config['UPLOAD_FOLDER_1'] = 'uploads1'


# // Alzheimer Prediction Model

model_brain_disease = load_model('tensorflow_model.h5')
names_brain_disease = ['Non Demented', 'Mild Dementia', 'Moderate Dementia', 'Very Mild Dementia']
classification_results = {}

# Load the Parkinson's Prediction Model
model_parkinsons = load_model('tensorflow_model1.h5')
parkinson_classification_results = {}



# // Alzheimer Prediction Model


def preprocess_image(image_path, target_size=(128, 128)):
    img = Image.open(image_path)
    img = img.resize(target_size)
    x = np.array(img)
    
    if len(x.shape) == 2:  # Convert to RGB if the image is grayscale
        x = np.stack((x,) * 3, axis=-1)

    return x


def download_and_resize_image(url):
    response = requests.get(url)
    if response.status_code == 200:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], 'downloaded_image.jpg')
        with open(filename, 'wb') as f:
            f.write(response.content)

        # Preprocess and resize the downloaded image
        processed_image = preprocess_image(filename)
        resized_image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'resized_image.jpg')
        Image.fromarray(processed_image).save(resized_image_path)
        
        return resized_image_path
    else:
        return None


# Load the Parkinson's Prediction Model

def preprocess_input_image(image_path):
    img = Image.open(image_path)
    img = img.resize((224, 224))
    x = np.array(img)
    
    if len(x.shape) == 2:
        x = np.stack((x,) * 3, axis=-1)
    
    x = x.reshape(1, 224, 224, 3)
    x = x.astype('float32') / 255.0  # Normalize the image
    
    return x

def download_and_save_parkinson_image(url):
    response = requests.get(url)
    if response.status_code == 200:
        filename = os.path.join(app.config['UPLOAD_FOLDER_1'], 'downloaded1_image.jpg')
        with open(filename, 'wb') as f:
            f.write(response.content)
        
        # Resize the downloaded image and save
        resized_image_path = os.path.join(app.config['UPLOAD_FOLDER_1'], 'resized1_image.jpg')
        img = Image.open(filename)
        img = img.resize((224, 224))
        img.save(resized_image_path)
        
        return resized_image_path  # Return the resized image path
    else:
        return None



    # // Alzheimer Prediction Model

@app.route('/api/download', methods=['POST'])
def get_classification_results():
    data = request.get_json()
    download_url = data.get('downloadURL')

    if not download_url:
        return jsonify({'error': 'Download URL not provided'})

    # Download and resize the image
    resized_image_path = download_and_resize_image(download_url)

    if resized_image_path:
        # Make predictions using the brain disease model
        processed_image = preprocess_image(resized_image_path)
        prediction = model_brain_disease.predict(np.expand_dims(processed_image, axis=0))
        class_index = np.argmax(prediction)
        confidence = float(prediction[0][class_index]) * 100

        # Save classification results to global variable
        global classification_results
        classification_results = {
            'classification': names_brain_disease[class_index],
            'confidence': confidence,
        }

        return jsonify(classification_results)
    else:
        return jsonify({'error': 'Failed to download or resize image'})



        # // Alzheimer Prediction Model
   

@app.route('/api/get_resized_image', methods=['GET'])
def get_resized_image():
    resized_image_path = os.path.join(app.config['UPLOAD_FOLDER'], 'resized_image.jpg')
    if os.path.exists(resized_image_path):
        with open(resized_image_path, "rb") as img_file:
            resized_image_data = base64.b64encode(img_file.read()).decode('utf-8')
            return jsonify({
                'resized_image_data': resized_image_data,
                'classification_results': classification_results
            })
    else:
        return jsonify({'error': 'Resized image not available'})




# Load the Parkinson's Prediction Model


@app.route('/api/download_parkinson', methods=['POST'])
def get_parkinson_classification_results():
    data = request.get_json()
    downloadURL = data.get('downloadURL')

    if not downloadURL:
        return jsonify({'error': 'Download URL not provided'})

    # Download and resize the image
    resized_image_path = download_and_save_parkinson_image(downloadURL)

    if resized_image_path:
        # Preprocess the downloaded image
        processed_image = preprocess_input_image(resized_image_path)

        # Make predictions using the Parkinson's model
        prediction = model_parkinsons.predict(processed_image)
        confidence = float(prediction[0][0]) * 100
        prediction_label = "Parkinson's Disease" if confidence > 50 else 'Healthy'

        # Save classification results to global variable
        global parkinson_classification_results
        parkinson_classification_results = {
            'classification': prediction_label,
            'confidence': confidence,
        }

        return jsonify(parkinson_classification_results)
    else:
        return jsonify({'error': 'Failed to download or resize image'})

@app.route('/api/get_resized_parkinson_image', methods=['GET'])
def get_resized_parkinson_image():
    resized_image_path = os.path.join(app.config['UPLOAD_FOLDER_1'], 'resized1_image.jpg')
    if os.path.exists(resized_image_path):
        with open(resized_image_path, "rb") as img_file:
            resized_image_data = base64.b64encode(img_file.read()).decode('utf-8')
            return jsonify({
                'resized_image_data': resized_image_data,
                'parkinson_classification_results': parkinson_classification_results
            })
    else:
        return jsonify({'error': 'Image not available'})




if __name__ == '__main__':
    app.run(host='10.110.41.71', port=5000, debug=True)
