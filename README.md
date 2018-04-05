## Slick Fifths a online vinyl shop, utilizing PayPal's REST API, along with Handlebars, Node.js, and MongoDB.

### Date Created:
April 3rd, 2018

### Version of Node.js: 
v9.5.0

### Installation: 
The node modules can be installed through the command, executed exactly as show below

`npm install`

Now you must start a mongodb database server running at default port 27017.
To do this head to the directory where MongoDB is installed and run

`mongod.exe -port 27017 -dbpath 'path location'`

Where **path location** is the directory where you would like to store the database

To initialize the database from the seed directory run the following

`node populate-for-startup.js`

Testing & launch instructions: The server can be run through the command, executed exactly as show below

`npm start`

Once the server is running, you can access the webpage by going onto a web-browser, preferably Google Chrome, and going to the following URL exactly as shown below

`http://localhost:3000/`

Once on the site you can login as a admin with the following username and password

>username: admin@admin.com
>password: admin

you can also access the site not as a admin with any of the following

>username: trevor@gmail.com
>password: password

>username: michael@gmail.com
>password: password
