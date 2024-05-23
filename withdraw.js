const Withdraw = () => {
  const ctx = React.useContext(UserContext);
  const currentUser = React.useContext(currentUserContext);
    const [isValid, setisValid] = React.useState(false);
  const [isWithdrawalSuccessful, setisWithdrawalSuccessful] =
    React.useState(false);
  const [warningMsg, setWarningMsg] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const continueButtonRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const { Card, Button, Form } = ReactBootstrap;

  //   Retrieves the balance of the current user
  const getBalance = () => {
    return ctx.users[currentUser.index].balance;
  };
  //Formats balance using the
  const displayBalance = () => {
    const balance = getBalance();
    return balance.toLocaleString();
  };
  // Formats the amount using the user's local settings for display purposes
  const displayAmount = () => {
    const formattedAmount = Number(amount);
    return formattedAmount.toLocaleString();
  };
  const getDate = () => {
    return new Date().toString();
  };
  // Handles the withdraw action
  const handleWithdrawal = () => {
    const user = ctx.users[currentUser.index];
    user.balance -= amount;
    user.accountHistory.push(
      `${getDate()} - Withdrawal of $${displayAmount()}`
    );
    setAmount("");
    setisWithdrawalSuccessful(true);
  };

  const handleOk = () => {
    setisWithdrawalSuccessful(false);
  };

  function checkInputParams(inputParm) {
    if (inputParm === "" || inputParm <= 0 || isNaN(inputParm)) {
      setWarningMsg("Please enter a valid number greater than 0.");
      return false;
    } else if (inputParm > getBalance()) {
      setWarningMsg("Insufficient Funds");
      return false;
    } else {
      setWarningMsg("");
      return true;
    }
  }

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setAmount(inputValue);
    if (!isNaN(inputValue) || inputValue === "") {
      if (!checkInputParams(inputValue)) {
        setisValid(false);
      } else {
        setisValid(true);
      }
    } else {
      setWarningMsg("Please enter a valid number");
      setisValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleWithdrawal();
    }
  };

  React.useEffect(() => {
    if (inputRef.current && !isWithdrawalSuccessful) {
      inputRef.current.focus();
    } else if (continueButtonRef.current && isWithdrawalSuccessful) {
      continueButtonRef.current.focus();
    }
  }, [isWithdrawalSuccessful]);

  const handleErrorMessageEnter = () => {
    setWarningMsg("");
  };

  return (
    <div>
      <Card
        style={{ height: "100vh", width: "90vw", margin: "auto" }}
        bg="info"
        text="white"
      >
        <Card.Header>Withdraw Money</Card.Header>
        <Card.Body>
          {currentUser.loginStatus ? (
            isWithdrawalSuccessful ? (
              <>
                <h2>Withdrawal Successful</h2>
                <br />
                <h2>New Balance ${displayBalance()}</h2>
                <Button
                  ref={continueButtonRef}
                  onClick={handleOk}
                  variant="light"
                  type="button"
                >
                  Continue...
                </Button>
                <h2></h2>
              </>
            ) : (
              <>
                <Form onSubmit={handleSubmit}>
                  <br />
                  <div>
                    <h1>Balance: ${displayBalance()}</h1>
                  </div>
                  <br />
                  <div>
                    <Form.Control
                      ref={inputRef}
                      onChange={handleChange}
                      value={amount}
                      type="text"
                      id="amount"
                      placeholder="Withdrawal Amount..."
                    />
                    {warningMsg && (
                      <p onClick={handleErrorMessageEnter}>{warningMsg}</p>
                    )}
                  </div>
                  <br />
                  <div>
                    <Button
                      disabled={!isValid || amount.trim() === ""}
                      variant="light"
                      type="submit"
                    >
                      Withdraw
                    </Button>
                  </div>
                </Form>
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
