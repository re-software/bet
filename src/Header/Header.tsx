import * as React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
// import MenuIcon from 'material-ui-icons/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';
// import Switch from 'material-ui/Switch';
// import { FormControlLabel, FormGroup } from 'material-ui/Form';
import "./Header.css";

import Menu, { MenuItem } from 'material-ui/Menu';

const styles = {
	root: {
		width: '100%',
	},
	flex: {
		flex: 1,
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
};

export class Header extends React.Component {
	props: any;
	state: any = {
		auth: this.props.isAuth,
		anchorEl: null,
	};

	handleChange = (event, checked) => {
		this.setState({ auth: checked });
	};

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};
	handleRequestLogOut = () => {
		localStorage.setItem("bet_current_user", "");
		this.props.onLogOut();
		this.setState({ anchorEl: null });
	}
	handleRequestClose = () => {
		this.setState({ anchorEl: null });
	};
	handleRequestSettings = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		// const { classes } = this.props;
		const auth = this.props.isAuth;

		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);
		const classes = styles as any;
		return (
			<div className={classes.root}>

				<AppBar position="static" className="header">
					<Toolbar>
						{/* <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
							<MenuIcon />
						</IconButton> */}

						<Typography type="title" color="inherit" className="header_title">
							Bet
           				</Typography>

						{auth && (
							<div>
								<IconButton
									aria-owns={open ? 'menu-appbar' : null}
									aria-haspopup="true"
									onClick={this.handleMenu}
									color="contrast"
								>
									<AccountCircle />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={open}
									onRequestClose={this.handleRequestClose}
								>
									<MenuItem onClick={this.handleRequestSettings}>Settings</MenuItem>
									<MenuItem onClick={this.handleRequestLogOut}>Logout</MenuItem>
								</Menu>
							</div>
						)}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

// MenuAppBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(MenuAppBar);