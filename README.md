
# Quick Recipes - Appwrite  Database

In Quick Recipes, you can add new recipes, edit and delete them. It uses Appwrite Database to store your data.

## Preview

![App Screenshot](https://i.ibb.co/TRqDV5z/Screenshot-from-2021-09-06-18-42-59.png)

  
## Tech Stack

**Client:** HTML, Boostrap, React

**Server:** Node + Express, Appwrite (Database)

  
## Run Test

1. Install docker in your pc and install [appwrite](https://appwrite.io/) in this folder. Then open terminal and run ``cd server``. Then open another terminal and run ``cd client``.

2. Then add your project id, secret key(You can create new api key from dashboard), and API endpoint in quick-recipes/server/server.js.

3. Then create collection in your appwrite with these setting ( Set both permissions to * ) and copy your collection id to quick-recipes/server/controllers/recipeControllers.js.
[See Settings](https://ibb.co/5WCfwSBhttps://ibb.co/5WCfwSB)


4. Now in client terminal. Run the code:

```bash
  npm start
```
Again in server terminal. Run the code:

```bash
  npm start
```
 Now open your browser and go to https://localhost:3000.

 Enjoy!
  
## Developer

- [@kafle1](https://www.github.com/kafle1)

  
## Support / Contact

For support, email kafleniraj@gmail.com.

  
