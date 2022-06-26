function AllData() {
  const [data, setData] = React.useState('');

  React.useEffect(() => {
    // fetch all accounts from API
    fetch('/find/allData')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const userData = data.map(user =>
          <div key={user._id}>
            <h5>User: {user.name}</h5>
            <ul style={{listStyleType: "none", paddingLeft: "10px"}}>
              <li>ID: {user._id}</li>
              <li>Email: {user.email}</li>
              <li>Balance: ${user.balance}</li>
            </ul>
            <br/>
          </div>
        );
        setData(userData);
      });
  }, []);

  return(
    <Card
      bgcolor="dark"
      txtcolor="white"
      headerText="All Data"
      body={data}
    />
  );
}