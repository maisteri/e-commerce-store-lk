import * as React from 'react'
import { Box, Tabs, Tab } from '@mui/material'

interface CategoriesTabsProps {
  categories: Array<string>
}

const CategoriesTabs = (props: CategoriesTabsProps) => {
  const [value, setValue] = React.useState(props.categories.length)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    console.log(newValue)
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        {props.categories.map((category) => (
          <Tab label={category} key={category} />
        ))}
      </Tabs>
    </Box>
  )
}

export default CategoriesTabs
