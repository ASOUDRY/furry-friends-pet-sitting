import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = props => {
console.log(props)
const datatest = async (locationData) => {
    props.click(locationData)
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