DEFINE SCOPE Auth
    SESSION 3d

    SIGNUP (
      INSERT INTO Users
      (email, password)
      VALUES
      ($email, crypto::argon2::generate($password))
    )

    SIGNIN (
      SELECT * FROM Users WHERE
      email = $email
      AND crypto::argon2::compare(password, $password)
    )
;

DEFINE SCOPE OAuth2
    SESSION 3d

    SIGNUP (
      INSERT INTO Users
      (email, sub, provider)
      VALUES
      ($email, crypto::argon2::generate($sub), $provider)
    )

    SIGNIN (
      SELECT * FROM Users WHERE
      email = $email
      AND crypto::argon2::compare(sub, $sub)
    )
;

DEFINE TABLE Profiles SCHEMAFULL
    PERMISSIONS
        FOR select FULL
        FOR create, update, delete WHERE user = $auth.id OR $auth.role = roles:admin;

DEFINE FIELD username ON TABLE Profiles TYPE string;
DEFINE FIELD avatar ON TABLE Profiles TYPE string;
DEFINE FIELD user ON TABLE Profiles TYPE record(Users) DEFAULT $auth.id;

DEFINE INDEX profileUsernameIndex ON TABLE Profiles COLUMNS username UNIQUE;


CREATE roles:admin SET name = "administrator";
CREATE roles:user SET name = "user";

DEFINE TABLE Users SCHEMALESS
    PERMISSIONS
        FOR select, update, delete WHERE id = $auth.id OR role = roles:admin;

DEFINE FIELD email ON TABLE Users TYPE string
    ASSERT string::is::email($value);
DEFINE FIELD sub ON TABLE Users TYPE option<string>;
DEFINE FIELD provider ON TABLE Users TYPE option<string>;
DEFINE FIELD password ON TABLE Users TYPE option<string>;
DEFINE FIELD role ON TABLE Users TYPE record(roles) DEFAULT roles:user;

DEFINE INDEX userEmailIndex ON TABLE Users COLUMNS email UNIQUE;
DEFINE INDEX userSubIndex ON TABLE Users COLUMNS sub UNIQUE;
