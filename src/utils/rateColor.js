const RateColor = (rate) => {
    let rateColor = 'card__rate-movie'
    rate <= 3 ? (rateColor += ' low') : ''
    rate > 3 && rate <= 5
        ? (rateColor += ' middle')
        : ''
    rate > 5 && rate <= 7
        ? (rateColor += ' middle-height')
        : ''
    rate > 7 ? (rateColor += ' height') : ''
    return rateColor
}

export default RateColor