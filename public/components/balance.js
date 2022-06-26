function Balance() {
  const [balance, setBalance] = React.useState(null);
  const context = React.useContext(UserContext);

  // get user and set balance
  React.useEffect(() => {
    if (context.currentUser !== null) {
      fetch(`/find/user/${context.currentUser}`)
        .then(response => response.json())
        .then(user => {
          setBalance(user.balance);
        });
    }
  }, []);

  return (
    <Card
      bgcolor="warning"
      txtcolor="black"
      headerText="Balance"
      status=""
      body={
        context.currentUser !== null ?
        <div>
          {balance === null ? 'Loading...' : `Your available balance is: $${balance}.`}
        </div>
        :
        <div>
          You must <a href='#/login/' className="btnDeposit" data-toggle="tooltip" title="Login to your Account">Login</a> with an email and password
        </div>
      }
    />
  );
}