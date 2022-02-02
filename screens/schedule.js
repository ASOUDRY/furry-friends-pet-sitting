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

const Schedule = () => {
    const [location, setLocation] = useState(false);
    const [startdate, setStartDate] = useState(false);
    const [enddate, setEndDate] = useState(false);
    const [id, setID] = useState([]);
    const [animalList, setList] = useState(['cat', 'dog'])
    const [pets, setPets] = useState([
        {cat: {
        number: 1 
    }, 
        dog: {
        number: 1
    }
 }]);

    const serviceList = ["Walking", "Drop-in-Visits", "House-Sitting", "One-Time", "Re-Occuring"]
   
        let click = (value) => {
              setLocation(value)       
        }
        let dates = (value1, value2) => {
            setStartDate(value1),
            setEndDate(value2)
        }

        let submit = async () => {
            try {
                const docRef = addDoc(collection(firestore, "schedule"), {
                  location: location,
                  startDate: startdate,
                  endDate: enddate,
                  id: id
                });
                // console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        }

    useEffect(() => {
        console.log(pets)
    })

        return (
            <View style={styles.services}>
                <Text style={styles.title}>Where do you live?</Text>
                <GooglePlacesInput click={click} style={styles.input} />

                <Text>What kind of Pets do you have?</Text>
                <View style={styles.buttonGroup}>
                    {  
                            animalList.map((tag) => {
                                return (
                                   <AnimalButton animalz={tag}/>
                                )
                            })
                    }
                </View>
               
                 <Formik
                 initialValues={{pet: ''}}
                 onSubmit={(values, actions) => {
                let freshPet = {
                    values: {
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
                            <ServiceButton title={title} />
                        )
                    })
                }
                </View>
               
                <Text style={styles.title}>Where dates will you need?</Text>
                <Calender dates={dates}/>
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
