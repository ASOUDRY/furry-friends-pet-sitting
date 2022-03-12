import React, { useState } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import DatePicker from 'react-native-neat-date-picker'
import { ServiceButton } from './serviceButton'

const Calender = ({date, dates}) => {

  const setVisit = (prop) => {
    console.log(prop)
    openDatePicker()
  } 

  const [showDatePicker2, setShowDatePicker2] = useState(false)
  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)


  const openDatePicker = () => {
    setShowDatePicker2(true)
  }

  const openDatePickerSingle = () => {
    setShowDatePickerSingle(true)
  }

  const onCancel2 = () => {
    // You should close the modal in here
    setShowDatePicker2(false)
  }

  const onCancelSingle = () => {
    // You should close the modal in here
    setShowDatePickerSingle(false)
  }

  const onConfirm2 = (startDateString, EndDateString) => {
    // You should close the modal in here
    setShowDatePicker2(false)

    dates(startDateString, EndDateString)
  }

  const onConfirmSingle = (output) => {
    // You should close the modal in here
    setShowDatePickerSingle(false)

    date(output)
  }

  

  return (
    <View style={styles.container}>
        <ServiceButton 
        returnvisit={openDatePickerSingle} 
        title={"One-Time"} />
        <ServiceButton returnvisit={setVisit} title={"Re-Occuring"} />
      {/* <Button title="open" onPress={openDatePicker} /> */}
      <DatePicker
        isVisible={showDatePicker2}
        mode={'range'}
        onCancel={onCancel2}
        onConfirm={onConfirm2}
      />
      <DatePicker
        isVisible={showDatePickerSingle}
        mode={'single'}
        onCancel={onCancelSingle}
        onConfirm={onConfirmSingle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // justifyContent: 'center',
    // alignItems: 'center'
  }
})


export { Calender };