import DocumentIcon from '@heroicons/react/24/outline/InboxStackIcon'
import BookIcon from '@heroicons/react/24/outline/BookOpenIcon'

const iconClasses = `h-6 w-6`

const routes = [
  {
    path: '/app/reading',
    icon: <BookIcon className={iconClasses}/>,
    name: 'Reading',
  },
  {
    path: '/app/documents',
    icon: <DocumentIcon className={iconClasses}/>,
    name: 'Documents',
  },
]

export default routes


