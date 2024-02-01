// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CategoriesTabs from '../components/CategoriesTabs'

const categories = ['cat1', 'cat2', 'cat3']

const navigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}))

const dispatch = jest.fn()
jest.mock('../hooks', () => ({
  useAppDispatch: () => dispatch,
  useAppSelector: () => categories,
}))

jest.mock('../reducers/siteGeneralReducer', () => {
  return {
    getProductsByCategory: jest.fn(),
  }
})
import { getProductsByCategory } from '../reducers/siteGeneralReducer'

describe('<CategoriesTabs />', () => {
  it('renders correctly', () => {
    const { container } = render(
      <CategoriesTabs orientation='horizontal' centered={false} />
    )
    expect(container).toMatchSnapshot()
  })

  it('triggers dispatch and navigation on tab change. Renders updated page after button push.', async () => {
    render(<CategoriesTabs orientation='horizontal' centered={false} />)

    const user = userEvent.setup()
    const button = screen.getByText('cat2')
    await user.click(button)

    expect(navigate.mock.calls).toHaveLength(1)
    expect(navigate.mock.calls[0][0]).toBe('/')

    expect(dispatch.mock.calls).toHaveLength(1)

    expect(getProductsByCategory.mock.calls).toHaveLength(1)
    expect(getProductsByCategory.mock.calls[0][0]).toBe('cat2')

    const { container } = render(
      <CategoriesTabs orientation='horizontal' centered={false} />
    )
    expect(container).toMatchSnapshot()
  })
})
