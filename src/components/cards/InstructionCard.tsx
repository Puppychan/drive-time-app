import { StyleSheet, Image, View, TouchableOpacity, ImageSourcePropType } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'

import { ellipseStyle, ellipseStyle4Lines } from '@/src/common/utils/custom-text.inline-style'

type InstructionCardProps = {
  imageUrl: ImageSourcePropType
  onClick: () => void
  title: string
  subtitle: string
}

const InstructionCard = ({ imageUrl, onClick, title, subtitle }: InstructionCardProps) => {
  return (
    <TouchableOpacity style={styles.actionContainer} onPress={onClick}>
      <Card style={styles.card}>
        <Card.Content>
          <Image source={imageUrl} style={styles.image} />
          <View style={styles.textContainer}>
            <Title style={styles.title} {...ellipseStyle}>
              {title} -&gt;
            </Title>
            <Paragraph style={styles.paragraph} {...ellipseStyle4Lines}>
              {subtitle}
            </Paragraph>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    minHeight: 270,
    width: 250, // Take the full width of the card
    elevation: 5, // Shadow for Android
    paddingTop: 3, // Padding inside
    paddingHorizontal: 5, // Padding inside
    borderRadius: 8 // Rounded corners
  },
  image: {
    width: '100%', // Take the full width of the card
    height: 130, // Fixed height for the image
    borderRadius: 8 // Rounded corners
  },
  textContainer: {
    width: '100%', // Take the full width
    marginTop: 10 // Space between image and text
  },
  title: {
    fontWeight: 'bold' // Bold font for the title
  },
  paragraph: {
    marginTop: 5 // Space between title and paragraph
  },
  actionContainer: {
    alignItems: 'flex-end', // Align the text to the right
    marginRight: 10, // Margin to the right
    paddingBottom: 10 // Padding at the bottom
  }
})

export default InstructionCard
