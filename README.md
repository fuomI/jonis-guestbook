# Joni's Guestbook

## Description

This is the first project that I'm doing during the Laurea UAS Full stack development -course.

It is a guestbook web application which has a form for adding entries and a table for displaying entries.

## Requirements

### 1. Create four routes each serving different purpose
- **/ -route**
	- Homepage which greets the user
	- My homepage has a picture and description of the functionalities
- **/guestbook -route**
	- Loads the json file containing message data
	- Parses the data into a table
- **/newmessage -route**
	- Presents a form for adding messages
	- Fields include username, country and message
	- Uses bodyparser to read form data
	- Adds id, username, country, date, and message to the json file
- **/ajaxmessage -route**
	- Has it's own JavaScript code dedicated to the use of AJAX
	- AJAX(XHR) uses HTTP method POST to send data from the form to the backend
	- Backend's response is a table, which is populated with json data
	  and added below the form
	- Backend's post -route is called /guestbookdata
	
### 2. Publish to Heroku

Application is published on Heroku: https://jonis-guestbook.herokuapp.com/

### 3. Make it look nice

- I used **Pure.CSS** classes for responsive and clean look
- Added additional JavaScript code for each page, which
  checks the screen size and sets the navigation menu
  to horizontal and vertical depending on the screen size
  
## Languages

- **JavaScript**
- **HTML**
- **CSS**

## Technologies

- **Node.js**
- **Express**

## Styles

- **Pure.CSS** 

## How to run?

Application is published on Heroku: https://jonis-guestbook.herokuapp.com/