import React from 'react'
import { Input } from 'antd'
import debounce from 'lodash.debounce'

const Search = ({ setSearchValue, placeholder}) => {
  const valueDebounced = debounce((event) => setSearchValue(event.target.value), 1500)
  return (
    <Input
      className="form-control"
      onChange={valueDebounced}
      placeholder={placeholder}
    />
  )
}

export default Search
