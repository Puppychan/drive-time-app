import { faker } from '@faker-js/faker'

export const generateRandomChatData = (driverId: string, customerId: string) => {
  return {
    chatId: faker.string.uuid(),
    driverId,
    customerId
  }
}

// Updated time is 2 hour max
const maxHoursDifference = 2
const randomHoursDifference = Math.random() * maxHoursDifference

export const generateRandomMessageData = (chatId: string) => {
  const messageId = faker.string.uuid()
  const content = faker.lorem.sentence()
  const createdDate = faker.date.recent()

  const updatedDate = new Date(createdDate)
  updatedDate.setHours(createdDate.getHours() + randomHoursDifference)

  return {
    messageId,
    chatId,
    content,
    createdDate,
    updatedDate
  }
}

// Gen 5 chat id
const chatData = Array.from({ length: 5 }, () => generateRandomChatData('1', '1'))

// Gen 5 messages
const messagesList = []
chatData.forEach((data) => {
  const messages = generateRandomMessageData(data.chatId)
  messagesList.push(messages)
})
