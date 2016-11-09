# Install Dependencies

## npm install

# Run Server

## npm start

# Server API

- localhost:3000/questions
	- GET	returns all the questions
		- can use query parameters to return subset of all questions
		- example localhost:3000/questions?text=What is your favorite color?
	- POST	creates a question
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

- localhost:3000/questions/:id
	- GET	returns the question with the specified id
	- PUT	(works but not really neccessary because of 'increment' endpoint)
	- PATCH	(works but not really neccessary because of 'increment' endpoint)
	- DELETE deletes the question with the specified id

- localhost:3000/questions/:id/options/:optionId
	- GET	returns the option with the specified optionId

- localhost:3000/questions/:id/options/:optionId/increment
	- GET	increments the count of the option with the specified optionId

