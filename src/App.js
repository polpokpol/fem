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
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b",
      "https://samples.clarifai.com/face-det.jpg")
    .then(
        function(response) {
          console.log(response);
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
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <Particles className="particles"
              params={particlesAppOptions}

        />
        <FaceRecognitionForm />
    </div>
    );
  }
}

export default App;
