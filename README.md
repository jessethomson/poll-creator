# Install Dependencies

## npm install

# Run Server

## npm start

# Server API

- localhost:3000/polls
	- GET	returns all the polls
		- can use query parameters to return subset of all polls
		- example localhost:3000/polls?text=What is your favorite color?
	- POST	creates a poll
		- body example
			{
				"text":"What is your favorite car?",
				"options": [
					{
						"text": "Chevy"
					},
					{
						"text": "Ford"
					}
				]
			}
		- return the newly created object
			- each option object will have a count properties that defaults to 0

- localhost:3000/polls/:id
	- GET	returns the poll with the specified id
	- PUT	(works but not really neccessary because of 'increment' endpoint)
	- PATCH	(works but not really neccessary because of 'increment' endpoint)
	- DELETE deletes the poll with the specified id

- localhost:3000/polls/:id/options/:optionId
	- GET	returns the option with the specified optionId

- localhost:3000/polls/:id/options/:optionId/increment
	- GET	increments the count of the option with the specified optionId

