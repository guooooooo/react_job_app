import React from 'react'
import io from 'socket.io-client'
import { List, InputItem } from 'antd-mobile'

const ws = io('ws://localhost:9093')
ws.on('recvmsg', function(data){
    console.log(data)
})

class Chat extends React.Component {
    constructor(props){
        super(props)
        this.state={
            text: ''
        }
    }

    componentDidMount() {
    }

    handleSubmit() {
        ws.emit('sendmsg', this.state)
        this.setState({text: ''})
    }

    render() {
        return (
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
        )
    }
}

export default Chat