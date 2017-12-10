import * as React from 'react';
import './Results.css';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
interface IState {
	data: any[];
}
export class Results extends React.Component {
	state: IState;
	props: any;
	constructor(props: any) {
		super(props);
		this.state = {
			data: this.props.data
		}
	}
	render() {
		const data = this.state.data;
		return (
			<Paper>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Date</TableCell>
							<TableCell numeric>Weight</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((rec, i) => {
							return (
								<TableRow key={i}>
									<TableCell>{new Date(rec.data).toLocaleDateString()}</TableCell>
									<TableCell numeric>{rec.value}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}