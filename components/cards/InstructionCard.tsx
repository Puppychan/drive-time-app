import { StyleSheet, Image, View, TouchableOpacity } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'

import { ellipseStyle } from '@/common/utils/custom-text.inline-style'

type InstructionCardProps = {
  imageUrl: string
  onClick: () => void
  title: string
  subtitle: string
}

const InstructionCard = ({ imageUrl, onClick, title, subtitle }: InstructionCardProps) => {
  return (
    <TouchableOpacity style={styles.actionContainer} onPress={onClick}>
      <Card style={styles.card}>
        <Card.Content>
          <Image source={{ uri: imageUrl }} style={styles.image} />
          <View style={styles.textContainer}>
            <Title style={styles.title} {...ellipseStyle}>
              {title} -&gt;
            </Title>
            <Paragraph style={styles.paragraph}>{subtitle}</Paragraph>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    minHeight: 270,
    elevation: 5, // Shadow for Android
    paddingTop: 3, // Padding inside
    paddingBottom: 20, // Padding inside
    paddingHorizontal: 5, // Padding inside
    borderRadius: 8 // Rounded corners
  },
  image: {
    width: '100%', // Take the full width of the card
    height: 130, // Fixed height for the image
    borderRadius: 8 // Rounded corners
  },
  textContainer: {
    marginTop: 10 // Space between image and text
  },
  title: {
    fontWeight: 'bold' // Bold font for the title
  },
  paragraph: {
    marginTop: 5 // Space between title and paragraph
  },
  actionContainer: {
    padding: 10, // Padding for touchable area
    alignItems: 'flex-end' // Align the text to the right
  }
})

export default InstructionCard
