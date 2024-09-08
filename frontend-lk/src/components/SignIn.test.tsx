// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignIn from '../components/SignIn'

const navigate = jest.fn()
jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}))

const dispatch = jest.fn()
jest.mock('../hooks', () => ({
  useAppDispatch: () => dispatch,
}))

jest.mock('../reducers/userLoginReducer', () => {
  return {
    loginUser: jest.fn(),
  }
})
import { loginUser } from '../reducers/userLoginReducer'

const loggedInUser = {
  password: 'testPassword',
  username: 'testEmail',
}

describe('<SignIn />', () => {
  it('renders correctly', () => {
    const { container } = render(<SignIn />)
    expect(container).toMatchSnapshot()
  })

  it('triggers dispatch and navigation on signin', async () => {
    render(<SignIn />)

    const user = userEvent.setup()
    const emailInput = screen.getByLabelText(/Email/)
    const passwordInput = screen.getByLabelText(/Password/)
    const signInButton = screen.getByText('Sign In')

    await user.type(emailInput, 'testEmail')
    await user.type(passwordInput, 'testPassword')

    await user.click(signInButton)

    expect(dispatch.mock.calls).toHaveLength(1)

    expect(loginUser.mock.calls).toHaveLength(1)
    expect(loginUser.mock.calls[0][0].password).toEqual(loggedInUser.password)
    expect(loginUser.mock.calls[0][0].username).toEqual(loggedInUser.username)
  })

  it('link to signup works ok', async () => {
    render(<SignIn />)

    const user = userEvent.setup()
    const signUpLink = screen.getByText(/Sign Up/)

    await user.click(signUpLink)

    expect(navigate.mock.calls).toHaveLength(1)
    expect(navigate.mock.calls[0][0]).toBe('/signup')
  })
})
