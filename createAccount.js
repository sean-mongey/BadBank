const CreateAccount = () => {
  const { useHistory } = ReactRouterDOM;
  const history = useHistory();

  const ctx = React.useContext(UserContext);
  const currentUserCtx = React.useContext(currentUserContext);

  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);

  const { Card, Button, Form, Row, Col } = ReactBootstrap;

  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const createButtonRef = React.useRef(null);
  const loginButtonRef = React.useRef(null);
  const createAnotherButtonRef = React.useRef(null);

  const capitalizeNames = (string) =>
    string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

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

  const handleCreate = () => {
    const capitalizedName = capitalizeNames(name);
    
    if (!capitalizedName.trim()) {
      setStatus("Error: Please enter your name");
      return;
    }
    if (!/^[A-Za-z\s]+$/.test(capitalizedName)) {
      setStatus("Error: Name cannot contain numbers or special characters");
      return;
    }
  
    if (!validateEmail(email)) {
      setStatus("Error: Please enter a valid email address");
      return;
    }
 
    if (!password.trim()) {
      setStatus("Error: Please enter a password");
      return;
    }
    if (password.length < 8) {
      setStatus("Error: Password must be at least 8 characters long");
      return;
    }
  
    // Check if email already exists
    if (ctx.users.some((user) => user.email === email)) {

      alert(
        "Error: This email address is already linked to an existing account. Please enter a new email address, or navigate to the login page"
      );
      clearForm();
      return;
    }
  
    // Push new user to context
    ctx.users.push({
      name: capitalizedName,
      email,
      password,
      balance: 0,
      accountHistory: [],
    });
  
    // Reset form and update current user
    setShow(false);
    updateCurrentUser("", "", "", 0, 0, false);
  };

  const handleLoginButtonClick = () => {
    history.push("/login");
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setShow(true);
    nameRef.current && nameRef.current.focus();
  };

  const validateName = (capitalizedName) => /^[A-Za-z\s]+$/.test(capitalizedName);
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateForm = () =>
    name.trim() !== "" && validateEmail(email) && password.trim() !== "";

  React.useEffect(() => {
    setFormValid(validateForm());
  }, [name, email, password]);

  React.useEffect(() => {
    if (show) {
      nameRef.current && nameRef.current.focus();
    } else {
      loginButtonRef.current && loginButtonRef.current.focus();
    }
  }, [show]);

  return (
    <div>
      <Card style={{ height: "95vh", width: "90vw", margin: "auto" }} bg="info" text="white">
        <Card.Body>
          <Card.Title>Create Account</Card.Title>
          {show ? (
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  ref={nameRef}
                />
                {name === "" && <p>Please enter your name</p>}
                {name && !validateName(capitalizeNames(name)) && (
                   <p>Name cannot contain numbers or special characters</p>
                )}
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  ref={emailRef}
                />
                {email === "" && <p>Please enter your email</p>}
                {email && !validateEmail(email) && (
                  <p>Please enter a valid email</p>
                )}
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  ref={passwordRef}
                />
                {password === "" && <p>Please enter a password</p>}
                {password.length > 0 && password.length < 8 && (
                  <p>Password must be at least 8 characters long</p>
                )}
              </Form.Group>
              <br />
              <Button
                className="mr-2 mb-2"
                variant="light"
                type="submit"
                onClick={handleCreate}
                disabled={!formValid || password.length < 8}
                ref={createButtonRef}
              >
                Create Account
              </Button>
            </Form>
          ) : (
            <Form>
              <h5>Account Created Successfully</h5>
              <Row>
                <Col xs={6}>
                  <Button
                    className="mr-2 mb-2"
                    variant="light"
                    onClick={handleLoginButtonClick}
                    ref={loginButtonRef}
                  >
                    Login
                  </Button>
                </Col>
                <Col xs={6} className="mb-2 text-right">
                  <Button
                    variant="light"
                    onClick={clearForm}
                    ref={createAnotherButtonRef}
                  >
                    Create Another Account
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
          {status && <p>{status}</p>}
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
