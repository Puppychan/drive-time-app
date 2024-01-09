import { View, Text, Dimensions } from 'react-native'
import React, { useState } from 'react'
import StarRating from 'react-native-star-rating-widget'

interface ReviewCardProps {
  ratingFromCard: (rating: number) => void
}

const ReviewCard = ({ ratingFromCard }: ReviewCardProps) => {
  const [rating, setRating] = useState(0)
  const sendRatingToParent = (newRating : number) => {
    setRating(newRating)
    ratingFromCard(newRating)
  }
  return (
    <View
      style={{
        height: 110,
        marginHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        marginBottom: 10
      }}
    >
      <View
        style={{
          minWidth: '100%',
          backgroundColor: '#fafafa',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          padding: 10
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Are you satisfied with this trip?</Text>
      </View>
      <View style={{ margin: 10 }}>
        <StarRating
          rating={rating}
          onChange={(newRating) => sendRatingToParent(newRating)}

          starSize={50}
          emptyColor="#d3d7d6"
          starStyle={{ marginHorizontal: 10 }}
        />
      </View>
    </View>
  )
}

export default ReviewCard
