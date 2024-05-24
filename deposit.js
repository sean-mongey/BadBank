const Deposit = () => {
  const currentUser = React.useContext(currentUserContext);
  const ctx = React.useContext(UserContext);

  const [showDepositForm, setShowDepositForm] = React.useState(true);
  const [depositAmount, setDepositAmount] = React.useState("");
  const [depositFormValid, setDepositFormValid] = React.useState(false);
  const [lastDepositAmount, setLastDepositAmount] = React.useState(null);

  const { Card, Button, Form } = ReactBootstrap;

  const continueButtonRef = React.useRef(null);
  const depositInputRef = React.useRef(null);

  const getBalance = () => ctx.users[currentUser.index].balance;

  const displayBalance = () => getBalance().toLocaleString();

  const displayAmount = (amount) => Number(amount).toLocaleString();

  const getDate = () => new Date().toString();

  const handleDeposit = () => {
    const user = ctx.users[currentUser.index];
    user.balance += Number(depositAmount);
    user.accountHistory.push(
      `${getDate()} - Deposit of $${displayAmount(depositAmount)}`
    );
    setLastDepositAmount(depositAmount);
    setDepositAmount("");
    setShowDepositForm(false);
  };

  const continueDeposit = () => {
    setShowDepositForm(true);
    setDepositAmount("");
  };

  const validNumber = (depositAmount) => /^\d*\.?\d+$/.test(depositAmount);

  const aboveZero = (depositAmount) => {
    if (!validNumber(depositAmount)) {
      return true; // Skip validation for non-number inputs
    }

    const numericAmount = Number(depositAmount);
    return numericAmount > 0;
  };

  const validateDeposit = () =>
    depositAmount.trim() !== "" &&
    validNumber(depositAmount) &&
    aboveZero(depositAmount);

  React.useEffect(() => {
    setDepositFormValid(validateDeposit());
  }, [depositAmount]);

  React.useEffect(() => {
    if (showDepositForm) {
      depositInputRef.current && depositInputRef.current.focus();
    } else {
      continueButtonRef.current && continueButtonRef.current.focus();
    }
  }, [showDepositForm]);

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
        <Card.Title>Deposit Money</Card.Title>
        <Card.Body>
          {currentUser.loginStatus ? (
            showDepositForm ? (
              <Form>
                <h1>Balance: ${displayBalance()}</h1>
                <Form.Group controlId="formAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    ref={depositInputRef}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    value={depositAmount}
                    type="text"
                    id="amount"
                    placeholder="Enter Amount"
                  />
                  {depositAmount === "" && <p>Please enter an amount</p>}
                  {depositAmount && !aboveZero(depositAmount) && (
                    <p>Amount must be greater than zero</p>
                  )}
                  {depositAmount && !validNumber(depositAmount) && (
                    <p>Please enter a valid number</p>
                  )}
                </Form.Group>

                <br />

                <Button
                  disabled={!depositFormValid}
                  variant="light"
                  type="submit"
                  onClick={handleDeposit}
                >
                  Deposit
                </Button>
              </Form>
            ) : (
              <>
                <h2>
                  Deposit of ${displayAmount(lastDepositAmount)} Successful
                </h2>
                <br />
                <h2>New Balance ${displayBalance()}</h2>
                <Button
                  ref={continueButtonRef}
                  onClick={continueDeposit}
                  variant="light"
                  type="button"
                >
                  Continue...
                </Button>
              </>
            )
          ) : (
            <div>
              <h2>LOGIN TO USE FEATURE</h2>
            </div>
          )}
        </Card.Body>
      </Card>
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "dimGrey",
          color: "white",
        }}
      >
        <div className="d-flex justify-content-evenly">
          <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <a
              href="http://www.linkedin.com/in/sean-mongey"
              style={{ color: "white" }}
            >
              <img
                src="linkedin.png"
                alt="LinkedIn"
                style={{ maxWidth: "40px", maxHeight: "40px" }}
              />
              Sean Mongey
            </a>
          </div>
          <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <a
              href="https://github.com/sean-mongey?tab=repositories"
              style={{ color: "white" }}
            >
              <img
                src="github.png"
                alt="GitHub"
                style={{ maxWidth: "50px", maxHeight: "50px" }}
              />
              sean-mongey.github.io
            </a>
          </div>
          <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            Bad Bank
            <img
              src="bank.png"
              alt="Bank Logo"
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                marginLeft: "10px",
              }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
};
