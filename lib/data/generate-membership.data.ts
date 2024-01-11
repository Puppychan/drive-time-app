import { ResponseCode } from '@/common/response-code.enum'

import { addMembership } from '../services/membership.service'

function generateMembershipList() {
  return [
    {
      membershipId: '1',
      name: 'Bronze',
      level: 1,
      minPoints: 0,
      discount: 5, // 5% discount, for example
      createdAt: undefined,
      updatedAt: undefined
    },
    {
      membershipId: '2',
      name: 'Silver',
      level: 2,
      minPoints: 100,
      discount: 10,
      createdAt: undefined,
      updatedAt: undefined
    },
    {
      membershipId: '3',
      name: 'Gold',
      level: 3,
      minPoints: 500,
      discount: 15,
      createdAt: undefined,
      updatedAt: undefined
    },
    {
      membershipId: '4',
      name: 'Platinum',
      level: 4,
      minPoints: 1000,
      discount: 20,
      createdAt: undefined,
      updatedAt: undefined
    }
  ]
}

export const generateMembershipData = async () => {
  const memberships = generateMembershipList()
  let count = 1
  for (let index = 0; index < memberships.length; index++) {
    const response = await addMembership(memberships[index])
    if (response.code !== ResponseCode.OK) break
    count++
  }
  if (count !== memberships.length) return `Add membership unsuccessfully`
  else return `Add membership successfully`
}
