import React, {useState} from 'react';
import { Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

const AnimalButton = props => {
    const [animalNumber, setanimalNumber] = useState(1)

    return (
        <View style={styles.buttonGrouptrue} >
                                    <Button title={animalNumber + ' ' + props.animalz} 
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