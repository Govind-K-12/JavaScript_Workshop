app.post("/register/", async (request, response) => {
    const { username, name, password, gender, location} = request.body;
    const hashedPassword = await bcrypt.hash(request.body.password, 10); 
    const selectUserQuery = "SELECT * FROM user WHERE username = '${username}";
    const dbuser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
    const createUserQuery = `
    INSERT INTO
      user (username, name, password, gender, location)
    VALUES
    (
    '${username}',
    '${name}',
    '${hashedPassword}',
    '${gender}',
    '${location}'
    )`;
    await db.run(createUserQuery);
    response.send('New User Created Successfully');
    } else {
    response.status = 400;
    response.send("User already exists");
    }
    });