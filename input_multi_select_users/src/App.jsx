import './App.css';
import { useEffect, useState, useRef } from 'react';
import Pill from './Pill';

function App() {
	const [searchTerm, setSearchTerm] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [selectedUserSet, setSelectedUserSet] = useState(new Set());
	const [activeSuggestion, setActiveSuggestion] = useState(0);

	const inputRef = useRef(null);
	const suggestionsRef = useRef(null);

	const fetchUsers = async (query) => {
		try {
			const res = await fetch(
				`https://dummyjson.com/users/search?q=${query}`
			);
			const data = await res.json();
			setSuggestions(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (searchTerm === '') {
			setSuggestions([]);
			return;
		}

		// Clear the previous timeout if the searchTerm changes
		if (inputRef.current) {
			clearTimeout(inputRef.current);
		}

		// Set a new timeout to debounce the API call
		inputRef.current = setTimeout(() => {
			fetchUsers(searchTerm);
		}, 500); // Delay of 500ms

		// Clean up the timeout on component unmount or if searchTerm changes
		return () => clearTimeout(inputRef.current);
	}, [searchTerm]);

	// Auto Scroll: The useEffect hook with [activeSuggestion] dependency makes sure that the active suggestion is brought into view whenever activeSuggestion changes.
	// It uses scrollIntoView with options { block: 'nearest', behavior: 'smooth' } to ensure smooth scrolling and keep the active item visible.

	useEffect(() => {
		if (suggestionsRef.current && activeSuggestion >= 0) {
			const activeItem = suggestionsRef.current.querySelector(
				`.list-item:nth-child(${activeSuggestion + 1})`
			);
			if (activeItem) {
				activeItem.scrollIntoView({
					block: 'nearest',
					behavior: 'smooth',
				});
			}
		}
	}, [activeSuggestion]);

	function handleSearchTerm(e) {
		setSearchTerm(e.target.value);
	}

	const handleSelectUser = (user) => {
		setSelectedUsers([...selectedUsers, user]);
		setSelectedUserSet(new Set([...selectedUserSet, user.email]));
		setSearchTerm('');
		setSuggestions([]);
		inputRef.current.focus();
	};

	const handleRemoveUser = (user) => {
		const updatedUsers = selectedUsers.filter(
			(selectedUser) => selectedUser.id !== user.id
		);
		setSelectedUsers(updatedUsers);

		const updatedEmails = new Set(selectedUserSet);
		updatedEmails.delete(user.email);
		setSelectedUserSet(updatedEmails);
	};

	function handleKeyDown(e) {
		if (
			e.key === 'Backspace' &&
			e.target.value === '' &&
			selectedUsers.length > 0
		) {
			const lastUser = selectedUsers[selectedUsers.length - 1];
			handleRemoveUser(lastUser);
			setSuggestions([]);
		} else if (e.key === 'ArrowDown' && suggestions?.users?.length > 0) {
			e.preventDefault();
			setActiveSuggestion((prevIndex) =>
				prevIndex < suggestions.users.length - 1 ? prevIndex + 1 : prevIndex
			);
		} else if (e.key === 'ArrowUp' && suggestions?.users?.length > 0) {
			e.preventDefault();
			setActiveSuggestion((prevIndex) =>
				prevIndex > 0 ? prevIndex - 1 : 0
			);
		} else if (
			e.key === 'Enter' &&
			activeSuggestion >= 0 &&
			activeSuggestion < suggestions.users.length
		) {
			handleSelectUser(suggestions.users[activeSuggestion]);
		}
	}

	return (
		<>
			<h1> MULTI SELECT SEARCH BAR</h1>
			<pre>
				<code>
					This is an intuitive application designed for efficient user
					search and selection. <br /> As you type in the search bar, it
					provides real-time user suggestions from a dummy API, <br />
					enabling quick and accurate user identification. The app features
					debounced search to reduce unnecessary API calls, <br /> ensuring
					a seamless experience. You can navigate suggestions using arrow
					keys or mouse scroll, and select users with the 'Enter' key or a
					click.
					<br />
					Selected users are displayed as pills above the search bar for
					easy management. Simply click on a pill to remove a user from the
					list.
				</code>
			</pre>

			<div className="user-search-container">
				<div className="user-search-input">
					{/* {PILLS} */}
					{selectedUsers.map((user) => {
						return (
							<Pill
								key={user.email}
								email={user.email}
								image={user?.image}
								text={user.firstName}
								onClick={() => handleRemoveUser(user)}
							/>
						);
					})}

					{/* {INPUT FIELD WITH SEARCH SUGGESTIONS} */}
					<div>
						<input
							ref={inputRef}
							type="text"
							value={searchTerm}
							onChange={(e) => handleSearchTerm(e)}
							placeholder="Search For a User..."
							onKeyDown={handleKeyDown}
						/>
						{/* {SEARCH  SUGGESTIONS} */}

						<ul className="suggestions-list" ref={suggestionsRef}>
							{suggestions?.users?.map((user, index) => {
								return !selectedUserSet.has(user.email) ? (
									<li
										key={user.email}
										onClick={() => handleSelectUser(user)}
										className={`list-item ${
											index === activeSuggestion ? 'active' : ''
										}`}>
										<img
											src={user.image}
											alt={`${user.firstName} ${user.lastName}`}
										/>
										<span>
											{user.firstName} {user.lastName}
										</span>
									</li>
								) : (
									<></>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
