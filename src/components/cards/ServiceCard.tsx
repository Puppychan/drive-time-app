import { Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native'
import { Card } from 'react-native-paper'

import { ellipseStyle2Lines } from '@/src/common/utils/custom-text.inline-style'

type ServiceCardProps = {
  title: string
  iconImage: ImageSourcePropType
  onClick: () => void
}

const ServiceCard = ({ title, iconImage, onClick }: ServiceCardProps) => {
  return (
    <TouchableOpacity onPress={onClick} className='w-1/2 mr-4'>
      <Card className='h-32 flex flex-row justify-center items-center'>
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
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 8,
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
    fontSize: 16,
    textAlign: 'center',
  }
})

export default ServiceCard
