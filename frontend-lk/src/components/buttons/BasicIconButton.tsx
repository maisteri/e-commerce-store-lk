import { IconButton, SxProps, Theme } from '@mui/material'
import Badge from '@mui/material/Badge'

interface BasicButtonProps {
  icon: React.ReactNode
  ariaLabel: string
  badgeContent?: number
  onClick: () => void
  sx?: SxProps<Theme> | undefined
}

const BasicIconButton = (props: BasicButtonProps) => {
  return (
    <IconButton
      size='large'
      edge='start'
      color='inherit'
      aria-label={props.ariaLabel}
      sx={{ mr: 2 }}
      onClick={props.onClick}
    >
      {props.badgeContent ? (
        <Badge badgeContent={props.badgeContent} color='error'>
          {props.icon}
        </Badge>
      ) : (
        props.icon
      )}
    </IconButton>
  )
}

export default BasicIconButton
