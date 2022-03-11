import {Button} from 'antd'
import React from 'react'

export const genresEqual = (id, genres) => {
    return genres.map(genre => {
        if (id === genre.id) {
            return (
                <Button
                    key={id}
                    size={'small'}
                    type={'default'}
                >
                <span
                    role={'button'}

                    className='movies__genres-list'
                >
                    {genre.name}
                </span>
                </Button>
            )
        }
    })
}