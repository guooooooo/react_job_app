import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import hocForm from '../../component/hoc-form/hoc-form'

@connect(
	state=>state.user,
	{register}
)
@hocForm
class Register extends Component{
	constructor(props) {
		super(props)
		// this.state = {
		// 	user: '',
		// 	pwd: '',
		// 	repeatpwd: '',
		// 	type: 'genius'
		// }
		this.handleRegister = this.handleRegister.bind(this)
	}
	componentDidMount() {
		this.props.handleChange('type', 'genius')
	}
	// handleChange(key, val){
	// 	this.setState({
	// 		[key]: val
	// 	})
	// }
	handleRegister(){
		this.props.register(this.props.state)
	}
	render(){
		const RadioItem = Radio.RadioItem
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
				<Logo></Logo>
				<WingBlank>
					<List>
						<InputItem 
							onChange={val=>{this.props.handleChange('user', val)}}
						>
							用户名
						</InputItem>						
						<InputItem 
							type='password'							
							onChange={val=>{this.props.handleChange('pwd', val)}}
						>
							密码
						</InputItem>
						<InputItem 
							type='password'							
							onChange={val=>{this.props.handleChange('repeatpwd', val)}}
						>
							确认密码
						</InputItem>
					</List>
						<WhiteSpace />
					<List>						
						<RadioItem 
							checked={this.props.state.type === 'genius'}
							onChange={()=>{this.props.handleChange('type', 'genius')}}
						>
							牛人
						</RadioItem>
						<RadioItem 
							checked={this.props.state.type === 'boss'}
							onChange={()=>{this.props.handleChange('type', 'boss')}}							
						>
							Boss
						</RadioItem>
					</List>
					<WhiteSpace />
					{this.props.msg?<p className='error_msg'>{this.props.msg}</p>:null}
					<Button type='primary' onClick={this.handleRegister}>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Register