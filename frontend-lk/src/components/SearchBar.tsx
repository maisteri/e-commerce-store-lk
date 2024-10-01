import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  getProductsByFilter,
  setSearchFilter,
} from '../reducers/siteGeneralReducer'
import { useDebouncedCallback } from 'use-debounce'

const Search = styled('div')(({ theme }) => {
  return {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    '& .MuiInputBase-root': {
      display: 'flex',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '40%',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
      width: '60%',
    },
  }
})

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

const SearchBar = (): JSX.Element | null => {
  const dispatch = useAppDispatch()
  const filter = useAppSelector((state) => state.general.searchFilter)
  const debounced = useDebouncedCallback((newFiltervalue) => {
    dispatch(getProductsByFilter(newFiltervalue))
  }, 1000)

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>

      <StyledInputBase
        placeholder='Search…'
        inputProps={{ 'aria-label': 'search' }}
        fullWidth
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const newFiltervalue = event.target.value
          dispatch(setSearchFilter(newFiltervalue))
          debounced(newFiltervalue)
        }}
        value={filter}
      />
    </Search>
  )
}

export default SearchBar
