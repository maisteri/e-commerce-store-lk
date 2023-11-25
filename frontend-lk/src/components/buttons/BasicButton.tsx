import { Button } from '@mui/material'

interface BasicButtonProps {
  color:
    | 'success'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'warning'
  name: string
  starIcon: React.ReactNode
  onClick: (event: React.SyntheticEvent) => void
}

const BasicButton = (props: BasicButtonProps) => {
  return (
    <Button
      sx={{
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,

        borderColor: '#0063cc',
      }}
      size='large'
      variant='contained'
      color={props.color}
      startIcon={props.starIcon}
      onClick={props.onClick}
    >
      {props.name}
    </Button>
  )
}

export default BasicButton
