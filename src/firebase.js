import firebase from 'firebase'
const config = {
	apiKey: "AIzaSyCEHORcixOIpwY0hAwE7smAmkdEPSL52kM",
	authDomain: "test-dc5f3.firebaseapp.com",
	databaseURL: "https://test-dc5f3.firebaseio.com",
	projectId: "test-dc5f3",
	storageBucket: "test-dc5f3.appspot.com",
	messagingSenderId: "566222361458"
};
firebase.initializeApp(config);
export default firebase;