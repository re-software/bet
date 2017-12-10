import * as React from 'react';
import './App.css';
import { Header } from "./Header/Header";
import { BottomBar } from "./BottomBar/BottomBar";
import { Auth } from "./Auth/Auth";
import { Log } from "./Log/Log";

import { base as firebase } from "./firebase";
import { Graph } from './Graph/Graph';
import { Results } from './Results/Results';

interface IState {
	currentItem: string;
	username: string;
	user: string;
	items: any[];
	isAuthorize: boolean;
	currentView?: string;
	weights?: any;
}
class App extends React.Component {
	state: IState;
	constructor(props: any) {
		super(props);
		const user = localStorage.getItem("bet_current_user") || "";
		this.state = {
			currentItem: '',
			username: '',
			user,
			items: [],
			isAuthorize: !!user,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onAuthorize = this.onAuthorize.bind(this);
		this.getResults();
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		const user = this.state.user;
		const itemsRef = firebase.database().ref(`users/${user}/weight`);
		const item = {
			// title: this.state.currentItem,
			data: new Date().getTime(),
			value: this.state.currentItem
		}
		itemsRef.push(item);

		itemsRef.on('value', (snapshot: any) => {
			console.log(snapshot.val());
		});

		this.setState({
			currentItem: '',
			// username: '',
			// user: ''
		});
		this.updateList();
	}
	removeItem(id) {
		const user = this.state.user;
		const itemsRef = firebase.database().ref(`users/${user}/weight/${id}`);
		itemsRef.remove();
	}
	componentDidMount() {
		this.updateList();
	}
	updateList() {
		const user = this.state.user;
		const itemsRef = firebase.database().ref(`users/${user}/weight`);
		console.log("componentDidMoutn", user);
		itemsRef.on('value', (snapshot: any) => {
			const items = snapshot.val();
			const newState = [] as any;
			console.log(items);
			for (const item in items) {
				newState.push({
					id: item,
					title: items[item].date,
					user: items[item].value
				});
			}
			console.log("newState", newState);
			this.setState({
				items: newState
			});
		});
	}
	componentDidUpdate(prevProps, prevState) {
		console.log("Update component");
	}
	onAuthorize(e) {

	}
	login = (user: string) => {
		console.log("user", user);
		user = user.toLowerCase();
		const itemsRef = firebase.database().ref(`users/${user}`);

		itemsRef.on('value', (snapshot: any) => {
			console.log("user info", snapshot.val());

			let val = false;
			if (snapshot.val()) {
				val = true;
				localStorage.setItem("bet_current_user", user);
			} else {
				user = "";
				localStorage.setItem("bet_current_user", "");
			}
			this.setState({
				isAuthorize: val,
				user
			});
		});
	}
	getResults() {
		const user = this.state.user;
		const itemsRef = firebase.database().ref(`users/${user}/weight`);

		itemsRef.on('value', (snapshot: any) => {
			console.log(snapshot.val());
			const weights = snapshot.val() as any;
			const w = [] as any;
			for (const key in weights) {
				w.push(weights[key]);
			}
			console.log(w);
			this.setState({ weights: w });
		});
	}
	getCurrentView() {
		let current = this.state.currentView as any;
		if (!this.state.isAuthorize) {
			current = "auth";
		} else {
			current = current || "graph";
		}
		const data = this.state.weights;
		const views = {
			graph: (<Graph />),
			results: (<Results data={data} />),
			log: (<Log />),
			auth: (<Auth onLogin={this.login} />)
		}
		return views[current];
	}
	handleViewChange = (val: string) => {
		if (val === this.state.currentView) {
			return;
		}
		console.log("need toggle views");
		this.setState({ currentView: val });
	}
	handleLogOut = () => {
		this.setState({ isAuthorize: false });
	}
	render() {
		return (
			<div className='app'>
				<Header onLogOut={this.handleLogOut} isAuth={this.state.isAuthorize} />
				<div className='container'>
					<section className="main_view">
						{this.getCurrentView()}
					</section>
				</div>
				{
					this.state.isAuthorize ?
						<BottomBar onChange={this.handleViewChange} />
						: null
				}
			</div>
		);
	}
}

export default App;
