import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import ReviewCard from '../components/review/ReviewCard/ReviewCard'
import { router } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'
import DriverInfoCard from '../components/review/ReviewCard/DriverInfoCard'
import RouteInfo from '../components/review/ReviewCard/RouteInfo'
import TripInsurance from '../components/review/ReviewCard/TripInsurance'
import PaymentInfo from '../components/review/ReviewCard/PaymentInfo'
import { CustomButton } from '../components/button/Buttons'
import { Review, ReviewFrom } from '../../lib/models/review.model'
import { auth, db } from '../../lib/firebase/firebase'
import { Timestamp, collection, doc, setDoc, addDoc } from 'firebase/firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'

const ReviewScreen = () => {
  const screenWidth = Dimensions.get('window').width
  const [rating, setRating] = useState(0)
  const handleRatingFromChild = (rating: number) => {
    setRating(rating)
  }

  const addReview = async () => {
    try {
      const docRef = await addDoc(collection(db, 'reviews'), {
        reviewId: '1',
        numStars: rating,
        details: 'ghe day',
        fromUser: auth.currentUser?.uid || '',
        toUser: 'abc',
        resolveBy: 'abc',
        from: ReviewFrom.Customer,
        bookingId: '123abc',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      console.log('Review added with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding review:', error);
      Alert.alert('Error', 'Failed to add review. Please try again.');
    }
  };
  
  const goBack = () => {
    router.back()
    // console.log('Go back');
  }

  return (
    <ScrollView style={{ width: screenWidth, backgroundColor: '#f2f6f9', paddingTop: 20 }}>
      <ReviewCard ratingFromCard={handleRatingFromChild} />
      <DriverInfoCard />
      <RouteInfo />
      <TripInsurance />
      <PaymentInfo />
      <CustomButton title="Arrive" style={styles.customButtonStyle } onPress={addReview} />
      <Text>{rating}</Text>
      <TouchableOpacity onPress={goBack}>
        <Text>Go Backkkkkk</Text>
      </TouchableOpacity>
      <View style={{ height: 50 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  customButtonStyle: {
    backgroundColor: 'black',
    borderRadius: 10,
    marginHorizontal: 10,
    height: 60
  }
})

export default ReviewScreen
