import React from 'react';
//import Image from 'images/test.png';

const titleObject = {
	title: 'Hello world'
}

const App: React.FC = () => (
	<div>
		<h1>{titleObject.title}</h1>
		{/* <img src={Image} /> */}
	</div>
);

export default App;