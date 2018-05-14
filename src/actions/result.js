export const addresult = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'addresult',
            data:  data
        })
    }
}
export const clearresult = () => {
    return (dispatch, getState) => {
        dispatch({
            type: 'clearresult'
        })
    }
}