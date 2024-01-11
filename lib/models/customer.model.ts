import { Account } from './account.model'
import { RecentSearch } from './recent-search.model'

export interface Customer extends Account {
  description: string
  membershipId: string
  membershipPoints: number
  recentSearchs: RecentSearch[]
}
