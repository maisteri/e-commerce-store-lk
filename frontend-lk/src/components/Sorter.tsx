import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { sortingOptions } from '../utils'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setSortOrder } from '../reducers/siteGeneralReducer'
import { SortOrder } from '../types'

const Sorter = () => {
  const sortOrder = useAppSelector((state) => state.general.sortOrder)
  const dispatch = useAppDispatch()

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSortOrder(event.target.value as SortOrder))
  }

  return (
    <FormControl sx={{ m: 2, minWidth: 180 }} size='small'>
      <InputLabel id='demo-simple-select-label'>Sort by</InputLabel>
      <Select
        labelId='sort-select-label'
        id='sort-select'
        value={sortOrder}
        label='Sort by'
        onChange={handleChange}
      >
        {sortingOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default Sorter
