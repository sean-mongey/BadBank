const Login = () => {
  const currentUser = React.useContext(currentUserContext);
  const ctx = React.useContext(UserContext);

  const [showLoginForm, setShowLoginForm] = React.useState(
    !currentUser.loginStatus
  );
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginFormValid, setLoginFormValid] = React.useState(false);

  const { Card, Button, Form, Row, Col } = ReactBootstrap;

  const emailInputRef = React.useRef(null);
  const loginButtonRef = React.useRef(null);
  const logoutButtonRef = React.useRef(null);

  const getUser = () => {
    const users = ctx.users;
    for (const [index, user] of Object.entries(users)) {
      if (email === user.email && password === user.password) {
        clearForm();
        return [index, user];
      }
    }
    clearForm();
    return {};
  };

  const updateCurrentUser = (
    name,
    email,
    password,
    balance,
    index,
    loginStatus
  ) => {
    currentUser.name = name;
    currentUser.email = email;
    currentUser.password = password;
    currentUser.balance = balance;
    currentUser.index = index;
    currentUser.loginStatus = loginStatus;
  };

  const userLogin = () => {
    const user = getUser();
    if (user.length > 0) {
      if (Object.keys(user[1]).length > 0) {
        updateCurrentUser(
          user[1].name,
          user[1].email,
          user[1].password,
          user[1].balance,
          user[0],
          true
        );
        setShowLoginForm(false);
        setLoginFormValid(true);
      } else {
        updateCurrentUser("", "", "", 0, 0, false);
      }
    } else {
      alert(
        "Please check that your email and password have been entered correctly"
      );
      setLoginFormValid(false);
    }
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setShowLoginForm(true);
  };

  const handleLogout = () => {
    updateCurrentUser("", "", "", 0, 0, false);
    clearForm();
  };

  const forgottenPassword = (e) => {
    alert("Seriously!........");
    alert("You forgot your password!!!");
    alert("What an idiot!");
    alert("Let this be a lesson");
    alert(
      "We are keeping all the money until you get your s#*@ together and remember your details."
    );
    alert("Surely you wrote them down somewhere...");
    alert("Maybe check under the bed...?");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    userLogin();
  };

  const validateLoginEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateLogin = () =>
    email.trim() !== "" && password.trim() !== "" && validateLoginEmail(email);

  React.useEffect(() => {
    setLoginFormValid(validateLogin());
  }, [email, password]);

  React.useEffect(() => {
    if (showLoginForm) {
      emailInputRef.current.focus();
    } else {
      logoutButtonRef.current && logoutButtonRef.current.focus();
    }
  }, [showLoginForm]);

  return (
    <div>
      <Card
        style={{
          height: "100vh",
          width: "90vw",
          margin: "auto",
          paddingTop: "4em",
        }}
        bg="info"
        text="white"
      >
        <Card.Body>
          <Card.Title>Login</Card.Title>
          {showLoginForm ? (
            <Form>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="input"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  ref={emailInputRef}
                />
                {email === "" && <p>Please enter your email</p>}
                {email && !validateLoginEmail(email) && (
                  <p>Please enter a valid email</p>
                )}
              </Form.Group>
              <br />
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
              </Form.Group>
              <br />
              <Row>
                <Col xs={6}>
                  <Button
                    className="mr-2 mb-2"
                    variant="light"
                    type="submit"
                    onClick={handleLogin}
                    disabled={!loginFormValid}
                    ref={loginButtonRef}
                  >
                    Login
                  </Button>
                </Col>
                <Col xs={6} className="text-right">
                  <Button
                    variant="light"
                    type="button"
                    onClick={forgottenPassword}
                  >
                    Forgot email/password
                  </Button>
                </Col>
              </Row>
            </Form>
          ) : (
            <Form>
              <Row>
                <Col xs={6}>
                  <h2 className="mb-2">Login Successful</h2>
                  <br />
                  <h1>Welcome {currentUser.name} to Bad Bank</h1>
                </Col>
                <Col xs={6} className="text-right mt-3">
                  <Button
                    ref={logoutButtonRef}
                    variant="light"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Col>
              </Row>
              <div className="d-flex flex-column align-items-center">
                <img
                  src="bank.png"
                  className="img-fluid"
                  alt="responsive image"
                />
                <p
                  className="text-muted"
                  style={{
                    fontSize: "0.7em",
                    fontStyle: "italic",
                    transform: "skewX(-10deg)",
                  }}
                >
                  Welcome to Bad Bank, where we excel at being the epitome of
                  badness in the banking world. Please be advised, while we
                  strive to provide the worst banking experience possible, our
                  commitment to terribleness knows no bounds. Here are some
                  important reminders/ Customer Disservice: Our customer service
                  representatives are trained to be as unhelpful and indifferent
                  as possible. Expect long wait times, confusing responses, and
                  a general sense of despair when contacting us./ Fee Frenzy:
                  Prepare for a barrage of fees at every turn. From breathing
                  too loudly near an ATM to daring to check your balance, we'll
                  find a way to charge you for it. Remember, our motto is
                  "nickel and dime until you're out of time."/ Security Theater:
                  Rest assured, your security is of little concern to us. While
                  we claim to take your privacy seriously, our security measures
                  are about as effective as a paper umbrella in a hurricane.
                  Feel free to share your PIN with strangers; it's not like
                  we'll notice./ Interest Insanity: Our interest rates are as
                  stable as a house of cards in a windstorm. Prepare for
                  fluctuations that will leave you questioning the very fabric
                  of reality. Just when you think you understand, we'll change
                  the rules without warning. Fun, isn't it?/ Fineprint Follies:
                  We've hidden more surprises in our terms and conditions than a
                  mystery novel. Make sure to read every line with a magnifying
                  glass and a lawyer on retainer. We take pride in our ability
                  to make the simple act of banking feel like solving a Rubik's
                  Cube blindfolded./ Remember, at Bad Bank, your dissatisfaction
                  is our badge of honor. So buckle up and enjoy the ride into
                  financial chaos!
                </p>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>

      <footer className="fixed-bottom bg-dark text-white py-2">
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <a
                href="http://www.linkedin.com/in/sean-mongey"
                className="text-white"
              >
                <img
                  src="linkedin.png"
                  alt="LinkedIn"
                  className="me-1"
                  style={{ maxWidth: "40px", maxHeight: "40px" }}
                />
                Sean Mongey
              </a>
            </div>
            <div className="col">
              <a
                href="https://github.com/sean-mongey?tab=repositories"
                className="text-white"
              >
                <img
                  src="github.png"
                  alt="GitHub"
                  className="me-1"
                  style={{ maxWidth: "50px", maxHeight: "50px" }}
                />
                sean-mongey.github.io
              </a>
            </div>
            <div className="col">
              Bad Bank
              <img
                src="bank.png"
                alt="Bank Logo"
                className="ms-1"
                style={{ maxWidth: "30px", maxHeight: "30px" }}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
