// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SideCategoriesTabsDrawer from './SideCategoriesTabsDrawer'

const dispatch = jest.fn()
jest.mock('../hooks', () => ({
  useAppDispatch: () => dispatch,
  useAppSelector: () => true,
}))

jest.mock('./CategoriesTabs', () => ({
  default: () => <button>cat1 cat2 cat3</button>,
}))

jest.mock('../reducers/siteGeneralReducer', () => {
  return {
    setSideDrawerOpen: jest.fn(),
  }
})
import { setSideDrawerOpen } from '../reducers/siteGeneralReducer'

describe('<SideCategoriesTabsDrawer />', () => {
  it('renders correctly', () => {
    const { container } = render(<SideCategoriesTabsDrawer />)
    expect(container).toMatchSnapshot()
  })

  it('closes (dispatches setSideDrawerOpen as false) when mouse is clicked', async () => {
    render(<SideCategoriesTabsDrawer />)
    const user = userEvent.setup()
    await user.click(screen.getByText('cat1 cat2 cat3'))

    expect(dispatch.mock.calls).toHaveLength(1)
    expect(setSideDrawerOpen.mock.calls).toHaveLength(1)
    expect(setSideDrawerOpen.mock.calls[0][0]).toBe(false)
  })
})
