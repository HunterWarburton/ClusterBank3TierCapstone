function Login(props) {
  const context = React.useContext(UserContext);
  
  const formElements = ['email', 'password', 'button'];
  const bgcolor = 'info';
  const txtcolor = 'white'
  const initialButtonMessage = 'Log In'
  const successMessage = 'Log In Successful!'
  const successButtonText = 'Sign Out'

  return (
    <Card
      bgcolor={bgcolor}
      txtcolor={txtcolor}
      headerText="Log In"
      body={
        context.currentUser === null ? 
        <Form 
          pageName="Login"
          formElements={formElements}
          bgcolor={bgcolor} 
          txtcolor={txtcolor}
          initialButtonMessage={initialButtonMessage}
        /> : 
        <FormMessage
          pageName="Login"
          bgcolor={bgcolor}
          txtcolor={txtcolor}
          successMessage={successMessage}
          successButtonText={successButtonText}
        />
      }
    />
  );

}