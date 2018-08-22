import React from 'react'
import { NavBar, InputItem, TextareaItem, WhiteSpace, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

@connect(
    state=>state.user,
    {update}
)
class BossInfo extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: '',
            avatar: ''
        }
        this.selectAvatar = this.selectAvatar.bind(this)
    }

    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    selectAvatar(imgname) {
        this.setState({
            avatar: imgname
        })
    }

    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
				{redirect&&redirect!==path?<Redirect to={this.props.redirectTo} />:null}
                <NavBar mode="dark">
                    Boss完善信息页
                </NavBar>
                <AvatarSelector
                    selectAvatar={this.selectAvatar}
                ></AvatarSelector>
				<WhiteSpace />					
                <InputItem onChange={(v)=>this.onChange('title', v)}>
                    招聘职位
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('company', v)}>
                    公司名称
                </InputItem>
                <InputItem onChange={(v)=>this.onChange('money', v)}>
                    职位薪资
                </InputItem>
                <TextareaItem 
                    title="职位要求"
                    rows={3}
                    autoHeight
                    onChange={(v)=>this.onChange('desc', v)}
                />
                <Button 
                    type="primary" 
                    style={{width: '60%', margin: '20px auto'}}
                    onClick={()=>{this.props.update(this.state)}}
                >
                    保存
                </Button>
            </div>
        )
    }
}

export default BossInfo