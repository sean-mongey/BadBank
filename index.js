const Login = window.Login;

function Spa() {
  const { useState } = React;
  const { HashRouter, Route, useHistory, useLocation } = ReactRouterDOM;

  const [activeKey, setActiveKey] = useState(window.location.pathname);

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };

  const NavBarWithRouter = () => {
    const history = useHistory();
    // const location = useLocation();

    return (
      <NavBar
        activeKey={activeKey}
        onSelect={handleSelect}
      />
    );
  };

  return (
    <HashRouter>
      <NavBar />
      <UserContext.Provider
        value={{
          users: [
            {
              name: "Milburn Pennybags",
              email: "rich_uncle_pennybags@gmail.com",
              password: "monopoly",
              balance: 1000000000000000000000000000000000000000,
              accountHistory: [],
            },{    
                name: "2",
            email: "2@2.2",
            password: "2",
            balance: 2,
            accountHistory: [],}
          ],
        }}
      >
        <Route path="/" exact component={Home} />
        <Route path="/createAccount" exact component={CreateAccount} />
        <Route path="/login" exact component={Login} />
        <Route path="/deposit" exact component={Deposit} />
        <Route path="/withdraw" exact component={Withdraw} />
        <Route path="/transactionHistory" exact component={TransactionHistory} />
      </UserContext.Provider>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));
