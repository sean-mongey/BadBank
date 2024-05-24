function Home() {
  const { Card } = ReactBootstrap;
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
        <Card.Header>Bad Bank</Card.Header>
        <Card.Body>
          <Card.Title>Welcome to the Bad Bank!</Card.Title>

          <div className="d-flex flex-column align-items-center">
            <img src="bank.png" className="img-fluid " alt="responsive image" />
            <br />
            <Card.Text>
              The bank that has absolutly no $$$ and even less security
            </Card.Text>
          </div>
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
}
