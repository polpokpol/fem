import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognitionForm from './components/FaceRecognitionForm/FaceRecognitionForm';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
 apiKey: '194e3b8ddd0f481db72d4bb2fe2dcbe2'
});


const particlesAppOptions = {
        "particles": {
          "number": {
              "value": 80,
              "density":{
                enable: true,
                value_area: 700
              }
          },
          "color":{
            "value": "#cfc"
          },
          "size": {
              "value": 3
          }
        },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": true,
                  // "mode": "repulse"
                  // uncomment to see.
              }
          }
      }
      // source: https://rpj.bembi.org/#simple and https://www.npmjs.com/package/react-particles-js
}

class App extends Component{

  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin', // the routes are: home, register, signout
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''     
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined       
    }})
    // this.setState(Object.assign(this.state.user, {
    //       id: data.id,
    //     name: data.name,
    //     email: data.email,
    //     entries: data.entries,
    //     joined: data.joined 
    // }))
    // console.log(this.state.user.name);
    // this.setState(Object.assign(this.state.user, {entries: count}))
  }


  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log);
  // }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      rightCol: width - (clarifaiFace.right_col * width)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({input: event.target.value})
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}); 
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, // https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js
      this.state.input) // common trap that is hard to debug. use input instead of ImageUrl. Read ./others/note.txt
    .then((response) => {
          if(response){
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {entries: count})) //important in the future
              })
          }
          // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
          this.displayFaceBox( this.calculateFaceLocation(response))
          .catch(e => console.log(e, 'error'))
      }
    );
    
  }

  onRouteChange = (route) =>{
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }


  render(){
    return(
    <div className="App"> 
        <Particles className="particles"
          params={particlesAppOptions}
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognitionForm box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>       
          : ( 
            this.state.route === 'signin'
            ?  <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            :  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )



        }
    </div>
    );
  }
}

export default App;
