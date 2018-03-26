Font-end :

	1. Download all the files from :-
		https://github.com/introvertishan/angularjs_mplayer

	2. Put the downloaded file under a server eg: Apache

	3. Browse to the index.html page.

	You must see a page with loader and music player.

Back-end:

	1. Download the files from :
		https://github.com/introvertishan/mplayer, skip 'media/songs' folder as you will be adding the songs on your own.

	2. Download create a DB in your PostgreSQL DB.

	3. Enter the name of the table and username and password in setting.py of the project.

	4. Make sure django-rest-framework and psycopg is installed else install it using pip.

	5. Make migrations and migrate.

	6. Create super user.

	7. Run the server.

	8. Login to Django-admin Dashboard and add songs by clicking on All songs under API.

	9. To create a new user click on Users under AUTHENTICATION AND AUTHORIZATION

	10. Refresh your index.html page and you will be able to See all the songs added.
