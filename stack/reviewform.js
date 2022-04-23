import React, {useRef, useState} from 'react';
import {View, ScrollView, StyleSheet, TextInput, Button, TouchableOpacity, Image} from "react-native";
import {Text} from "react-native-elements"
import { Formik, Form, Field } from 'formik';
import { firestore } from '../components/firebase';
import {addDoc, collection} from 'firebase/firestore'
import * as Yup from 'yup';

import {AirbnbRating } from 'react-native-ratings';

const Reviewform = ({navigation, refreshState}) => {

    const [ratingNumber, storeRating] = useState(1);
   

  const ContactSchema = Yup.object().shape({
    // rating: Yup.string()
    // .required('Please rate my Service'),
    name: Yup.string().required('Please put your name'),
    message: Yup.string().required('Please write a revew'),
  });

const sendReview = (values) => {
    const docRef = addDoc(collection(firestore, "review"), {
      data: {
       Rating: ratingNumber,
       Name: values.name,
       Message: values.message,
      },
      Time : Date.now()
       });
     }
        return (
            <ScrollView style={styles.form}>
                <Formik   
     initialValues={{ rating: '', name: '', message: '' }}
     validationSchema={ContactSchema}
     onSubmit={ 
            (values, actions) =>  {
              actions.resetForm();
            //   refreshState()
              sendReview(values);
            }
        }
        style={{  backgroundColor: '#F2F5EE',}}
   >
     {
    ({values, errors, touched, handleChange, handleSubmit, handleBlur}) => (
      
       <View>
       {console.log(touched)}
          <View
          style={{flexDirection: 'row', alignContent: 'center', 
        }}
          >
           
           <TouchableOpacity
                           onPress={() => {
                            navigation.goBack()
                        }}
                     style={{       
                    height: 50,
                    marginLeft: 20,
                    alignItems:'center',
                    justifyContent:'center'
                  }}
                          >
                              <Image
                              style={{  
                                height: 35,
                                width: 25
                            }}
                               source={require('../assets/arrow_left.png')}
                              ></Image>
                          </TouchableOpacity>

          <Text
          style={{ marginLeft: 40}}
          h1 >Write a Review</Text>
          </View>
         
            <View
            style={{marginLeft: 20 }}
            >

            <Text
            style={{fontWeight: 'bold'}}
            >Name</Text>
            <TextInput
            style={styles.input}
            onBlur={handleBlur('name')}
            onChangeText={handleChange('name')}
            value={values.name}
            />
         {errors.name && touched.name ? (
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>          
             ) : null }
             
              <Text
                style={{fontWeight: 'bold'}}
              >Message</Text>
          
            <TextInput
          style={styles.inputMessage}
          onBlur={handleBlur('message')}
          onChangeText={handleChange('message')}
          value={values.message}
          />
{errors.message && touched.message ? (
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.message}</Text>    
             ) : null }
</View>

            <AirbnbRating
               onFinishRating={ (value) =>
                   storeRating(value)
                //   (value) => {handleChange('rating')}
                //    handleChange('rating')
                }
            //    showRating
               count={5}
               defaultRating={1}
            />
        
       <View
       style={{
        alignItems:'center',
        justifyContent:'center',
        marginTop: 50
       }}
       >
       <TouchableOpacity
         style={styles.button}
         onPress={handleSubmit} title="Submit" 
         >
           <Text 
           h4
           style={{textAlign: 'center', alignItems: 'center', 
          //  fontWeight: 700, 
           color: 'white'}}
           >Send</Text>
         </TouchableOpacity>
       </View> 
       </View>
     )}
   </Formik>
            </ScrollView>
        )
}

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#F2F5EE',
        color: '#6F7643',
        height: '100%',
        width: '100%'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: 'white',
    },
    inputMessage: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 10,
      fontSize: 18,
      borderRadius: 6,
      marginTop: 10,
      marginBottom: 20,
      backgroundColor: 'white',
      height: 180,
      textAlignVertical: 'top',
  },
    button: {
   backgroundColor: '#6F7643',
   width: 350,
    height: 33,
    marginBottom: 20,
   borderRadius: 20

    }
})

export default Reviewform