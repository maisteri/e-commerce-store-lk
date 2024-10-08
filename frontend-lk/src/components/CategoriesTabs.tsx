import * as React from 'react'
import { Box, Tabs, Tab } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getProductsByCategory } from '../reducers/siteGeneralReducer'
import { useNavigate } from 'react-router-dom'

interface CategoriesTabsProps {
  orientation: 'horizontal' | 'vertical'
  centered: boolean
}

const CategoriesTabs = (props: CategoriesTabsProps) => {
  const [value, setValue] = React.useState(0)
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.general.categories)
  const navigate = useNavigate()

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setValue(newValue)
    dispatch(getProductsByCategory(categories[newValue]))
    navigate('/')
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 10,
        marginTop: '64px',
        paddingBottom: '20px',
        width: '100%',
        bgcolor: 'background.paper',
        display:
          props.orientation === 'horizontal'
            ? { xs: 'none', md: 'block' }
            : { xs: 'block' },
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        orientation={props.orientation}
        centered={props.centered}
      >
        {categories.map((category) => (
          <Tab label={category} key={category} />
        ))}
      </Tabs>
    </Box>
  )
}

export default CategoriesTabs
