function TransactionHistory() {
  const currentUser = React.useContext(currentUserContext);
  const ctx = React.useContext(UserContext);
  const { Card, Row, Col, DropdownButton, Dropdown, ButtonGroup } =
    ReactBootstrap;
  const [textSize, setTextSize] = React.useState("medium");

  //   Retrieves the balance of the current user
  const getBalance = () => {
    return ctx.users[currentUser.index].balance;
  };
  //Formats balance using the user's local settings (100,000,000)
  //For display purposes only, to not interfere with validation
  const displayBalance = () => {
    const balance = getBalance();
    return balance.toLocaleString();
  };

  const handleTextSizeChange = (size) => {
    setTextSize(size);
  };

  return (
    <div>
      <Card
         style={{
          height: "100vh",
          width: "90vw",
          margin: "auto",
        }}
        bg="info"
        text="white"
      >
        <Row>
          <Col xs={6}></Col>
          <Col xs={6}>
            <DropdownButton
              className="d-flex flex-column align-items-right"
              variants="Secondary"
              as={ButtonGroup}
              title="Text Size"
              id="bg-nested-dropdown"
              onSelect={handleTextSizeChange}
            >
              <Dropdown.Item eventKey="small">Small Text</Dropdown.Item>
              <Dropdown.Item eventKey="medium">Medium Text</Dropdown.Item>
              <Dropdown.Item eventKey="large">Large Text</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Card.Body>
          {currentUser.loginStatus ? (
            <>
              <div>
                <Row>
                  <Col xs={8}>
                    <h2 style={{ marginBottom: "20px" }}>
                      Transaction History for:{" "}
                      {ctx.users[currentUser.index].name}
                    </h2>
                    <div
                      style={{
                        maxHeight: "80vh",
                        overflowY: "auto",
                        paddingRight: "15px",
                        fontSize:
                          textSize === "small"
                            ? "12px"
                            : textSize === "medium"
                            ? "15px"
                            : "18px",
                      }}
                    >
                      {ctx.users[currentUser.index].accountHistory.map(
                        (transaction, index) => {
                          const isDeposit = transaction.includes("Deposit");
                          const squareStyle = {
                            width: "14px",
                            height: "14px",
                            marginRight: "5px",
                            display: "inline-block",
                            backgroundColor: isDeposit ? "green" : "red",
                            borderRadius: "50%",
                          };
                          const textStyle = {
                            marginBottom: "14px",
                            whiteSpace: "pre-wrap",
                            fontSize: "inherit",
                            color: "white",
                          };
                          return (
                            <div key={index} style={{ marginBottom: "10px" }}>
                              <span style={squareStyle}></span>
                              <span style={textStyle}>{transaction}</span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </Col>
                  <Col xs={4}>
                    <Row>
                      <h1>Balance: ${displayBalance()}</h1>
                    </Row>
                    <Row className="d-flex flex-column align-items-center">
                      <img
                        src="bank.png"
                        className="img-fluid p-3"
                        alt="responsive image"
                      />
                    </Row>
                  </Col>
                </Row>
              </div>
            </>
          ) : (
            <div>
              <h3>Who's money are you trying to keep tabs on?</h3>
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
}
