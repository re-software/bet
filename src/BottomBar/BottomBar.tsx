import * as React from 'react';
import './BottomBar.css';


import BottomNavigation from 'material-ui/BottomNavigation/';
import BottomNavigationButton from 'material-ui/BottomNavigation/BottomNavigationButton';

import GraphIcon from 'material-ui-icons/Equalizer';
import ResultsIcon from 'material-ui-icons/Add';
import SettingsIcon from 'material-ui-icons/ViewList';


interface IState {
	value: string;
}
export class BottomBar extends React.Component {
	state: IState;
	props: any;
	constructor(props: any) {
		super(props);
		this.state = {
			value: 'graph',
		}
	}
	handleChange = (event, value) => {
		this.setState({ value });
		// [dirty]
		this.props.onChange(value);
	};
	componentDidUpdate(prevProps, prevState) {
		console.log("Update component");
	}
	render() {
		const { value } = this.state;

		return (
			<BottomNavigation value={value} showLabels className="bottomBar" onChange={this.handleChange} >
				<BottomNavigationButton label="Graph" value="graph" icon={<GraphIcon />} />
				<BottomNavigationButton label="Log weight" value="log" icon={<ResultsIcon />} />
				<BottomNavigationButton label="Results" value="results" icon={<SettingsIcon />} />
			</BottomNavigation>
		)
	}
}
