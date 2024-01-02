import { TouchableOpacity, ImageBackground, View, StyleSheet } from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper'

import { ellipseStyle2Lines, ellipseStyle4Lines } from '@/common/utils/custom-text.inline-style'


type FullScreenCardProps = {
  imageUrl: string
  title: string
  subtitle: string
  onClick: () => void
}

const FullScreenCard = ({ imageUrl, title, subtitle, onClick }: FullScreenCardProps) => (
  <TouchableOpacity onPress={onClick} style={styles.actionContainer}>
    <Card style={styles.card}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.backgroundImage}>
        {/* Overlay View */}
        <View style={styles.overlay} />
        <Card.Content style={styles.content}>
          <Title style={styles.title} {...ellipseStyle2Lines}>
            {title}
          </Title>
          <Paragraph style={styles.paragraph} {...ellipseStyle4Lines}>
            {subtitle} →
          </Paragraph>
        </Card.Content>
      </ImageBackground>
    </Card>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    height: 150,
    width: '100%', // Set width to full screen width
    overflow: 'hidden', // This keeps the image within the boundaries of the border radius
    elevation: 4 // Optional, for adding shadow on Android
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // This will make the overlay cover the entire image
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent overlay
  },
  backgroundImage: {
    flex: 1 // Ensures the image background takes up the entire card
  },
  content: {
    alignItems: 'flex-start', // Align items in the `Card.Content` to the left
    margin: 20
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4
  },
  paragraph: {
    color: 'white'
  },
  actionContainer: {
    width: '100%'
  }
})

export default FullScreenCard
