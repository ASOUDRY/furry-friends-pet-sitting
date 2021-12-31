import React from 'react';
import {GooglePlacesInput} from '../components/address.js'
import {Calender} from '../components/calender.js'
import { View, StyleSheet } from 'react-native';
import { Button, Text} from 'react-native-elements';
import { firestore } from '../components/firebase';
import {addDoc, collection} from 'firebase/firestore'

export default class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            startDate: null,
            endDate: null,
            id: null
        }
    }

    componentDidMount() {
        this.setState({
            id: this.props.route.params.id
        })
    }

    render() {

        let click = (value) => {
            this.setState({
                location: value
            })
        }
        let dates = (value1, value2) => {
            this.setState({
                startDate: value1,
                endDate: value2
            })
        }

        let submit = async () => {
            try {
                const docRef = addDoc(collection(firestore, "users"), {
                  location: this.state.location,
                  startDate: this.state.startDate,
                  endDate: this.state.endDate,
                  id: this.state.id
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        }

        return (
            <View style={styles.services}>
                <Text style={styles.title}>Where do you live?</Text>
                <GooglePlacesInput click={click} style={styles.input} />

                <Text>What kind of Pets do you have?</Text>
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
}

const styles = StyleSheet.create({
    services: {
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
    }
})
