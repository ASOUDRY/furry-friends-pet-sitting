import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button, Modal} from "react-native";
import { Formik } from 'formik';
// import { getAuth, getMultiFactorResolver, updateEmail } from "firebase/auth";

const SetProfile = () => {
const [modalOne, setModalOneVisible] = useState(false);
const [toggle, setToggle] = useState(false);
   
const sendReview = ({email, password, phone, title}) => {
  console.log(email)
  console.log(password)
  console.log(phone)
  console.log(title)


//   if (email) {
// console.log(email)
// const auth = getAuth();
// updateEmail(auth.currentUser, "test@gmail.com").then(() => {
//  console.log("email updated")
// }).catch((error) => {
//   console.log(error)
// });
//   }

  // if (password) {
  //   console.log("password exists")
  // }

  if (phone){
    console.log("phone exists")
  }

  if (title) {
    console.log("title exists")
  }
  //  const docRef = addDoc(collection(firestore, "review"), {
  //    data: {
  //     Title: values.title,
  //     Message: values.message,
  //    },
  //    Time : Date.now()
  //     });
    }

const refreshState = () => {
  setToggle(!toggle)
}

const close = () => {
  setModalOneVisible(!modalOne);
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
               
               initialValues={{ title: '', phone: '' }}
               onSubmit={ 
                      (values, actions) =>  {
                        setModalOneVisible(!modalOne)
                          // console.log("clicked")
                        actions.resetForm();
                        // setName(values.title)
                        refreshState()
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
                      placeholder='Name'
                      onChangeText={props.handleChange('title')}
                      value={props.values.title}
                      />
                      <TextInput
                      style={styles.input}
                      placeholder='Preferred Phone Number'
                      onChangeText={props.handleChange('phone')}
                      value={props.values.phone}
                      />
                       {/* <TextInput
                      style={styles.input}
                      placeholder='email'
                      onChangeText={props.handleChange('email')}
                      value={props.values.email}
                      />
                      <TextInput
                      style={styles.input}
                      placeholder='Password'
                      onChangeText={props.handleChange('password')}
                      value={props.values.password}
                      /> */}
                       <Button style={styles.button} onPress={() => close()} title="Close" />
                   <Button style={styles.button} onPress={props.handleSubmit} title="Submit" />
                 </View>
               )}
             </Formik>

</View>
               
   </Modal> 

   <Button 
     onPress={() => {setModalOneVisible(true)}}
     title={'Open Profile'} />
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

export {SetProfile}