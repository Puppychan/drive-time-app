import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Card, TouchableRipple } from 'react-native-paper'

type ServiceCardProps = {
  title: string
  icon: any
  onClick: () => void
}

const ServiceCard = ({ title, icon, onClick }: ServiceCardProps) => {
  return (
    <TouchableRipple onPress={onClick}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
          <Text style={styles.title}>{title}</Text>
        </Card.Content>
      </Card>
    </TouchableRipple>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 100, // Set the width of the card
    height: 100, // Set the height of the card
    justifyContent: 'center', // Center content vertically
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
    width: 50, // Set the size of the icon
    height: 50 // Set the size of the icon
  },
  title: {
    marginTop: 4, // Space between icon and title
    fontSize: 14, // Set the font size
    textAlign: 'center' // Center the text
  }
})

export default ServiceCard
