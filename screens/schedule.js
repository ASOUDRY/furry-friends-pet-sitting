import React, { useEffect, useState } from 'react';
import {Calender} from '../components/calender.js'
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Text, Pressable, Modal } from 'react-native';
import { Button} from 'react-native-elements';
import { firestore } from '../components/firebase';
import {addDoc, collection} from 'firebase/firestore'
import { Formik } from 'formik';
import { AnimalButton } from '../components/animalButton.js';
import { ServiceTypeBtn } from '../components/serviceTypeBtn.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';

const Schedule = () => {
    useEffect(() => {
        getData()
    })

    const [modalVisible, setModalVisible] = useState(false);
    const [location, setLocation] = useState(false);
    const [startdate, setStartDate] = useState(false);
    const [enddate, setEndDate] = useState(false);
    const [id, setID] = useState([]);
    const [animalList, setList] = useState(['cat', 'dog'])
    const [service, setService] = useState([]);
    const [test, setTest] = useState(false)
    const [comment, setComment] = useState(false)
    const [load, reload] = useState('')
    const [pets, setPets] = useState({
        cat: {
        number: 1 
    }, 
        dog: {
        number: 1
    }
 });

const uri = ['Dog', 'Bowl', 'House']

 const getData = async () => {
    try {
        
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
       setID(value)
      }
    } catch(e) {
      // error reading value
    }
  }

    let addtoList = (prop) => {
   
     let petName = prop[0]
     let petNumber = prop[1]

     console.log(pets)
     setPets(prevState => ({
        ...prevState,           // copy all other field/objects
        [petName]: {              // recreate the object that contains the field to update
        //   ...prevState.name, // copy all the fields of the object
          number: 5    // overwrite the value of the field to update
        }
      })
      );
 }

 const removePets = (target) => {
     setList(
         animalList.filter(key => key != target) 
    )
 }

const setType = (state, title) => {
if (state === false) {
    setService([...service, title])
}
else {
    setService(
                 service.filter(key => key != title) 
            )
    }
}

const setVisit = (prop) => {
    // console.log(prop)
    triggerOpen()
}

    const serviceList = ["Walking", "Drop-In", "House-Sitting"]
    // const datesList = ["One-Time", "Re-Occuring"]
   
    let dates = (value1, value2) => {
            setStartDate(JSON.stringify(value1)),
            setEndDate(JSON.stringify(value2))
        }

    let date = (value) => {
        setStartDate(JSON.stringify(value)),
        setEndDate(JSON.stringify(value))
    }

    let submit = async () => {
            try {
                const docRef = addDoc(collection(firestore, "schedule"), {
                  location: location,
                  animals: pets,
                  startDate: startdate,
                  endDate: enddate,
                  id: id,
                  status: 'future',
                  service: service,
                  comment: comment,
                  update: []
                });
                setModalVisible(true)
                alert("Your visit has been submitted")
                setComment('')
                setLocation('')
              } catch (e) {
               alert(e)
              }
        }

        return (
                  <KeyboardAvoidingView
    behavior="height"
    keyboardVerticalOffset={100}
    >
         <ScrollView style={styles.services}>

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
                    Your visit has been scheduled.</Text>
            <Pressable
              style={styles.buttonStyle}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close this box.</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
                 <Text style={styles.title}>Book a Visit</Text>
                <Text 
                style={styles.inputQuestion}
                >Where do you live?</Text> 
                <View>
              
                <TextInput
                 value={location}
                style={styles.mapInput}
                placeholder='Enter your address here.'
                onChangeText={(value) => setLocation(value)}
                />
                </View>
              
                <Text
                  style={styles.inputQuestion}
                >
                    What kind of Pets do you have?</Text>
                <View style={styles.buttonGroup}>
                    {  
                            animalList.map((tag) => {
                                return (
                                   <AnimalButton key={tag} remove={removePets} addtoList={addtoList} 
                                    animalz={tag} number={pets}         
                                    />
                                )
                            })
                    } 
                </View>
               
                  <Formik  
                 initialValues={{pet: ''}}
                 onSubmit={(values, actions) => {
             
                let freshPet = {
                    [values.pet]: {
                        number: 1
                    }
                }

                    actions.resetForm();
                   setList([...animalList,values.pet])
                   setPets([...pets, freshPet ])
                 }
                }
                 >
                     {
                         (props) => (
                            <View
                            style={{
                                flexDirection: 'row',
                            }}
                            >
                                 <TextInput
                                 style={styles.input}
                                 placeholder='Type of Pet'
                                 onChangeText={props.handleChange('pet')}
                                 value={props.values.pet}
                                 />
                              <Button buttonStyle={styles.addButton} titleStyle={{color: 'black'}} onPress={props.handleSubmit} title="Add a New Pet" />
                            </View> 
                         )
                     }
                 </Formik>
                
                <Text
                  style={styles.inputQuestion}
                >What services do you need?</Text>
                <View
                style={styles.servicebutton}
                >
            
                   <ServiceTypeBtn returntype={setType} title={serviceList} uri={uri} /> 
                </View>

                <Text
                  style={styles.inputQuestion}
                >How many visits do you need.?</Text>
                <Calender date={date} dates={dates}/>
              <Text
                style={styles.inputQuestion}
              >Any Extra Notes for me?</Text>
          <TextInput
              value={comment}
                multiline={true}
                style={styles.commentInput}
              
                onChangeText={(value) => setComment(value)}
                />
                <Button
                buttonStyle={styles.addButton}
                titleStyle={{color: 'black'}}
                  title="Submit" onPress={() => submit() }
                />
                </ScrollView>   
                </KeyboardAvoidingView>
        )
    }

export default Schedule

const styles = StyleSheet.create({
    services: {
        display: "flex",
        flexDirection: 'column',
        backgroundColor: '#F2F5EE',
    },
    title: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20,
    },
    imput: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",
        color: "#20232a",
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    new: {
        color: 'red',
        width: "50%"
    },
    buttonGrouptrue: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    directionalButtons: {
        flexDirection: 'column',
    },
    input: {
        height: 40,
        width: 150,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        backgroundColor: 'white',
        marginRight: 5,
        marginLeft: 10
    },
    addButton: {
        backgroundColor: '#BEC3AA',
        borderRadius: 10,
        height: 40
    },
    servicebutton: {
        justifyContent: 'center',
        // width: 80
    },
    mapInput: {
        width: 405, height: 40,
        margin: 10,
        borderWidth: .5,
        borderColor: '#D3D3D3',
        borderRadius: 9,
        backgroundColor: 'white',
        padding: 10
    },
    inputQuestion: {
        marginLeft: 10,
        color: 'black',
        fontWeight: 'bold',
        // marginBottom: 10
    },
    commentInput: {
        height: 100,
        backgroundColor: 'white',
        textAlignVertical: 'top',
        margin: 10,
        borderRadius: 20
       
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
    addButton: {
      backgroundColor: '#6F7643',
      borderRadius: 10,
      marginBottom: 25,
    }
})
