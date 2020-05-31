import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {

	if(isSignedIn){
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-End'}}>
				<p onClick={()=>onRouteChange('signout')} className='zndex f3 link dim black underline pa3 pointer'>Sign Out </p>
			</nav>
		);
	}else{
		return(
			<nav style={{display: 'flex', justifyContent: 'flex-End'}}>
				<p onClick={()=>onRouteChange('signin')} className='zndex f3 link dim black underline pa3 pointer'>Sign In </p>
				<p onClick={()=>onRouteChange('register')} className='zndex f3 link dim black underline pa3 pointer'>Sign Up </p>
			</nav>

		);
	}

}

export default Navigation;