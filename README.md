### My Work
npm install mustache
npm install jsdom

Do:
Task 3: Add email address
Task 9: Add recovery email address


Code:
# /user/:id/addEmail
router.post("/user/:id/addEmail", (req, res) => {
  db.get(`PRAGMA table_info(users)`, function(err, columns) {
    if (err) {
      console.error(err.message);
    }
    if (!columns.some(column => column.name === 'email')) {
      db.run(`ALTER TABLE users ADD COLUMN email TEXT`);
    }
  });

  const userId = req.params.id;
  const stmt = db.prepare("SELECT email FROM users WHERE id = ?");
  const email = stmt.get(userId);

  if (!email) {
    db.run("INSERT INTO users (email) VALUES (?);", [userId], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error" });
      } else {
        console.log("Successfully.");
        res.json({ message: "Email has been inserted successfully." });
      }
    });
  } else {
    res.status(400).json({ message: "Email already exists." });
  }
});

# /user/:id/changeEmail
router.patch("/user/:id/changeEmail", (req, res) => {
  const newEmail = req.body.email;
  const userId = req.params.id;

  if (newEmail.length !== 0) {
    db.run("UPDATE users SET email = ? WHERE id = ?", [newEmail, userId], (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error." });
      } else {
        console.log("Successful!!!");
        res.json({ message: "Email updated successful!!!" });
      }
    });
  } else {
    res.status(400).json({ message: "Invalid email." });
  }
});

Login Page:
<html>
  <head>
    <meta charset="UTF-8">
    <title>CPSC 462 Final</title>
  </head>
  <style>

    * {
      margin: 0;
      padding: 0;
    }
  
    a {
      text-decoration: none;
    }
  
    input,button {
      background: transparent;
      border: 0;
      outline: none;
      justify-content: center;
    }
  
    body {
      height: 100vh;
      background-size: contain;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      color: #ffffff;
    }
  
    .loginBox {
      width: 600px;
      height: 364px;
      background-color: rgb(123, 123, 123);
      margin: 100px auto;
      border-radius: 10px;
      box-shadow: 0 15px 25px 0 rgba(0, 0, 0, .6);
      padding: 40px;
      box-sizing: border-box;
    }
  
    h2 {
      text-align: center;
      color: aliceblue;
      margin-bottom: 30px;
      font-family: 'Courier New', Courier, monospace;
    }
  
    .item {
      height: 60px;
      border-bottom: 1px solid #fff;
      margin-bottom: 40px;
      position: relative;
    }
  
    .item input {
      width: 100%;
      height: 100%;
      color: #f1f1f1;
      padding-top: 30px;
      box-sizing: border-box;
      font-size: 100%;
    }
  
    .item input:focus+label,
    .item input:valid+label {
      top: 0px;
      font-size: 2px;
    }
  
    .item label {
      position: absolute;
      color: #f1f1f1;
      left: 0;
      top: 12px;
      transition: all 0.5s linear;
    }
  
    .btn {
      padding: 10px 20px;
      margin-top: 10px;
      color: #f1f1f1;
      background: #000000;
      position: relative;
      overflow: hidden;
      text-transform: uppercase;
      letter-spacing: 2px;
      justify-content: center;
    }
  
    .btn:hover {
      border-radius: 5px;
      color: rgb(0, 0, 0);
      background: #ffffff;
      box-shadow: 0 0 5px 0 #ffffff,
        0 0 25px 0 #ffffff,
        0 0 50px 0 #ffffff,
        0 0 100px 0 #ffffff;
      transition: all 1s linear;
    }
  
    .btn>span {
      position: absolute;
    }
  
    .modal {
      display: none;
      position: fixed;
        z-index: 1;
        padding-top: 100px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }
    
    .modal-content {
      background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
    }
  
  </style>

  <body>
    <h4>Log In</h4>
      <div class="loginBox">
        <h2>Welcome</h2>
        <form id="loginForm" action="/auth/login" method="post">
          <div class="item">
            <label for="">Name</label>
            <input type="text" name="name" required/>
          </div>
          <div class="item">
            <label for="">Password</label>
            <input type="password" name="password" required/>
          </div>
          <input class="btn" type="submit"/>
        </from >
    <form id="loginForm2" action="/email" method="get">
      <button class="btn">Change Email</button>
    </form>
    <script>
    </script>
  </body>
</html>






# microsocial
We're having some fun now!

Fork this, then clone that.

make a change, push to your fork, and file a PR (pull request) to this repo.

(If I don't see the PR instantly, say something chat, or text)

Please make the services live in a simply named directory (e.g. "user").

## Updates and changes 4/14

### Use those schemas for input validation (so we don't write it manually)
Take a look at ```user/routes/user.js``` and look for "validate(" To get this goodness, copy ```utils/schema.js, utils/schema-validation.js``` (you'll want to update ```docs.js``` too at least). Magic!

This implements DRY (Don't Repeat Yourself) by only specifying validation in ONE place (the schemas). The code is shorter and cleaner and less likely to break.

## Updates and changes 4/13

### BUG FIXES
* Bad status code names fixed.

### Test data for users present
* You'll see a pattern for that in ```db.js```.

### Authentication
Temporarily turned off. Probably back on in a day or so.

### Service split
Split out /auth, /docs to different route/.js files. No change elsewhere (by you) required, I think.

### watching for source changes
You know how you save a file and forget to restart the service? Not any more! Start your services with ```npm run watch``` and it will auto-restart if any source file changes (except *.db).

### Set up for pushing to production
As a Best Practice, I've moved ```TOKEN_SECRET``` into ```.env```. This means that the development version uses what you see there, and the production version (say Heroku) can have secure variables set and never checked into Github. **This is an important pattern**.

### Unprotected Paths
Imagine that we were accepting clients. Which service routes are open to non-users (i.e. guests). **Put those paths in ```unprotectedPaths.js``` in your service** Note that the keys can be "exact", "regex", or "head".

# FUTURE

## Short-term plans
### cursor/pagination of /users to show how to handle large sets
### query/sort, same
### Clean up
* Clean up common.js, make it a proper config file
* move utils and app.js to a higher level so we don't duplicate them
* better trapping of 500
### finishing authentication

### Possibles
* PATCH conflict management (requires DB change)
* PATCH "upsert" (insert if not present)
* problem+json for errors ('standard')
* A sample front end (probably in Svelte)

### Long Shots
* Role-based access control (to show how it's done)
* Add XML as an output

# BEGINNING A SERVICE 

## Beginning your service (notes)

### Get User's service / working
That will get you confident that your install is good.

Hit http://localhost:8000/ and http://localhost:8000/docs

*(Note that /docs will include ***all*** services if you write clean @swagger definitions)*

### Create your new service dir
Under the root, say "foo" service

### Copy most everything from user/ into your dir
*.js, jsdoc.json, package.json, routes/.
Don't run yet.
**All subsequent comments are about your service. You should not have to touch/modify anything in the user folder**
cd into your directory

### tweak the project name in your package.json

### Install packages
```npm install```

### tweak common.js as needed
Don't run yet

### delete all but base routes from your routes/ directory
leave ```base.js``` there.

### tweak your base page in routes/base.js
make it different

### now start your service
```node app.js```

### Profit!
You can create a new terminal in VS Code. cd into the user directory and run its service TOO.
```node app.js```
Now you're running both services simultaneously!
You can access them both (by port number) in Postman.


