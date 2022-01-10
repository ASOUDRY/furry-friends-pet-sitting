import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput, Button, Modal} from "react-native";
import { Formik } from 'formik';
import { firestore } from './firebase';
import {addDoc, collection} from 'firebase/firestore'

const Reviewform = () => {
    const [modalOne, setModalOneVisible] = useState(false);

const sendReview = (values) => {
   const docRef = addDoc(collection(firestore, "card"), {
     data: {
      Title: values.title,
      Message: values.message,
     },
     Time : Date.now()
      });
    }

    return (
        <View>

<Modal
         animationType="fade"
          transparent={true}
                    visible={modalOne}
                    onRequestClose={() => {
                      setModalOneVisible(!modalOne);
                    }}
                  >
<View
 style={styles.centeredView}
>
<Formik
               
               initialValues={{ title: '', message: '' }}
               onSubmit={ 
                      (values, actions) =>  {
                        setModalOneVisible(!modalOne)
                          console.log("clicked")
                        actions.resetForm();
                        sendReview(values);
                      }
                  }
             >
               {
              (props) => (
                 <View
                 style={styles.modalView}
                 >
                      <TextInput
                      style={styles.input}
                      placeholder='Title'
                      onChangeText={props.handleChange('title')}
                      value={props.values.title}
                      />
                      <TextInput
                      style={styles.input2}
                      placeholder='Message'
                      onChangeText={props.handleChange('message')}
                      value={props.values.message}
                      />
                   <Button style={styles.button} onPress={props.handleSubmit} title="Submit" />
                 </View>
               )}
             </Formik>
</View>
               
   </Modal> 

   <Button 
     onPress={() => {setModalOneVisible(true)}}
   title={'Send a review'} />
        </View>
    )
}
   

    
const styles = StyleSheet.create({
    form: {
        flexDirection: 'column'
    },
    input: {
        height: 50,
        width: 300,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
    input2: {
        height: 150,
        width: 300,
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
          height: 300,
          width: 300,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
})

export { Reviewform }