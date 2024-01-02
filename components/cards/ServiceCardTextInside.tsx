import { ellipseStyle2Lines } from '@/common/utils/custom-text.inline-style'
import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Card, TouchableRipple } from 'react-native-paper'
type ServiceCardProps = {
  title: string
  iconImage: string
  onClick: () => void
}

const ServiceCardTextInside = ({ title, iconImage, onClick }: ServiceCardProps) => {
  return (
    <TouchableRipple onPress={onClick}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Image source={{ uri: iconImage }} style={styles.icon} resizeMode="contain" />
          <Text style={styles.title} {...ellipseStyle2Lines}>
            {title}
          </Text>
        </Card.Content>
      </Card>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 100, // Set the width of the card
    minHeight: 100, // Set the height of the card
    alignItems: 'center', // Center content horizontally
    margin: 8, // Add space around the card
    elevation: 2, // Add shadow for Android (optional)
    borderRadius: 8 // Round the corners
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 60, // Set the size of the icon
    height: 60 // Set the size of the icon
  },
  title: {
    marginTop: 4, // Space between icon and title
    fontSize: 14, // Set the font size
    textAlign: 'center' // Center the text
  }
})

export default ServiceCardTextInside
