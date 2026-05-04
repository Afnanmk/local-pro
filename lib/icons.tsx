// Maps database icon names to rendered react-icons elements
import {
  FiDroplet,
  FiZap,
  FiPenTool,
  FiSun,
  FiCloud,
  FiAlertTriangle,
  FiTruck,
  FiGrid,
} from 'react-icons/fi'

interface CategoryIconProps {
  name: string
  className?: string
}

/**
 * Renders a Feather icon based on the icon_name stored in the database.
 * Avoids dynamic component resolution to satisfy React Compiler rules.
 */
export function CategoryIcon({ name, className }: CategoryIconProps) {
  switch (name) {
    case 'FiDroplet':
      return <FiDroplet className={className} />
    case 'FiZap':
      return <FiZap className={className} />
    case 'FiPenTool':
      return <FiPenTool className={className} />
    case 'FiSun':
      return <FiSun className={className} />
    case 'FiCloud':
      return <FiCloud className={className} />
    case 'FiAlertTriangle':
      return <FiAlertTriangle className={className} />
    case 'FiTruck':
      return <FiTruck className={className} />
    default:
      return <FiGrid className={className} />
  }
}
