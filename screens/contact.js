import React, {useRef} from 'react';
import {View, StyleSheet, Text, TextInput, Button} from "react-native";
import { Formik } from 'formik';

const Contact = () => {

const sendEmail = (subject, name, email, message, e) => {
   console.log(subject)

    e.preventDefault();

    emailjs.sendForm('gmail', 'template_dgmnbm5', form.current, 'user_GAuav2ceeSb7x5sFSsW54')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
}

        return (
            <View style={styles.form}>
                <Formik
               
     initialValues={{ subject: '', name: '', email: '', message: '' }}
     onSubmit={(values) => sendEmail(values.subject, values.name, values.email, values.message)
        //  values => console.log(values.subject)
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