import React from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'

class UserCard extends React.Component{
    static propTypes = {
        userList: PropTypes.array.isRequired
    }
    render() {
        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userList.map(v=>(
                    <div key={v._id}>
                        <Card>
                            <Card.Header
                                title={v.user}
                                thumb={require(`../img/${v.avatar}.png`)}
                                extra={<span>岗位：{v.title}</span>}
                            >
                            </Card.Header>
                            <Card.Body>
                                {v.type === 'boss' ? <div>公司：{v.company}</div> : null}
                                {v.type === 'boss' ? <div>薪资：{v.money}</div> : null}
                                {v.type === 'boss' ? <span>要求：</span> : <span>个人简介：</span>}
                                {v.desc.split('\n').map(d=>(
                                    <div key={d}>{d}</div>
                                ))}
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </WingBlank>
        )
    }
}

export default UserCard