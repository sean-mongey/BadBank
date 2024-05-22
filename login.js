const Login = ({setActiveKey}) => {
  const currentUserCtx = React.useContext(currentUserContext);
  const ctx = React.useContext(UserContext);
  const [show, setShow] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoginSuccessful, setIsLoginSuccessful] = React.useState(false);
  const [isLogoutSuccessful, setIsLogoutSuccessful] = React.useState(false);
  const { Card, Button, ButtonToolbar, Form, Row, Col } = ReactBootstrap;
  const continueButtonRef = React.useRef(null);
  const emailInputRef = React.useRef(null);
  const passwordInputRef = React.useRef(null);
  const logoutButtonRef = React.useRef(null);
  const depositButtonRef = React.useRef(null);
  const withdrawButtonRef = React.useRef(null);
  const transactionHistoryButtonRef = React.useRef(null);
  // const [activeKey, setActiveKey] = React.useState(window.location.pathname);

  const { useHistory } = ReactRouterDOM;
  const history = useHistory();

  // Function to find user based on entered email and password
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

  // Function to update current user context with logged-in user details
  const updateCurrentUser = (
    name,
    email,
    password,
    balance,
    index,
    loginStatus
  ) => {
    currentUserCtx.name = name;
    currentUserCtx.email = email;
    currentUserCtx.password = password;
    currentUserCtx.balance = balance;
    currentUserCtx.index = index;
    currentUserCtx.loginStatus = loginStatus;
  };

  // Function to handle login process
  const login = () => {
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
        setShow(false);
        setIsLoginSuccessful(true);
      } else {
        updateCurrentUser("", "", "", 0, 0, false);
      }
    } else {
      alert(
        "Please check that your email and password have been entered correctly"
      );
      setIsLoginSuccessful(false);
    }
  };

  // Function to clear login form
  const clearForm = () => {
    setEmail("");
    setPassword("");
    setShow(true);
  };

  // Function to handle logout process
  const handleLogout = () => {
    updateCurrentUser("", "", "", 0, 0, false);
    clearForm();
    setIsLogoutSuccessful(true);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const forgottenPassword = (e) => {
    alert("Seriously!........");
    alert("You forgot your password!!!");
    alert("What an idiot!");
    alert("Let this be a lesson");
    alert(
      "We are keeping all the money until you get your s#*@ together and remember your details."
    );
    alert("Surley you wrote them down somewhere...");
    alert("Maybe check under the bed...?");
  };

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };
  // Navigate to the deposit page
  const handleDepositButtonClick = () => {
    history.push("/deposit");
    handleSelect("/deposit")
  };

  // Navigate to the withdraw page
  const handleWithdrawButtonClick = () => {
    history.push("/withdraw");
    handleSelect("/withdraw")
  };
  // Navigate to the withdraw page
  const handleTransactionHistoryButtonClick = () => {
    history.push("/transactionHistory");
    handleSelect("/transactionHistory")
  };

  // Effect hook to focus on logout button after successful logout
  React.useEffect(() => {
    if (isLogoutSuccessful) {
      setShow(true);
      setIsLogoutSuccessful(false);
      if (logoutButtonRef.current) {
        logoutButtonRef.current.focus();
      }
    }
  }, [isLogoutSuccessful]);

  // Effect hook to focus on email input or continue button based on login status
  React.useEffect(() => {
    if (emailInputRef.current && !isLoginSuccessful) {
      emailInputRef.current.focus();
    } else if (continueButtonRef.current && isLoginSuccessful) {
      continueButtonRef.current.focus();
    }
  }, [isLoginSuccessful]);

  return (
    <div>
    <Card style={{height: "100vh", width: "90vw", margin: "auto" }} bg="info" text="white">
      <Card.Header>
        <h2>
          {currentUserCtx.loginStatus
            ? `Welcome ${currentUserCtx.name}`
            : "Login"}
        </h2>
     
      </Card.Header>
      <Card.Body>
        {currentUserCtx.loginStatus ? (
          <div>
               <h4>What would you like to do today</h4>
            <Row>
              <Col className xs={9}>
                <ButtonToolbar justify="between">

                  <Button
                  className="mr-2 mb-2"
                    ref={depositButtonRef}
                    variant="light"
                    onClick={handleDepositButtonClick}
                    type="button"
                  >
                    Deposit
                  </Button>

                  <Button
                  className="mr-2 mb-2"
                    ref={withdrawButtonRef}
                    variant="light"
                    onClick={handleWithdrawButtonClick}
                    type="button"
                  >
                    Withdraw
                  </Button>

                  <Button
                  className="mr-2 mb-2"
                    ref={transactionHistoryButtonRef}
                    variant="light"
                    onClick={handleTransactionHistoryButtonClick}
                    type="button"
                  >
                    Transaction History
                  </Button>
                 
                  </ButtonToolbar>
              </Col>
              <Col className="text-right" xs={3}>
                <Button
                  ref={logoutButtonRef}
                  variant="light"
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </Button>
              </Col>
            </Row>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                ref={emailInputRef}
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </Form.Group>
            <br />
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                ref={passwordInputRef}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </Form.Group>
            <br />
            <Row>
              <Col xs={6}>
                <Button variant="light" type="submit" ref={continueButtonRef}>
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
        )}
      </Card.Body>
    </Card>
    <footer style={{ position: "fixed", bottom: 0, width: "100%", background: "dimGrey", color: "white" }}>
  <div className="d-flex justify-content-evenly">
    <div className="flex-grow-1 d-flex justify-content-center align-items-center">
      <a href="http://www.linkedin.com/in/sean-mongey" style={{color:"white"}}>
        <img src="linkedin.png" alt="LinkedIn" style={{ maxWidth: "40px", maxHeight: "40px" }} />
        Sean Mongey
      </a>
    </div>
    <div className="flex-grow-1 d-flex justify-content-center align-items-center">
      <a href="https://github.com/sean-mongey?tab=repositories" style={{color:"white"}}>
        <img src="github.png" alt="GitHub" style={{ maxWidth: "50px", maxHeight: "50px" }} />
        sean-mongey.github.io
      </a>
    </div>
    <div className="flex-grow-1 d-flex justify-content-center align-items-center">
      Bad Bank
      <img src="bank.png" alt="Bank Logo" style={{ maxWidth: "30px", maxHeight: "30px", marginLeft: "10px" }} />
    </div>
  </div>
</footer>
</div>  
  );
};
window.Login = Login;
