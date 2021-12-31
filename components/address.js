import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { firestore } from './firebase';
import {addDoc, collection} from 'firebase/firestore'

const GooglePlacesInput = props => {
console.log(props)
const datatest = async (locationData) => {
  try {
    const docRef = addDoc(collection(firestore, "test"), {
      location: locationData,
    });
    props.click(locationData)
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

  return (
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null, props) => {
        // 'details' is provided when fetchDetails = true
     datatest(data.description)
      }}
      query={{
        key: 'AIzaSyBgnnuLSZlkBrBe-MOKTVlWGw15biHlnuc',
        language: 'en',
      }}
      suppressDefaultStyles={true}
      styles={{
        container: {
          height: 44
        }
      }}
    />
  );
};

export { GooglePlacesInput };
// export default  GooglePlacesInput ;