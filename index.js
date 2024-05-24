function Spa() {
  const { HashRouter, Route } = ReactRouterDOM;
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
            },
            {
              name: "2",
              email: "2@2.2",
              password: "2",
              balance: 2,
              accountHistory: [],
            },
          ],
        }}
      >
        <Route path="/" exact component={Home} />
        <Route path="/createAccount" exact component={CreateAccount} />
        <Route path="/login" exact component={Login} />
        <Route path="/deposit" exact component={Deposit} />
        <Route path="/withdraw" exact component={Withdraw} />
        <Route
          path="/transactionHistory"
          exact
          component={TransactionHistory}
        />
      </UserContext.Provider>
    </HashRouter>
  );
}

ReactDOM.render(<Spa />, document.getElementById("root"));
