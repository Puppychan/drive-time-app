import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-paper'

import { ellipseStyle2Lines } from '@/common/utils/custom-text.inline-style'

type ServiceCardProps = {
  title: string
  iconImage: string
  onClick: () => void
}

const ServiceCard = ({ title, iconImage, onClick }: ServiceCardProps) => {
  return (
    <TouchableOpacity onPress={onClick} style={{ alignItems: 'center', marginVertical: 8 }}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Image source={{ uri: iconImage }} style={styles.icon} resizeMode="contain" />
        </Card.Content>
      </Card>
      <Text {...ellipseStyle2Lines} style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '25%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 8
  },
  cardContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 65,
    height: 65
  },
  title: {
    marginTop: 4,
    fontSize: 14,
    textAlign: 'center',
    width: 100 // Width is needed to control the ellipsis
  }
})

export default ServiceCard
