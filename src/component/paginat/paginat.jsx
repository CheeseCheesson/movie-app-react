import React from 'react'
import { Pagination } from 'antd'

import './paginate.css'
const Paginat = ({page, totalPages, setPage}) => {
    return (
        <Pagination
          onClick={event => event.preventDefault()}
          size="small"
          defaultCurrent={page}
          total={totalPages}
          showSizeChanger={false}
          onChange={(e)=>setPage(e)}
        />
    )
}

export default Paginat
