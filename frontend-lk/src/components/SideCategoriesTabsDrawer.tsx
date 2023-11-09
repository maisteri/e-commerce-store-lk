import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import CategoriesTabs from './CategoriesTabs'

const categories = ['all', 'mouse', 'cat', 'sportswear', 'drinks', 'mushrooms']

const SideCategoriesTabsDrawer = () => {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setOpen(open)
    }

  const list = () => (
    <Box
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <CategoriesTabs
        categories={categories}
        orientation='vertical'
        centered={false}
      />
    </Box>
  )

  return (
    <>
      <Button onClick={() => setOpen(true)}>left</Button>
      <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  )
}

export default SideCategoriesTabsDrawer
