import './App.css';
import Box from './Box';
import BoxTwo from './Box2';
import BoxThree from './Box3';

function App() {
	return (
		<>
			<h1>BOX-1</h1>
			<pre>
				<code>
					This Box.js component will first filter all unique value from
					array <br />
					for ex <strong>
						array=[4, 1, 2, 3, 5, 7, 6, 1, 2, 5, 3]
					</strong>{' '}
					then only create the box element for unique value and when
					clicked <br />
					its become active and turns green and second click will uncheck
					the box
				</code>
			</pre>
			<Box />
			<br />

			<h1>BOX-2</h1>
			<pre>
				<code>
					This Box2.js component will only render element which have value
					1 and render inactive element which have value 0 <br />
					for ex <strong>array=[0, 1, 1, 0, 0, 1]</strong> will only render
					3 active box because there are 3 One's and when clicked its
					become active and turns green and second click will uncheck the
					box
				</code>
			</pre>
			<br />
			<BoxTwo />

			<h1>BOX-3</h1>
			<pre>
				<code>
					This Box3.js component will behave same as Box 1 additionally
					when all box is Selected <br />
					it will automatically start deactivating in the same order it was
					selected.
				</code>
			</pre>
			<br />
			<BoxThree />
		</>
	);
}

export default App;
