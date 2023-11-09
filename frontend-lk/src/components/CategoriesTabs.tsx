import * as React from 'react'
import { Box, Tabs, Tab } from '@mui/material'

interface CategoriesTabsProps {
  categories: Array<string>
  orientation: 'horizontal' | 'vertical'
  centered: boolean
}

const CategoriesTabs = (props: CategoriesTabsProps) => {
  const [value, setValue] = React.useState(props.categories.length)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setValue(newValue)
    console.log(newValue)
  }

  return (
    <Box
      sx={{
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
        {props.categories.map((category) => (
          <Tab label={category} key={category} />
        ))}
      </Tabs>
    </Box>
  )
}

export default CategoriesTabs
