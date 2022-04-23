import React, { useState, useEffect, useContext } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, ImageBackground, TouchableOpacity} from 'react-native'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from '@firebase/auth'
import { Button } from 'react-native-elements'
import { auth } from '../components/firebase.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../App.js'
import { Formik } from 'formik';
import * as Yup from 'yup';

const Login = ({navigation}) => {

  useEffect(() => {
    storeKey()
  return () => {
  
  } ;
},)

onAuthStateChanged(auth, (currentUser) => {
  setUser(currentUser)
})

  const [user, setUser] = useState('')
  const [loginError, setError] = useState('')

  const loginSchema = Yup.object().shape({
    email: Yup.string("Give characters").email("Invalid Email").required('Email is required'),
    password: Yup.string().required('Required'),
  });

  const {signIn} = useContext(UserContext)

  const storeKey = async () => {
    if (auth.currentUser) {
      await AsyncStorage.setItem('@storage_Key', auth.currentUser.uid)
    }
    else {
      // console.log("You are not logged in")
    }
  }

  const login = async ({email, password}) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      .then(
        () => {
          signIn()
          navigation.navigate('Stack', {screen: 'Home'})
        }
      )
      .catch((error) => {
        const wrongInput = JSON.stringify(error)
        console.log(wrongInput)
       const search = wrongInput.search("user")
      if (search === 14) {
        setError("The email you entered has not been used to create a account")
      }
      else {
        setError("Your password is incorrect")
      }
        // console.log(error)
      })
    } catch (error) {
      console.log(error)
      // alert("Your email or password is not correct")
    } 
  }

  return (
    <KeyboardAvoidingView
    behavior="height"
    >
     
<ImageBackground
 source={require(`../assets/landing_photo.jpg`)}
 style={styles.backImage}
>

  <View
  style={styles.overlay}
  >
    <Text
    style={{
      marginLeft: 33,
      marginBottom: 25,
      fontWeight: 'bold',
      alignSelf: 'flex-start',
      fontSize: 15,
    }}
    >Log In</Text>
  
      <Formik
               initialValues={{ email: '', password: '' }}
               validationSchema={loginSchema}
               onSubmit={ 
                      (values, actions) =>  {
                        actions.resetForm();
                        login(values);
                      }
                  }
                  // style={styles.form}
             >
               {
              ({values, errors, touched, handleChange, handleSubmit, handleBlur}) => (
                 <View>
                   <TextInput
                     style={styles.input}
                     onChangeText={handleChange('email')}
                     placeholder='Email'
                     onBlur={handleBlur('email')}
                     value={values.email}
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
                     {loginError ? (
                          <Text style={{ fontSize: 10, color: 'red' }}>{loginError}</Text>
                       ) : null }
                   <Button onPress={handleSubmit} title="Log In" buttonStyle={styles.button} /> 
                   <Text style={{marginBottom: 5}} >
                    {<TouchableOpacity><Text>Forgot Password</Text></TouchableOpacity>}
                   </Text>
                   <View
                   style={styles.line}
                   >
                   <Text>
                   New Here?&nbsp;
                   </Text>
                     <TouchableOpacity
                     onPress={ () => navigation.navigate('Registration')} 
                     >
                       <Text
                        style={
                          styles.link
                        }
                       >
                        Sign Up
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

export default Login

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%'
  },
  form: {
    width: 500
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 25,
    width: 352,
   height: 49
  },
  backImage:{
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#BEC3AACC',
      alignItems: 'center',
      justifyContent: 'center',
  },
  button: {
    backgroundColor: '#6F7643',
    borderRadius: 10,
    marginBottom: 25,
  },
  forgetButton: {
    backgroundColor: '#00000000'
  },
  link: {
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 1
  },
  line: {
   flexDirection: 'row'
  }
})