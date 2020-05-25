import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain-icon.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className='ma4 mt0 zndex'>
			<Tilt className="Tilt br-2 shadow-2" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
			 <div className="Tilt-inner pa3">
			  <img style={{paddingTop: '50px'}} alt='logo' src={brain}/> 
			 </div>
			</Tilt>
		</div>
	);
}

export default Logo;