function Home() {
  const { Card } = ReactBootstrap;
  return (
    <div>
    <Card style={{ height: "100vh", width: "90vw", margin: "auto" }} bg="info" text="white">
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
    <footer style={{ position: "fixed", bottom: 0, width: "100%", background: "dimGrey", color: "white", textAlign: "center", padding: "1rem" }}>
      Bad Bank
    <img src="bank.png" alt="logo" width="30" height="30" style={{ float: "right" }} />
    </footer>
</div>  
  );
}
