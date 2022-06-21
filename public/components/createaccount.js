function CreateAccount() {
  const [showForm, setShowForm] = React.useState(true);

  const formElements = ['name', 'email', 'password', 'button'];
  const bgcolor = 'primary';
  const txtcolor = 'white'
  const initialButtonMessage = 'Create a new Account'
  const successMessage = 'Account Has been created. Would you like to create another new account?'
  const successButtonText = 'Create another new account'

  return (
    <Card
      bgcolor={bgcolor}
      txtcolor={txtcolor}
      headerText="Create Account"
      body={
        showForm ? 
        <Form 
          pageName="CreateAccount"
          setShowForm={setShowForm}
          formElements={formElements}
          bgcolor={bgcolor} 
          txtcolor={txtcolor}
          initialButtonMessage={initialButtonMessage}
        /> : 
        <FormMessage
          pageName="CreateAccount"
          setShowForm={setShowForm}
          bgcolor={bgcolor}
          txtcolor={txtcolor}
          successMessage={successMessage}
          successButtonText={successButtonText}
        />
      }
    />
  );
}
