import React, { useState } from 'react'
import { View, Button } from 'react-native'
import DatePicker from 'react-native-neat-date-picker'
import { firestore } from './firebase';
import {addDoc, collection} from 'firebase/firestore'

const Calender = props => {

  const [showDatePicker, setShowDatePicker] = useState(false)

  const openDatePicker = () => {
    setShowDatePicker(true)
  }

  const onCancel = () => {
    // You should close the modal in here
    setShowDatePicker(false)
  }

  const submitDates = (start, end) => {
    const docRef = addDoc(collection(firestore, "test"), {
      startDate: start,
      endDate: end
    });
  }

  const onConfirm = ( start, end ) => {
    // You should close the modal in here
    setShowDatePicker(false)
    submitDates(start, end)
    let startDate = start.getDate()
    let endDate = end.getDate()

    props.dates(startDate, endDate)
    // The parameter 'date' is a Date object so that you can use any Date prototype method.
    console.log(start.getUTCMonth())
  }

  return (
    <View>
         <Button title={'Choose your dates'} onPress={openDatePicker}/>
      <DatePicker
        isVisible={showDatePicker}
        mode={'range'}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </View>
)}

export { Calender };