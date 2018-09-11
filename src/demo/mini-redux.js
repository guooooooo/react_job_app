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