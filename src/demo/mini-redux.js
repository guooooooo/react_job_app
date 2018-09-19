export function createStore(reducer) {
    
    let currentState = {}
    let listeners = []

    function getState() {
        return currentState
    }

    function subscribe(listener) {
        listeners.push(listener)
    }

    function dispatch(action) {
        currentState = reducer(currentState, action)
        listeners.forEach(listener=>listener())
        return action
    }

    dispatch({type: '@@redux/INIT'})

    return {getState, subscribe, dispatch}

}

function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args))
}
export function bindActionCreators(creators, dispatch){
    // let bound = {}
    // Object.keys(creators).forEach(v=>{
    //     let creator = creators[v]
    //     bound[v] = bindActionCreator(creator, dispatch)
    // })
    // return bound
    // 精简
    return Object.keys(creators).reduce((ret, item)=>{
        ret[item] = bindActionCreator(creators[item], dispatch)
        return ret
    },{})
}