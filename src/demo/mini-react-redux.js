import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from './mini-redux'

// connect 把redux中的数据链接到组件里
// connect(mapStateToProps, mapDispatchToProps)(containerName)
export const connect = (mapStateToProps=state=>state, mapDispatchToProps={}) => (WrapComponent) => {
    return class ConnectComponent extends React.Component{
        static contextTypes = {
            store: PropTypes.object
        }
        constructor(props, context){
            super(props, context)
            this.state = {
                props: {}
            }
        }
        update() {
            const {store} = this.context
            const stateProps = mapStateToProps(store.getState())
            // 方法需要dispatch
            const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
            this.setState({
                props: {
                    ...this.state.props,
                    ...stateProps,
                    ...dispatchProps
                }
            })
        }
        componentDidMount() {
            const {store} = this.context
            store.subscribe(()=>this.update())
            this.update()
        }
        render(){
            return <WrapComponent {...this.state.props} />
        }
    }
}

// provider 把store放到context里，所有的子元素都可以取到store
export class Provider extends React.Component{
    constructor(props, context){
        super(props, context)
        this.store = props.store
    }
    getChildContext(){
        return {store: this.store}
    }
    render(){
        return this.props.children
    }
}

Provider.childContextTypes = {
    store: PropTypes.object
}