function Withdraw() {
  const [showForm, setShowForm] = React.useState({form: true, balance: null});
  const context = React.useContext(UserContext);
  
  const formElements = ['amount', 'button'];
  const bgcolor = 'danger';
  const txtcolor = 'black';
  const initialButtonMessage = 'Withdraw'
  const successMessage = `Your Balance is: $${showForm.balance}.`
  const successButtonText = 'Make another Withdrawal'

  return (
    <>
    <Card
      bgcolor={bgcolor}
      txtcolor={txtcolor}
      headerText="Withdraw"
      body={
        context.currentUser !== null ? (
        showForm.form ? 
          <Form 
            pageName="Withdraw"//{form.gBalance}
            setShowForm={setShowForm}
            formElements={formElements}
            bgcolor={bgcolor} 
            txtcolor={txtcolor}
            initialButtonMessage={initialButtonMessage}
          /> 
        : 
          <FormMessage
            pageName="Withdraw"
            setShowForm={setShowForm}
            bgcolor={bgcolor}
            txtcolor={txtcolor}
            successMessage={successMessage}
            successButtonText={successButtonText}
          />
        )
        :
        <div>
          Please <a href='#/login/' className="btnDeposit" data-toggle="tooltip" title="Login to your Account">Login</a> to deposit funds and check your balance. <br/><br/><br/>
				  Don't have an account? <a href="#/createaccount/" className="btnDeposit" data-toggle="tooltip" title="Create new Account"> Create a new account here...</a>. 
        </div>
      }
    />

    </>
      
  );
}