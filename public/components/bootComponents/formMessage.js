function FormMessage(props) {
  const context = React.useContext(UserContext);
  const userDisplay = document.getElementById("user-display");

  const background = props.bgcolor ? ` btn-${props.bgcolor}` : ' btn-primary';
  const buttonClass = `btn${background}`;

  function handleSubmit() {
    switch (props.pageName) {
      case 'CreateAccount':
        props.setShowForm(true);
        break;
      case 'Deposit':
      case 'Withdraw':
        props.setShowForm({form: true, balance: null})
        break;
      case 'Login':
        console.log('Log OUT test');
        context.setCurrentUser(null);
        //display no user name
        userDisplay.innerHTML = `Please <a href="#/login/">Log In</a>`;
        break;
    }
  }

  return (
    <>
      <h5>{props.successMessage}</h5>
      <button 
        type="submit" 
        className={buttonClass} 
        onClick={handleSubmit}
      >{props.successButtonText}</button>
    </>
  )
}
