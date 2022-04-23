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

  const onConfirm2 = ({startDateString, endDateString}) => {
    // You should close the modal in here
    setShowDatePicker2(false)

    dates(startDateString.toString().substring(4,15), endDateString.toString().substring(4,15))
  }

  const onConfirmSingle = (output) => {
    // You should close the modal in here
    setShowDatePickerSingle(false)

    console.log(
   
      )

    date(output.toString().substring(4,15))
  }

  const colorOptions = {
    headerColor:'#6F7643',
    weekDaysColor: '#BEC3AA'
    // headerColor:'#9DD9D2',
    // backgroundColor:'#FFF8F0'
  }
  

  return (
    <View style={styles.container}>
        <View
        style={{ flexDirection: 'row',}}
        >
        <ServiceButton 
        returnvisit={openDatePickerSingle} 
        title={"One-Time"} />
        <ServiceButton returnvisit={setVisit} title={"Re-Occuring"} />
        </View>
      <DatePicker
        isVisible={showDatePicker2}
        mode={'range'}
        onCancel={onCancel2}
        onConfirm={onConfirm2}
        colorOptions={colorOptions}
      />
      <DatePicker
        isVisible={showDatePickerSingle}
        mode={'single'}
        onCancel={onCancelSingle}
        onConfirm={onConfirmSingle}
        colorOptions={colorOptions}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
    // flex: 1,
    // backgroundColor: '#6F7643',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  // color : {
  //   headerColor:'#9DD9D2',
  //   backgroundColor:'#FFF8F0'
  // }
})


export { Calender };