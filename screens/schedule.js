import React, { useEffect, useState } from 'react';
import {GooglePlacesInput} from '../components/address.js'
import {Calender} from '../components/calender.js'
import { View, StyleSheet, TextInput } from 'react-native';
import { Button, Text} from 'react-native-elements';
import { firestore } from '../components/firebase';
import {addDoc, collection} from 'firebase/firestore'
import { Formik } from 'formik';
import { AnimalButton } from '../components/animalButton.js';



const Schedule = () => {
    const [location, setLocation] = useState(false);
    const [startdate, setStartDate] = useState(false);
    const [enddate, setEndDate] = useState(false);
    const [id, setID] = useState([]);
    const [animalList, setList] = useState(['cat', 'dog'])
   
        let click = (value) => {
              setLocation(value)       
        }
        let dates = (value1, value2) => {
            setStartDate(value1),
            setEndDate(value2)
        }

        let submit = async () => {
            try {
                const docRef = addDoc(collection(firestore, "users"), {
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

        return (
            <View style={styles.services}>
                <Text style={styles.title}>Where do you live?</Text>
                <GooglePlacesInput click={click} style={styles.input} />

                <Text>What kind of Pets do you have?</Text>
                <View style={styles.buttonGroup}>
                    {  
                    console.log(animalList),
                            animalList.map((tag) => {
                                return (
                                   <AnimalButton animalz={tag}/>
                                )
                            })
                    }
                </View>
               
                 <Button title="Add new pet" style={styles.new} />
                 <Formik
                 initialValues={{pet: ''}}
                 onSubmit={(values, actions) => {
                    actions.resetForm();
                   animalList.push(values.pet)
                   let newList = animalList
                   setList([...animalList,values.pet])
                 }}
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
                              <Button style={styles.button} onPress={props.handleSubmit} title="Submit" />
                            </View> 
                         )
                     }
                 </Formik>
                <Text>What services do you need?</Text>

                <Text style={styles.title}>Where dates will you need?</Text>
                <Calender dates={dates}/>
                <Button title="Submit" onPress={() => submit() } /> 
                <Button title="Profile"  onPress={() => this.props.navigation.navigate('Profile')}></Button>
                <Button title="Go Home"
                onPress={() => this.props.navigation.navigate('Home')}
                ></Button>           
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
    },
    new: {
        color: 'red',
        width: "50%"
    },
    // animalButton: {
    //     // color: "red",
    //     // backgroundColor: "black",
    //     // height: 50,
    //     width: "200%",
    //     margin: 10,
    //     padding: 10,
    //     borderStyle: 'solid',
    //     borderColor: 'black'
    // },
    buttonGrouptrue: {
    //    width: "100%",
        flexDirection: 'row',
    },
    directionalButtons: {
        flexDirection: 'column',
        // margin: 10,
        // padding: 10
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
})
