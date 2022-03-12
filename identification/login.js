import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform} from 'react-native'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@firebase/auth'
import { auth } from '../components/firebase.js'
import { firestore } from '../components/firebase';
import {getDocs, collection} from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {

  console.log(auth)
  useEffect(() => {
    storeData(auth.currentUser.uid)
}, [])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstReview, setfirstReview] = useState('')

  const navigation = useNavigation()
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [user, setUser] = useState('')

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })


  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, registerEmail, registerPassword)
      navigation.navigate('Stack', {screen: 'Home', params: {inReview: firstReview}})
    } catch (error) {
      console.log(error.message)
    } 
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
    } catch (e) {
      // saving error
    }
  }


  const signout = async () => {
    await signOut(auth)
    console.log(user)
  }

  return (
    <KeyboardAvoidingView
    behavior="height"
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          onChangeText={text => setRegisterEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={text => setRegisterPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={login}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Registration')
          }}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Don't have a account yet?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
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
})