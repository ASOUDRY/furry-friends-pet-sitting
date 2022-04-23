import React, {useState} from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

const ServiceTypeBtn = (
    {title, returntype}
    ) => {
        console.log(title)
    const changeOne = () => {
        if (test === false) {
            setStyle(styles.clicked)
        }
        else {
            setStyle(styles.button)
        }
    }

    const changeTwo = () => {
        if (test === false) {
            setStyle1(styles.clicked)
        }
        else {
            setStyle1(styles.button)
        }
    }

    const changeThree = () => {
        if (test === false) {
            setStyle2(styles.clicked)
        }
        else {
            setStyle2(styles.button)
        }
    }

    const [test, setTest] = useState(false)
    const [stylebutton, setStyle] = useState(styles.button)
    const [stylebutton1, setStyle1] = useState(styles.button)
    const [stylebutton2, setStyle2] = useState(styles.button)

    return (
        <View
        style={styles.serviceRow
        }
        >
            <TouchableOpacity
                    onPress={() => {
                        changeOne()
                        returntype(test, title[0])
                        setTest(!test)
                }}
                style={stylebutton}
            >
                  <Image 
              style={styles.serviceButtonImage}
              source={require('../assets/Dog.png' )} 
              />
                <Text
                style={{textAlign: 'center'}}
                >{title[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                        changeTwo()
                        returntype(test, title[1])
                        setTest(!test)
                }}
                style={stylebutton1}
            >
                  <Image 
              style={styles.serviceButtonImage}
              source={require('../assets/Bowl.png' )} 
              />
                <Text
                 style={{textAlign: 'center'}}
                >{title[1]}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                    onPress={() => {
                        changeThree()
                        returntype(test, title[2])
                        setTest(!test)
                }}
                style={stylebutton2}
            >
                  <Image 
              style={styles.serviceButtonImage}
              source={require('../assets/House.png' )} 
              />
                <Text>{title[2]}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
         borderWidth: 2,
         borderColor: 'white',
         borderRadius: 30,
         height: 112,
         width: 112,
         margin: 10,

    },
    clicked: {
         backgroundColor: '#BEC3AA',
         borderWidth: 2,
         borderColor: 'white',
         borderRadius: 30,
         height: 112,
         width: 112,
         margin: 10
    },
    serviceButtonImage: {
        height: '80%',
        width: '72%',
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      serviceRow: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        // width: '90%'
      }
})

export {ServiceTypeBtn}