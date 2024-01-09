import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import ReviewCard from '../components/review/ReviewCard/ReviewCard'
import { router } from 'expo-router'
import { useThemeColors } from '@/components/Colors'
import { DEFAULT_THEME } from '@/src/common/constants/default-value.constant'
import { ScrollView } from 'react-native-gesture-handler'
import DriverInfoCard from '../components/review/ReviewCard/DriverInfoCard'
import RouteInfo from '../components/review/ReviewCard/RouteInfo'
import TripInsurance from '../components/review/ReviewCard/TripInsurance'
import PaymentInfo from '../components/review/ReviewCard/PaymentInfo'
import {CustomButton} from '../components/button/Buttons'
import { Review, ReviewFrom, reviewRoleList } from '@/lib/models/review.model'
import { auth, db } from '@/lib/firebase/firebase'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { v4 as uuid } from "uuid"; // Import uuid
import "react-native-get-random-values";

const ReviewScreen = () => {
  const screenWidth = Dimensions.get('window').width;
  // consider
  const goBack = () => {
    router.back()
  }
  const [rating, setRating] = useState(0);
  const handleRatingFromChild = (rating: number) => {
    setRating(rating);
  }
  // const [review, setReview] = useState<Review | null>({
  //   reviewId: '',
  //   numStars : 0,
  //   details: '',
  //   fromUser: '',
  //   toUser: '',
  //   resolveBy: '',
  //   from: ReviewFrom.Customer,
  //   bookingId: '',
  //   createdAt: undefined,
  //   updatedAt: undefined,
  // })

  const addReview = async () => {
    const reviewRef = doc(collection(db, 'reviews')); // Use the correct method to access the Firestore collection
    const reviewId = reviewRef.id;
    const newReview = {
      reviewId: reviewId,
      
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await setDoc(reviewRef, newReview);
  }
  return (
    <ScrollView style={{width: screenWidth,backgroundColor: '#f2f6f9', paddingTop: 20}}>
      <ReviewCard ratingFromCard={handleRatingFromChild} />
      <DriverInfoCard/>
      <RouteInfo/>
      <TripInsurance/>
      <PaymentInfo/>
      <CustomButton title='Arrive' style={styles.customButtonStyle}/>
      <Text>{rating}</Text>
      <TouchableOpacity onPress={goBack}>
        <Text>Go Backkkkkk</Text>
      </TouchableOpacity>
      <View style={{height: 50}}>
      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  customButtonStyle: {
    backgroundColor: 'black', // Custom background color
    borderRadius:10, // Custom border radius
    // Add any other custom styles as needed
    marginHorizontal: 10,
    height: 60,
  },
})

export default ReviewScreen
