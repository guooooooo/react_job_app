import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import cookies from 'browser-cookies'
import { logout } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'

@connect(
    state=>state.user,
    {logout}
)
class User extends React.Component{
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout() {
        // console.log('logout')
        const alert = Modal.alert
        alert('注销', '确认退出登录吗???', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => {
                cookies.erase('userid')
                this.props.logout()
            } },
          ])
    }

    render() {
        const Item = List.Item
        const Brief = Item.Brief
        return this.props.user ? (
            <div>
                <Result
                    img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width: 50}} alt='' />}
                    title={this.props.user}
                    message={this.props.type === 'boss' ? this.props.company :null}
                />
                <List
                    renderHeader={()=>'简介'}
                >
                    <Item
                        multipleLine
                    >
                        {this.props.title}
                        {this.props.desc.split('\n').map(d=>
                            <Brief key={d}>{d}</Brief>
                        )}
                        {this.props.money?<Brief>薪资：{this.props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={this.props.redirectTo} />
    }
}

export default User