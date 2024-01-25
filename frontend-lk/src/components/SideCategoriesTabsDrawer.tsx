import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CategoriesTabs from './CategoriesTabs'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setSideDrawerOpen } from '../reducers/siteGeneralReducer'

const SideCategoriesTabsDrawer = () => {
  const dispatch = useAppDispatch()
  const open = useAppSelector((state) => state.general.sideDrawerOpen)

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      dispatch(setSideDrawerOpen(open))
    }

  const list = () => (
    <Box
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <CategoriesTabs orientation='vertical' centered={false} />
    </Box>
  )

  return (
    <>
      <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  )
}

export default SideCategoriesTabsDrawer
