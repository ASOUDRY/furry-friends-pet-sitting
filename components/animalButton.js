import React, {useState, useEffect} from 'react';
import { Button } from 'react-native-elements';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

const AnimalButton = ({remove, animalz, addtoList, number}) => {

    // let anim = 
    useEffect(() => {
       return () => {
           console.log('unmounted')
       } 
    })
    console.log(number)
    const [animalNumber, setanimalNumber] = useState(1)  
    return (
        <View style={styles.buttonGrouptrue} >
            {/* <Text>{animalNumber}</Text> */}
            <Button title={animalNumber + ' ' + animalz}
                onPress={() => remove(animalz)} 
                buttonStyle={styles.button} titleStyle={{color: 'black'}}
            />
            <View style={styles.directionalButtons}>
                          
                <TouchableOpacity
                    onPress={() => {
                        setanimalNumber(number => number + 1)
                        // console.log(animalNumber)
                    addtoList([animalz, animalNumber + 1])      
                    }}
                    style={styles.arrowButton} 
                    >
                    <Image
                        style={{  
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        source={require('../assets/arrow_up.png')}
                    ></Image>
                </TouchableOpacity>
                         
            <TouchableOpacity
                onPress={() => {
                                setanimalNumber(number => number - 1)
                                addtoList([animalz, animalNumber - 1])   
                            }}
                            style={styles.arrowButton}
                        >
                     <Image
                        style={{  
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}
                        source={require('../assets/arrow_down.png')}
                    ></Image>
            </TouchableOpacity>           
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonGrouptrue: {
            flexDirection: 'row',
            marginLeft: 10,
            marginBottom: 10,
        },
        button: {
            backgroundColor: 'white',
            borderRadius: 10,
            height: 60,
            padding: 10,
            margin: 3
        },
        arrowButton : {
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'white',
            backgroundColor: 'white',
            padding: 5,
            height: 26,
            width: 50,
            margin: 3,
        }
})

export {AnimalButton};