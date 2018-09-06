import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

@connect(
    state=>state
)
class Msg extends React.Component{
    render() {
        const userid = this.props.user._id
        const userinfo = this.props.chat.users
        const Item = List.Item
        const Brief = Item.Brief
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup)
        return (
            <div>
                {chatList.map(v=>{
                    const lastItem = v[v.length-1]
                    const targetId = lastItem.from === userid ? lastItem.to : lastItem.from 
                    const avatar = require(`../img/${userinfo[targetId].avatar}.png`)
                    const unreadNum = v.filter(item=>!item.read && item.to === userid).length
                    return (
                        <List key={lastItem._id}>
                            <Item  
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={avatar}
                            >
                                {userinfo[targetId].name}
                                <Brief>{lastItem.content}</Brief>
                            </Item>
                        </List>

                    )
                })}
            </div>
        )
    }
}

export default Msg