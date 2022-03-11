import React from 'react'
import {Card, Rate, Image} from 'antd'
import {format} from 'date-fns'

const IMG_API = 'https://image.tmdb.org/t/p/w1280'
import emptyImg from '../../assets/goluboi-fon-174.jpg'
import './movie-card.css'
import RateColor from '../../utils/rateColor'
import {genresEqual} from '../../utils/genresEqual'
import {cuttingText} from '../../utils/cuttingText'

const MovieCard = ({genre_ids,
                     id,
                     overview,
                     original_title,
                     title,
                     poster_path,
                     release_date,
                     vote_average
                     , genres,
                     onStars,
                     ...rest}) => {

    return (
        <Card className="ant-card-body">
            <div className="card__image">
                <Image src={IMG_API + poster_path || emptyImg} alt="title image" className="card__img" height={'100%'}/>
            </div>
            <div className="card__content">
                <div className="card__head">
                    <h4 className='card__title'>{title || original_title}</h4>
                    <div className="card__rate">
                        <span className={RateColor(vote_average)}>{vote_average}</span>
                    </div>
                </div>
                <div
                    className='card__date'>{!release_date ? 'Date unknown' : format(new Date(release_date), 'PP')}</div>
                <div className='card__genres genre'>
                    {genre_ids.map((id) => {
                        if (genres) {
                           return genresEqual(id, genres)
                        }
                    })}
                </div>
                <div className="card__text">
                    {cuttingText(overview)+'...'}
                </div>
                <div className="card__stars-rate">
                    <Rate count={10}
                          value={rest.starsValue || 0}
                          onChange={(stars) => {
                              onStars(id, stars)
                    }}
                    />
                </div>
            </div>
        </Card>
    )
}

export default MovieCard
