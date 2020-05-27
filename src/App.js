import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognitionForm from './components/FaceRecognitionForm/FaceRecognitionForm';
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
    }
  }

  calculateFaceLocation = (data) => {

  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({input: event.target.value})
  }


  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}); 
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input) // common trap that is hard to debug
    .then(
        function(response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
          this.calculateFaceLocation(response);
        },
        function(err) {
          // there was an error
        }
    );
  }


  render(){
    return(
    <div className="App"> 

        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}
        />
        <Particles className="particles"
              params={particlesAppOptions}

        />
        <FaceRecognitionForm imageUrl={this.state.imageUrl}/>
    </div>
    );
  }
}

export default App;
