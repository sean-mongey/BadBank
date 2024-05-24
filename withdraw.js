const Withdraw = () => {
  const currentUser = React.useContext(currentUserContext);
  const ctx = React.useContext(UserContext);

  const [showWithdrawForm, setShowWithdrawForm] = React.useState(true);
  const [withdrawAmount, setWithdrawAmount] = React.useState("");
  const [withdrawFormValid, setWithdrawFormValid] = React.useState(false);
  const [lastWithdrawAmount, setLastWithdrawAmount] = React.useState(null);

  const { Card, Button, Form } = ReactBootstrap;

  const continueButtonRef = React.useRef(null);
  const withdrawInputRef = React.useRef(null);

  const getBalance = () => ctx.users[currentUser.index].balance;

  const displayBalance = () => getBalance().toLocaleString();

  const displayAmount = (amount) => Number(amount).toLocaleString();

  const getDate = () => new Date().toString();

  const handleWithdrawal = () => {
    const user = ctx.users[currentUser.index];
    user.balance -= Number(withdrawAmount);
    user.accountHistory.push(
      `${getDate()} - Withdrawal of $${displayAmount(withdrawAmount)}`
    );
    setLastWithdrawAmount(withdrawAmount);
    setWithdrawAmount("");
    setShowWithdrawForm(false);
  };

  const continueWithdrawal = () => {
    setShowWithdrawForm(true);
    setWithdrawAmount("");
  };

  const validNumber = (withdrawAmount) => /^\d*\.?\d+$/.test(withdrawAmount);

  const aboveZero = (withdrawAmount) => {
    if (!validNumber(withdrawAmount)) {
      return true; // Skip validation for non-number inputs
    }
    const numericAmount = Number(withdrawAmount);
    return numericAmount > 0;
  };

  const sufficientFunds = (withdrawAmount, userBalance) => {
    if (!validNumber(withdrawAmount)) {
      return true; // Skip validation for non-number inputs
    }
    return Number(withdrawAmount) <= userBalance;
  };

  const validateWithdrawal = () =>
    withdrawAmount.trim() !== "" &&
    validNumber(withdrawAmount) &&
    aboveZero(withdrawAmount) &&
    sufficientFunds(withdrawAmount, getBalance());

  React.useEffect(() => {
    setWithdrawFormValid(validateWithdrawal());
  }, [withdrawAmount]);

  React.useEffect(() => {
    if (showWithdrawForm) {
      withdrawInputRef.current && withdrawInputRef.current.focus();
    } else {
      continueButtonRef.current && continueButtonRef.current.focus();
    }
  }, [showWithdrawForm]);

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
          {currentUser.loginStatus ? (
            showWithdrawForm ? (
              <Form>
                <h2>Withdraw</h2>
                <h1>Balance: ${displayBalance()}</h1>
                <Form.Group controlId="formAmount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    ref={withdrawInputRef}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    value={withdrawAmount}
                    type="text"
                    id="amount"
                    placeholder="Enter Amount"
                  />
                  {withdrawAmount === "" && <p>Please enter an amount</p>}
                  {withdrawAmount && !validNumber(withdrawAmount) && (
                    <p>Please enter a valid number</p>
                  )}
                  {withdrawAmount && !aboveZero(withdrawAmount) && (
                    <p>Amount must be greater than zero</p>
                  )}
                  {withdrawAmount &&
                    !sufficientFunds(withdrawAmount, getBalance()) && (
                      <p>Insufficient funds</p>
                    )}
                </Form.Group>
                <br />

                <Button
                  disabled={!withdrawFormValid}
                  variant="light"
                  type="submit"
                  onClick={handleWithdrawal}
                >
                  Withdraw
                </Button>
              </Form>
            ) : (
              <>
                <h2>
                  Withdrawal of ${displayAmount(lastWithdrawAmount)} Successful
                </h2>
                <br />
                <h2>New Balance ${displayBalance()}</h2>
                <Button
                  ref={continueButtonRef}
                  onClick={continueWithdrawal}
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
      <footer className="fixed-bottom bg-dark text-white py-2">
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
          <a
              href="https://github.com/sean-mongey/BadBank"
              style={{ color: "white" }}
          >
            <img
              src="bank.png"
              alt="Bank Logo"
              style={{
                maxWidth: "30px",
                maxHeight: "30px",
                marginLeft: "10px",
              }}
            />
            Bad Bank
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
