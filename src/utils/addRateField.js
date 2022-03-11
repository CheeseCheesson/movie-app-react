export const addRateField = (obj, setData) => {
    if(Object.keys(obj).length !== 0){
        return setData( (prevState) =>
            prevState.map((item) => {
                if (item.id === obj[item.id]?.id) {
                    return { ...item, rated: obj[item.id]?.rated, starsValue: obj[item.id]?.starsValue}
                }
                return item
            })
        )
    }
}