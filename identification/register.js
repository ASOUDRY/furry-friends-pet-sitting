import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, Modal, Pressable } from 'react-native'
import { createUserWithEmailAndPassword, onAuthStateChanged, } from '@firebase/auth'
import { auth } from '../components/firebase.js'
import {addDoc, collection} from 'firebase/firestore'
import { firestore } from '../components/firebase';
import { Button } from 'react-native-elements'
import { Formik } from 'formik'
import * as Yup from 'yup';
// import { ImageBackground } from 'react-native-web'

const Registration = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation()
  
  const loginSchema = Yup.object().shape({
    email: Yup.string("Give characters").email("Invalid Email").required('Email is required'),
    password: Yup.string().required('Required'),
  });

  const register = async ({name, email, password}) => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials.user.uid)
        const docRef = addDoc(collection(firestore, "users"), {
          name: name,
          id: userCredentials.user.uid,
          email: email,
          password: password
        });   
      })
    
    } catch (error) {
      console.log(error.message)
    }   
    setModalVisible(true)
  }

  return (
    <KeyboardAvoidingView
    behavior="height"
    // keyboardVerticalOffset={Platform.select({ios: 0, android: 500})} 
    // behavior={Platform.OS === "ios" ? "padding" : "height"}
    
    >
 <ImageBackground
 source={require(`../assets/landing_photo.jpg`)}
 style={styles.backImage}
 >
       <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View 
        style={styles.centeredView}
        >
          <View 
          style={styles.modalView}
          >
            <Text
                  style={styles.inputQuestion}
                >
                    Your successfully registered!</Text>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => {
                setModalVisible(!modalVisible)
               navigation.goBack() 
              }}
            >
              <Text style={styles.textStyle}>Back to Login.</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.inputContainer}>
      <Formik
               initialValues={{name: '', email: '', password: '' }}
               validationSchema={loginSchema}
               onSubmit={ 
                      (values, actions) =>  {
                        actions.resetForm();
                        register(values)
                      }
                  }
             >
               {
              ({values, errors, touched, handleChange, handleSubmit, handleBlur}) => (
                 <View>
                     <TextInput
                      placeholder="Name"
                      onChangeText={handleChange('name')}
                      style={styles.input}
                      value={values.name}
                      onBlur={handleBlur('name')}
        />
        <TextInput
          placeholder="Email"
          onChangeText={handleChange('email')}
          style={styles.input}
          value={values.email}
          onBlur={handleBlur('email')}
        />
          {errors.email && touched.email ? (
                          <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>       
                       ) : null }
        <TextInput
        style={styles.input}
        placeholder='Password'
       onChangeText={handleChange('password')}
       onBlur={handleBlur('password')}
       value={values.password}
       secureTextEntry
        />
          {errors.password && touched.password ? (
                          <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>           
                       ) : null }
      <Button onPress={handleSubmit} title="Sign Up" buttonStyle={styles.button} />         
     
                   <View
                   style={styles.line}
                   >
                   <Text>
                   Already Have a account?&nbsp;
                   </Text>
                     <TouchableOpacity
                     onPress={ () => navigation.navigate('Login')} 
                     >
                       <Text
                        style={
                          styles.link
                        }
                       >
                        Log In
                       </Text>
                     </TouchableOpacity>
                     </View>
                 </View>
               )}
       </Formik>
      </View>
 </ImageBackground>
    </KeyboardAvoidingView>
   
  )
}

export default Registration

const styles = StyleSheet.create({

  inputContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#BEC3AACC',
    // width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 25,
    height: 49,
    width: 352,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: 300 ,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6F7643',
    borderRadius: 10,
    marginBottom: 25,
  },
  link: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 1
  },
  line: {
   flexDirection: 'row'
  },
  backImage:{
    height: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: "#BEC3AA",
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
    elevation: 5,
    height: 120
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputQuestion: {
    marginLeft: 10,
    color: 'black',
    fontWeight: 'bold',
},
buttonStyle : {
  height: 30,
  width: 120,
  backgroundColor: '#6F7643',
  borderRadius: 10,
  marginTop: 20
},
textStyle: {
  paddingTop: 5,
  color: "white",
  fontWeight: "bold",
  textAlign: "center"
},
})