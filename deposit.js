const Deposit = () => {
  const currentUserCtx = React.useContext(currentUserContext);
  const ctx = React.useContext(UserContext);

  const [isValid, setisValid] = React.useState(false);
  const [isDepositSuccessful, setisDepositSuccessful] = React.useState(false);
  const [warningMsg, setWarningMsg] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const continueButtonRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const { Card, Button, Form } = ReactBootstrap;




// Displays the user's balance and formats the number based on the user's local settings.
 //   Retrieves the balance of the current user
 const getBalance = () => {
  return ctx.users[currentUserCtx.index].balance;
};
   //Formats balance using the user's local settings (100,000,000)
 //For display purposes only, to not interfere with validation
const displayBalance = () => {
  const balance = getBalance();
  return balance.toLocaleString();
};
  // Formats the amount using the user's local settings for display purposes
  const displayAmount = () => {
    const formattedAmount = Number(amount);
    return formattedAmount.toLocaleString();
  };
//   Returns the current date and time as a string
  const getDate = () => {
    return new Date().toString();
  };
//  Handles the deposit action
  const handleDeposit = () => {
    const user = ctx.users[currentUserCtx.index];
    user.balance += Number(amount);
    user.accountHistory.push(`${getDate()} - Deposit of $${displayAmount()}`);
    setAmount("");
    setisDepositSuccessful(true);
  };

// Handles the "OK" button click event after a successful deposit to reset deposit status
  const handleOk = () => {
    setisDepositSuccessful(false);
    setAmount("");
  };


 // Validates the input parameters for deposit amount
  const checkInputParams = (inputParm) => {
    if (inputParm === "" || inputParm <= 0 || isNaN(inputParm)) {
      setWarningMsg("Please enter a number greater than 0.");
      return false;
    } else {
      setWarningMsg("");
      return true;
    }
  };

    // Handles the change event of the deposit amount input field
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

  // Handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      handleDeposit();
    }
  };

// Sets focus on the input field or the continue button based on the deposit status
  React.useEffect(() => {
    if (inputRef.current && !isDepositSuccessful) {
      inputRef.current.focus();
    } else if (continueButtonRef.current && isDepositSuccessful) {
      continueButtonRef.current.focus();
    }
  }, [isDepositSuccessful]);

    // Clears the warning message when user enters the input field
  const handleErrorMessageEnter = () => {
    setWarningMsg(""); // Clear the error message
  };



  return (
    <div>
    <Card style={{height: "100vh", width: "90vw", margin: "auto" }} bg="info" text="white">
      <Card.Header>Deposit Money</Card.Header>
      <Card.Body>
        {currentUserCtx.loginStatus ? (
          isDepositSuccessful ? (
            <>
              <h2>Deposit Successful</h2>
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
                    placeholder="Deposit Amount..."
                  />
                  {warningMsg && (
                    <p onClick={handleErrorMessageEnter}>{warningMsg}</p>
                  )}
                </div>
                <br />
                <div>
                  <Button disabled={!isValid || amount.trim() === ""} variant="light" type="submit">
                    Deposit
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
    <footer style={{ position: "fixed", bottom: 0, width: "100%", background: "dimGrey", color: "white", textAlign: "center", padding: "1rem" }}>
      Bad Bank
    <img src="bank.png" alt="logo" width="30" height="30" style={{ float: "right" }} />
    </footer>
    </div>
  );
};