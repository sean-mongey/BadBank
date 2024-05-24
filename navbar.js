

function NavBar({activeKey, onSelect}) {
  const { Navbar, Nav } = ReactBootstrap;
  const { useLocation } = ReactRouterDOM;
  const location = useLocation();
  

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#">BadBank</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="mr-auto" activeKey={activeKey || `#${location.pathname}`} onSelect={onSelect}>
          <Nav.Link href="#/CreateAccount/">Create Account</Nav.Link>
          <Nav.Link href="#/login/">Login</Nav.Link>
          <Nav.Link href="#/deposit/">Deposit</Nav.Link>
          <Nav.Link href="#/withdraw/">Withdraw</Nav.Link>
          <Nav.Link href="#/transactionHistory/">Transaction History</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
