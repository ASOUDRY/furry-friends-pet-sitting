import React, {useState} from 'react';
import { Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';


const ServiceButton = (
    // props
    {title, returnvisit, returntype}
    ) => {
    // console.log(props)

    const changeStyle = () => {
        if (test === false) {
            setStyle(styles.clicked)
        }
        else {
            setStyle(styles.button)
        }
    }

    const [test, setTest] = useState(false)
    const [style, setStyle] = useState(styles.button)
    return (
        <View>
            <Button title={title}
            onPress={() => {
                if (title === "Walking" || title === "House-Sitting" || title === "Drop-In") {
                    changeStyle()
                    returntype(test, title)
                }
                else {
                    returnvisit(title)
                }
                setTest(!test)
            }}
            buttonStyle={style}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
         borderWidth: 2,
         borderColor: 'white',
         borderRadius: 30,
       
    },
    clicked: {
         backgroundColor: 'red',
         borderWidth: 2,
         borderColor: 'white',
         borderRadius: 30,
    }
})

export {ServiceButton}