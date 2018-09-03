import React from 'react'
import { connect } from 'react-redux'
// import io from 'socket.io-client'
import { List, InputItem } from 'antd-mobile'
import { getMsgList } from '../../redux/chat.redux'

// const ws = io('ws://localhost:9093')
@connect(
    state=>state,
    { getMsgList }
)
class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state={
            text: '',
            msg: []
        }
    }

    componentDidMount() {
        this.props.getMsgList()
        // ws.on('recvmsg', (data)=>{
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
    }

    handleSubmit() {
        // ws.emit('sendmsg', {text: this.state.text})
        this.setState({text: ''})
    }

    render() {
        return (
            <div>
                {this.state.msg.map(v=>(
                    <p key={v}>{v}</p>
                ))}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
                        >
                        </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat