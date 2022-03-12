import React, { useEffect, useState } from 'react';
import {GooglePlacesInput} from '../components/address.js'
import {Calender} from '../components/calender.js'
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Text} from 'react-native-elements';
import { firestore } from '../components/firebase';
import {addDoc, collection} from 'firebase/firestore'
import { Formik } from 'formik';
import { AnimalButton } from '../components/animalButton.js';
import { ServiceButton } from '../components/serviceButton.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { confirmPasswordReset } from 'firebase/auth';

const Schedule = () => {
    useEffect(() => {
        getData()
    })

    const [location, setLocation] = useState(false);
    const [startdate, setStartDate] = useState(false);
    const [enddate, setEndDate] = useState(false);
    const [id, setID] = useState([]);
    const [animalList, setList] = useState(['cat', 'dog'])
    const [service, setService] = useState([]);
    const [test, setTest] = useState(false)
    const [pets, setPets] = useState({
        cat: {
        number: 1 
    }, 
        dog: {
        number: 1
    }
 });


 const getData = async () => {
    try {
        
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
       setID(value)
      }
      else {
          console.log("no Id")
      }
    } catch(e) {
      // error reading value
    }
  }



    let passOver = (prop) => {
   
     let name = prop[0]
     let nombre = prop[1]
    
     setPets(prevState => ({
        ...prevState,           // copy all other field/objects
        [name]: {              // recreate the object that contains the field to update
          ...prevState.name, // copy all the fields of the object
          number: nombre    // overwrite the value of the field to update
        }
      }));
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
    console.log(prop)
    triggerOpen()
}

    const serviceList = ["Walking", "Drop-In", "House-Sitting"]
    const datesList = ["One-Time", "Re-Occuring"]
   
    let click = (value) => {
              setLocation(value)       
        }
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
                  current: true,
                  service: service
                });
                // console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        }

        return (
            <View style={styles.services}>
                <Text style={styles.title}>Where do you live?</Text>
                <GooglePlacesInput click={click} style={styles.input} />

                <Text>What kind of Pets do you have?</Text>
                <View style={styles.buttonGroup}>
                    {  
                            animalList.map((tag) => {
                                return (
                                   <AnimalButton remove={removePets} test={passOver}  animalz={tag}/>
                                )
                            })
                    }
                </View>
               
                 <Formik 
                     
                 initialValues={{pet: ''}}
                 onSubmit={(values, actions) => {
                     console.log(values.pet)
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
                            >
                                 <TextInput
                                 style={styles.input}
                                 placeholder='Type of Pet'
                                 onChangeText={props.handleChange('pet')}
                                 value={props.values.pet}
                                 />
                              <Button style={styles.button} onPress={props.handleSubmit} title="Add a new Pet" />
                            </View> 
                         )
                     }
                 </Formik>
                
                <Text>What services do you need?</Text>
                <View
                style={styles.servicebutton}
                >
                {
                    serviceList.map((title) => {
                        return (
                            <ServiceButton returntype={setType} title={title} />
                        )
                    })
                }
                </View>

                <Text>How many visits do you need.?</Text>
                <Calender date={date} dates={dates}/>
                <Button title="Submit" onPress={() => submit() } /> 
            </View>   
        )
    }

export default Schedule

const styles = StyleSheet.create({
    services: {
        display: "flex",
        flexDirection: 'column',
    },
    title: {
        color: 'red',
        textAlign: 'center'
    },
    input: {
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
        height: 50,
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
    servicebutton: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})
