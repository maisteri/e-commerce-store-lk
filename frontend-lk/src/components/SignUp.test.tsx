// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignUp from '../components/SignUp'

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
    createNewUserAndLogin: jest.fn(),
  }
})
import { createNewUserAndLogin } from '../reducers/userLoginReducer'

const newUser = {
  name: 'testFirstName testLastName',
  password: 'testPassword',
  username: 'testEmail',
}

describe('<SignUp />', () => {
  it('renders correctly', () => {
    const { container } = render(<SignUp />)
    expect(container).toMatchSnapshot()
  })

  it('triggers dispatch and navigation on signup. Renders updated page after button push.', async () => {
    render(<SignUp />)

    const user = userEvent.setup()
    const firstNameInput = screen.getByLabelText(/First Name/)
    const lastNameInput = screen.getByLabelText(/Last Name/)
    const emailInput = screen.getByLabelText(/Email/)
    const passwordInput = screen.getByLabelText(/Password/)
    const signUpButton = screen.getByText('Sign Up')

    await user.type(firstNameInput, 'testFirstName')
    await user.type(lastNameInput, 'testLastName')
    await user.type(emailInput, 'testEmail')
    await user.type(passwordInput, 'testPassword')

    await user.click(signUpButton)

    expect(dispatch.mock.calls).toHaveLength(1)

    expect(createNewUserAndLogin.mock.calls).toHaveLength(1)
    expect(createNewUserAndLogin.mock.calls[0][0]).toEqual(newUser)
  })
})
