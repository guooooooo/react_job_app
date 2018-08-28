import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'

@connect(
	state=>state.user,
	{login}
)
class Login extends Component{
	constructor(props) {
		super(props)
		this.state = {
			user: '',
			pwd: ''
		}
		this.register = this.register.bind(this)
		this.handleLogin = this.handleLogin.bind(this)
	}
	register(){
		this.props.history.push('/register')
	}
	handleLogin(){
		this.props.login(this.state)
	}
	handleChange(key, val){
		this.setState({
			[key]: val
		})
	}
	render(){
		return (
			<div>
				{(this.props.redirectTo&&this.props.redirectTo!==this.props.location.pathname)?<Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<WingBlank>
					<List>
						<InputItem
							onChange={val=>{this.handleChange('user', val)}}		
						>
							用户
						</InputItem>						
						<InputItem
							type='password'														
							onChange={val=>{this.handleChange('pwd', val)}}
						>
							密码
						</InputItem>
					</List>
					{this.props.msg?<p className='error_msg'>{this.props.msg}</p>:null}
					<WhiteSpace />					
					<Button onClick={this.handleLogin} type='primary'>登录</Button>
					<WhiteSpace />
					<Button onClick={this.register} type='primary'>注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Login