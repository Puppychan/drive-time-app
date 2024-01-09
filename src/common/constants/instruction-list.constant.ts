export const INSTRUCTION_LIST = [
  {
    id: 'ID1',
    name: 'Reserve a drive',
    short: 'Reserve a drive for a specific date and time',
    // TODO: Add description
    description: 'Reserve a drive for a specific date and time',
    image:
      'https://images.unsplash.com/photo-1642618717985-a681a41d04bc?q=80&w=3118&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/instruction/reserve'
  },
  {
    id: 'ID2',
    name: 'Start a drive',
    short: 'Start a drive right now',
    // TODO: Add description
    description: 'Start a drive right now',
    image:
      'https://images.unsplash.com/photo-1554672408-730436b60dde?q=80&w=3126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/instruction/start'
  },
  {
    id: 'ID3',
    name: 'Review a drive',
    short: 'Review a drive you have finished',
    // TODO: Add description
    description: 'Review a drive you have finished',
    image:
      'https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/instruction/review'
  },
  {
    id: 'ID4',
    name: 'Edit a drive',
    short: 'Edit a drive you have reserved',
    // TODO: Add description
    description: 'Edit a drive you have reserved',
    image:
      'https://images.unsplash.com/photo-1554672408-17395951edc0?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/instruction/edit'
  },
  {
    id: 'ID5',
    name: 'Cancel a drive',
    short: 'Cancel a drive you have reserved',
    // TODO: Add description
    description: 'Cancel a drive you have reserved',
    image:
      'https://images.unsplash.com/photo-1593510987046-1f8fcfc512a0?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/instruction/cancel'
  }
]
export const SHORT_INSTRUCTION_LIST = INSTRUCTION_LIST.slice(0, 4)
