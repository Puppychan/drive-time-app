import { Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native'
import { Card } from 'react-native-paper'

import { ellipseStyle2Lines } from '@/common/utils/custom-text.inline-style'

type ServiceCardProps = {
  title: string
  iconImage: ImageSourcePropType
  onClick: () => void
}

const ServiceCard = ({ title, iconImage, onClick }: ServiceCardProps) => {
  return (
    <TouchableOpacity onPress={onClick} style={{ alignItems: 'center' }}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Image source={iconImage} style={styles.icon} resizeMode="contain" />
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
    minWidth: '25%',
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
