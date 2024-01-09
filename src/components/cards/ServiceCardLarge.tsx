import { StyleSheet, Image, View, TouchableOpacity, ImageSourcePropType } from 'react-native'
import { Card, Title } from 'react-native-paper'

type ServiceCardProps = {
  title: string
  iconImage: ImageSourcePropType
  onClick: () => void
}

const ServiceCardLarge = ({ title, iconImage, onClick }: ServiceCardProps) => {
  return (
    <TouchableOpacity style={styles.actionContainer} onPress={onClick}>
      <Card style={styles.card}>
        <Card.Content>
          <Image source={iconImage} style={styles.image} resizeMode="contain" />
          <View style={styles.textContainer}>
            <Title style={styles.title}>{title} -&gt;</Title>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    // margin: 10,
    width: '100%', // Full width
    elevation: 5, // Shadow for Android
    paddingVertical: 10, // Padding inside
    paddingHorizontal: 7, // Padding inside
    borderRadius: 12 // Rounded corners
  },
  image: {
    width: '60%', // Take the full width of the card
    height: 100, // Fixed height for the image
    alignSelf: 'flex-end',

    borderRadius: 8 // Rounded corners
  },
  textContainer: {
    marginTop: 15 // Space between image and text
  },
  title: {
    fontWeight: 'bold', // Bold font for the title
    textAlign: 'left'
  },
  paragraph: {
    marginTop: 5 // Space between title and paragraph
  },
  actionContainer: {
    padding: 10, // Padding for touchable area
    alignItems: 'flex-end', // Align the text to the right
    width: '50%'
  }
})

export default ServiceCardLarge
