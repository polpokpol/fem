import React from 'react';
import './rank.css';


const Rank = ({name, entries}) => {
	return (
		<div className='clearer'>
			<div className='white f3 center'>
				{`${name} your entry count is...`}
			</div>
			<div className='white f1'>
				{entries}
			</div>
		</div>
	);
}

export default Rank;