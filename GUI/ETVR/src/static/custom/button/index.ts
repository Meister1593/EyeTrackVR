import { classNames } from '@src/utils'

export const BUTTON = classNames(
    'rounded-md px-4 py-2 text-sm font-medium transition duration-150',
    'focus:outline-none focus-visible:ring focus-visible:ring-opacity-75',
    'focus-visible:ring-gray-900',
    'dark:focus-visible:ring-gray-50',
    'border-2 border-gray-900 dark:border-gray-50',
    // Background
    'bg-gray-900 hover:bg-gray-700 active:bg-gray-800',
    // Foreground
    'text-gray-50 hover:text-gray-200 active:text-gray-100',
)
