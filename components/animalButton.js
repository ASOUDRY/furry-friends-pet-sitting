import React, {useState, useEffect} from 'react';
import { Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

const AnimalButton = ({remove, animalz, test}) => {
    
    const [animalNumber, setanimalNumber] = useState(1)

    return (
        <View style={styles.buttonGrouptrue} >
                                    <Button title={animalNumber + ' ' + animalz}
                                    onPress={() => remove(animalz)} 
                                    containerStyle={styles.button}
                                    />
                                            <View style={styles.directionalButtons}>
                          <Button icon={{
                              name: 'arrow-up',
                              type: 'font-awesome',
                              size: 15,
                              color: 'white',
                            }}
                            iconRight
                            onPress={() => {
                                setanimalNumber(animalNumber + 1)
                               test([animalz, animalNumber + 1])
                               console.log(animalz)   
                            }}
                          />
                           <Button icon={{
                              name: 'arrow-down',
                              type: 'font-awesome',
                              size: 15,
                              color: 'white',
                            }}
                            iconRight
                            onPress={() => {
                                setanimalNumber(animalNumber - 1)
                                test([animalz, animalNumber - 1])   
                            }}
                          />
                          </View>
                          </View>
    );
}

const styles = StyleSheet.create({
    buttonGrouptrue: {
            flexDirection: 'row',
        },
        button: {
            backgroundColor: 'black',
        color: 'black',
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 30,
        }
})

export {AnimalButton};