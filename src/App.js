import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      user: 'user',
      items: [],
      isAuthorize: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onAuthorize = this.onAuthorize.bind(this);

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

    itemsRef.on('value', (snapshot) => {
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
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      console.log(items);
      for (let item in items) {
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
    console.log("Authorize");
    e.preventDefault();

    const user = this.state.user;
    const itemsRef = firebase.database().ref(`users/${user}`);

    itemsRef.on('value', (snapshot) => {
      console.log("user info", snapshot.val());

      // this.render();
      let val = false;
      if (snapshot.val()) {
        val = true;
      }
      this.setState({
        isAuthorize: val
      });
    });

    // console.log(itemsRef);
    // const w = itemsRef.w;
  }
  render() {
    return (
      <div className='app'>
        <header>
          <div className='wrapper'>
            <h1>Fun Food Friends</h1>

          </div>
        </header>
        <div className='container'>
          <section className='add-item'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} value={this.state.currentItem} />
              <button>Add Item</button>
            </form>
            <form onSubmit={this.onAuthorize}>
              <input type="text" name="user" placeholder="Enter you name" onChange={this.handleChange} value={this.state.user} />
              <button>Log in</button>
            </form>
          </section>
          {this.state.isAuthorize ? (
            <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {this.state.items.map((item) => {
                    return (
                      <li key={item.id}>
                        <h3>{item.title}</h3>
                        <p>Your weight: {item.user}</p>
                        <button onClick={() => this.removeItem(item.id)}>Remove Item</button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </section>
          )
            : (
              <div></div>
            )}

        </div>
      </div>
    );
  }
}

export default App;
