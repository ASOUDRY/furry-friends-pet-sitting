import React, { useState, useEffect, useContext } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform} from 'react-native'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@firebase/auth'
import { auth } from '../components/firebase.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../App.js'


const Login = ({navigation}) => {
  console.log("useContext is" + useContext)
  const {signIn} = useContext(UserContext)

  const attempt = async () => {
    if (auth.currentUser) {
      // console.log("This is the uid " + auth.currentUser.uid)
      await AsyncStorage.setItem('@storage_Key', auth.currentUser.uid)
    }
    else {
      // console.log("You are not logged in")
    }
  }

  useEffect(() => {
    let isMounted = true;
    // console.log("load")
    if (isMounted) {
      attempt()
    }
    return () => {
      // console.log("Login clean-up")
      isMounted = false;
    } ;
},)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstReview, setfirstReview] = useState('')

  // const navigation = useNavigation()
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [user, setUser] = useState('')
  const [toggle, setToggle] = useState(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, registerEmail, registerPassword)
      setToggle(!toggle)
      signIn()
      // navigation.navigate('screens', {screen: 'Stack', })
      navigation.navigate('Stack', {screen: 'Home', params: {inReview: firstReview}})
    } catch (error) {
      console.log(error.message)
    } 
  }

  return (
    <KeyboardAvoidingView
    behavior="height"
      style={styles.container}
      // behavior="padding"
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

        {/* <TouchableOpacity
          onPress={() => {signIn()}}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Test</Text>
        </TouchableOpacity> */}

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