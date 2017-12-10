import * as React from 'react';
import './Log.css';


// import BottomNavigation from 'material-ui-next/BottomNavigation';
// import BottomNavigationButton from 'material-ui-next/BottomNavigation/BottomNavigationButton';

// import GraphIcon from 'material-ui-icons/Equalizer';
// import ResultsIcon from 'material-ui-icons/Add';
// import SettingsIcon from 'material-ui-icons/ViewList';


interface IState {
	value: string;
}
export class Log extends React.Component {
	state: IState;
	props: any;
	constructor(props: any) {
		super(props);
		this.state = {
			value: 'results',
		}
	}
	handleChange = (event, value) => {
		this.setState({ value });
		// [dirty]
		this.props.onChange(value);
	};
	saveValues() {
		const date = new Date().getDate();
		localStorage.setItem("bet_log_date", `${date}`);
	}
	componentDidUpdate(prevProps, prevState) {
		console.log("Update component");
	}
	render() {
		// const { value } = this.state;

		return (
			// <section className='add-item'>
			// 	<form onSubmit={this.handleSubmit}>
			// 		<input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
			// 		<button>Add Item</button>
			// 	</form>
			// 	<form onSubmit={this.onAuthorize}>
			// 		<input type="text" name="user" placeholder="Enter you name" onChange={this.handleChange} value={this.state.user} />
			// 		<Button>Log in</Button>
			// 	</form>
			// </section>
			<div>Main screen</div>
		)
	}
}
