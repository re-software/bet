import * as React from 'react';
import { LineChart, Line } from 'recharts';

import { base as firebase } from "./../firebase";
interface IState {
	data: any[];
	first: string;
	second: string;
}
export class Graph extends React.Component {
	state: IState;
	props: any;
	constructor(props: any) {
		super(props);
		this.state = {
			data: [],
			first: "",
			second: ""
		}
		this.getGraphData();
	}

	getGraphData() {
		const itemsRef = firebase.database().ref(`users`);
		const data = [] as any;
		const usersNames = [] as any;
		itemsRef.on('value', (snapshot: any) => {
			console.log("Users", snapshot.val());
			const users = snapshot.val();
			for (const key in users) {
				// data[key] = {};
				usersNames.push(key);

				const user = users[key];
				console.log("USER", user);

				for (const k in user.weight) {
					const dataRow = user.weight[k];
					data.push({ name: dataRow.data, value: parseFloat(dataRow.value), [key]: parseFloat(dataRow.value) });
				}
			}
			console.log("Data", data);
			// res(data);
			this.setState({
				data,
				first: usersNames[0],
				second: usersNames[1]
			})
		});
	}
	render() {
		return (
			<LineChart width={400} height={400} data={this.state.data} layout="horizontal">
				{/* <Line type="monotone" dataKey="value" stroke="#8884d8" />
				<Line type="monotone" dataKey="value2" stroke="#C0C0C0" /> */}
				<Line type="monotone" dataKey={this.state.first} stroke="#8884d8" />
				<Line type="monotone" dataKey={this.state.second} stroke="#0004d8" />
			</LineChart>
		)
	}
}
