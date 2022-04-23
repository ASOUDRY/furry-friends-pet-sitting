import React, {useRef} from 'react';
import {View, ScrollView, StyleSheet, TextInput, Button, TouchableOpacity, Image} from "react-native";
import {Text} from "react-native-elements"
import { Formik, Form, Field } from 'formik';
import { firestore } from '../components/firebase';
import {addDoc, collection} from 'firebase/firestore'
import * as Yup from 'yup';

const Contact = ({navigation}) => {

  const ContactSchema = Yup.object().shape({
    subject: Yup.string()
    .min(2, 'Too Short!')
    .required('Required'),
    name: Yup.string().required('Required'),
    email: Yup.string("Give characters").email("Invalid Email").required('Email is required'),
    message: Yup.string().required('Required'),
  });

const sendEmail = (values) => {
  console.log("clicked")
   console.log(Date.now())
   const docRef = addDoc(collection(firestore, "contact"), {
     data: {
      Email: values.email,
      Subject: values.subject,
      Name: values.name,
      Message: values.message,
     },
     Time : Date.now()
      });
	}
        return (
            <ScrollView style={styles.form}>
                <Formik   
     initialValues={{ subject: '', name: '', email: '', message: '' }}
     validationSchema={ContactSchema}
     onSubmit={ 
            (values, actions) =>  {
              actions.resetForm();
              sendEmail(values);
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
          // justifyContent: 'center'
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
          style={{ marginLeft: 60}}
          h1 >Contact Me</Text>
          </View>
         
            <View
            style={{marginLeft: 20 }}
            >

            <Text
            style={{fontWeight: 'bold'}}
            >Name</Text>
            <TextInput
            style={styles.input}
            // placeholder='Name'
            onBlur={handleBlur('name')}
            onChangeText={handleChange('name')}
            value={values.name}
            />
         {errors.name && touched.name ? (
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
              
             ) : null }
              <Text
                style={{fontWeight: 'bold'}}
              >Email</Text>
         <TextInput
           style={styles.input}
           onChangeText={handleChange('email')}
          //  placeholder='Email'
           onBlur={handleBlur('email')}
           value={values.email}
         />
         {errors.email && touched.email ? (
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
              
             ) : null }

            <Text
              style={{fontWeight: 'bold'}}
            >Subject</Text>
            <TextInput
            style={styles.input}
            // placeholder='Subject'
            onBlur={handleBlur('subject')}
            onChangeText={handleChange('subject')}
            value={values.subject}
            />
             {errors.subject && touched.subject ? (
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.subject}</Text>
              
             ) : null }

              <Text
                style={{fontWeight: 'bold'}}
              >Message</Text>
          <TextInput
         style={styles.inputMessage}
         
        onChangeText={handleChange('message')}
        onBlur={handleBlur('message')}
        value={values.message}
                      />
            {errors.message && touched.message ? (
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.message}</Text>
              
             ) : null }

            </View>
        
        
       <View
       style={{
        alignItems:'center',
        justifyContent:'center'
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
      height: 180
  },
    button: {
   backgroundColor: '#6F7643',
   width: 350,
    height: 33,
    marginBottom: 20,
   borderRadius: 20

    }
})

export default Contact