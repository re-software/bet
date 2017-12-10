import * as React from 'react';
import './Auth.css';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";

// import { base as firebase } from "./../firebase";
interface IState {
	username: string;
}
export class Auth extends React.Component {
	state: IState;
	props: any;
	constructor(props: any) {
		super(props);
		this.state = {
			username: ""
		}
	}
	handleChange = (e) => {
		this.setState({
			username: e.target.value
		});
	}
	handleClick = (e) => {
		console.log("btn clicked", e, this.state.username);
		this.props.onLogin(this.state.username);
	}
	componentDidUpdate(prevProps, prevState) {
		console.log("Update component");
	}
	render() {
		return (
			<Paper className="logInScreen">
				<Typography type="headline">
					Log In
				</Typography>

				<TextField
					id="name"
					label="Name"
					onChange={this.handleChange}
				/>

				<Button disabled={!this.state.username} raised color="primary" className="auth_btn" onClick={this.handleClick}>
					Ok
				</Button>
			</Paper>
		)
	}
}

// export default Auth;
