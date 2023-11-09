import Avatar from '@mui/material/Avatar'

interface LogoProps {
  path: string
}

const BasicLogo = (props: LogoProps): JSX.Element => {
  return (
    <Avatar
      src={props.path}
      variant='square'
      alt='E-Commerce Store LK logo'
      sx={{ width: '90px', height: '56px' }}
    />
  )
}

export default BasicLogo
