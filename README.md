Font-end :

1. Download all the files from :-
	https://github.com/introvertishan/angularjs_mplayer

2. Put the downloaded file under a server eg: Apache

3. Browse to the index.html page.

You must see a login page.

Back-end:

1. Download the files from :
	https://github.com/introvertishan/mplayer, skip 'media/songs' folder as you will be adding the songs on your own.

2. Create a DB in your PostgreSQL DB.

3. Enter the name of the DB table and username and password of PostgreSQL in setting.py of the project.

4. Make sure django-rest-framework and psycopg is installed else install it using pip.

5. In the root directory, create a folder name “media” and in the “media” folder create another sub-folder named “songs”.

6. Make migrations and migrate.

7. Create super user.

8. Run the server.

9. Login to Django-admin Dashboard and add songs by clicking on All songs under API.

10. To create a new user click on Users under AUTHENTICATION AND AUTHORIZATION

11. Refresh your index.html page and then login to see the list of songs.
