const CreateAccount = () => {
  // ReactRouterDOM is used for routing in React applications
  const { useHistory } = ReactRouterDOM;
  const history = useHistory();

  // useContext is used to access context values in functional components
  const ctx = React.useContext(UserContext);
  const currentUserCtx = React.useContext(currentUserContext);

  // State variables to manage component behavior
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);
  // const [loggedIn, setLoggedIn] = React.useState(false);

  // Destructuring ReactBootstrap components
  const { Card, Button, Form, Row, Col } = ReactBootstrap;

  // Refs to manage focus on input fields and buttons
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const createButtonRef = React.useRef(null);
  const loginButtonRef = React.useRef(null);
  const createAnotherButtonRef = React.useRef(null);




  // Validates if a field is not empty
  const validate = (field, label) => {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  };

  // Capitalizes the first letter of each word in a string
  const capitalizeNames = (string) =>
    string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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

  // Handles the creation of a new user account
  const handleCreate = () => {
    const capitalizedName = capitalizeNames(name);
    console.log(capitalizedName, email, password);
    if (!validate(capitalizedName, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;

    const emailExists = ctx.users.some((user) => user.email === email);
    if (emailExists) {
      alert("Error: This email address is already linked to an existing account. Please enter a different email address, or navigate to the login page");
      clearForm();
      return;
    }

    ctx.users.push({
      name: capitalizedName,
      email,
      password,
      balance: 0,
      accountHistory: [],
    });
    setShow(false);
    updateCurrentUser("", "", "", 0, 0, false);
  };



  // Navigate to the login page
  const handleLoginButtonClick = () => {
    history.push("/login");
};

// Clears the input fields and resets the form state
const clearForm = () => {
  setName("");
  setEmail("");
  setPassword("");
  setShow(true);
  nameRef.current && nameRef.current.focus();
};


  // Validates the format of an email address using a regular expression
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Validates the overall form by checking if the name, email, and password fields are not empty
  // and if the email is in a valid format
  const validateForm = () =>
    name.trim() !== "" && validateEmail(email) && password.trim() !== "";

  // Update form validity whenever any field changes
  React.useEffect(() => {
      setFormValid(validateForm());
}, [name, email, password]);

// Set focus on the name input field if the form is visible,
// otherwise focus on the login button
React.useEffect(() => {
    if (show) {
  nameRef.current && nameRef.current.focus();
} else {
  loginButtonRef.current && loginButtonRef.current.focus();
}
}, [show]);


  return (
  <div>
    <Card style={{ height: "90vh", width: "90vw", margin: "auto" }} bg="info" text="white">
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
              {email && !validateEmail(email) && (
                <p style={{ color: "red" }}>Please enter a valid email</p>
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
            </Form.Group>
            <br />
            <Button
            className="mr-2 mb-2"
              variant="light"
              type="submit"
              onClick={handleCreate}
              disabled={!formValid}
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
        {status && <p style={{ color: "red" }}>{status}</p>}
      </Card.Body>
    </Card>
  <footer style={{ position: "fixed", bottom: 0, width: "100%", background: "dimGrey", color: "white", textAlign: "center", padding: "1rem" }}>
      Bad Bank
    <img src="bank.png" alt="logo" width="30" height="30" style={{ float: "right" }} />
    </footer>
</div>   
  );
};
