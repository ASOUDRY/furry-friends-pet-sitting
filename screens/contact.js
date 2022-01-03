import React, {useRef} from 'react';
import {View, StyleSheet, Text, TextInput, Button} from "react-native";
import { Formik } from 'formik';
import { firestore } from '../components/firebase';
import {addDoc, collection} from 'firebase/firestore'

const Contact = () => {

const sendEmail = (values) => {
   console.log(values)
   const docRef = addDoc(collection(firestore, "contact"), {
    Email: values.email,
    Subject: values.subject,
    Name: values.name,
    Message: values.message
      });
    
	}
        return (
            <View style={styles.form}>
                <Formik
               
     initialValues={{ subject: '', name: '', email: '', message: '' }}
     onSubmit={ 
            (values) => sendEmail(values)
        }
   >
     {
    (props) => (
       <View>
            <TextInput
            style={styles.input}
            placeholder='Subject'
            onChangeText={props.handleChange('subject')}
            value={props.values.subject}
            />
            <TextInput
            style={styles.input}
            placeholder='Name'
            onChangeText={props.handleChange('name')}
            value={props.values.name}
            />
         <TextInput
           style={styles.input}
           onChangeText={props.handleChange('email')}
           placeholder='Email'
           value={props.values.email}
         />
          <TextInput
         style={styles.input}
         placeholder='Message'
        onChangeText={props.handleChange('message')}
        value={props.values.message}
                            />
         <Button style={styles.button} onPress={props.handleSubmit} title="Submit" />
       </View>
     )}
   </Formik>
            </View>
        )
}

const styles = StyleSheet.create({
    form: {
        flexDirection: 'column'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    button: {
        borderWidth: 1,
        borderColor: 'black',
        color: "red"
    }
})

export default Contact