import React from 'react'
import axios from 'axios'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'

class Boss extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            data: []
        }
    }
    componentDidMount() {
        axios.get('/user/list?type=genius')
            .then(res=>{
                if (res.data.code === 0) {
                    this.setState({
                        data: res.data.data
                    }) 
                }
            })
    }
    
    render() {
        console.log(this.state.data)
        return(
            <WingBlank>
                {this.state.data.map(v=>(
                    <div key={v._id}>
                        <WhiteSpace></WhiteSpace>
                        <Card>
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            >
                            </Card.Header>
                            <Card.Body>
                                {v.desc.split('\n').map(v=>(
                                    <div key={v}>{v}</div>
                                ))}
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </WingBlank>
        )
    }
}

export default Boss