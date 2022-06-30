function CreateAccount() {
  const [showForm, setShowForm] = React.useState(true);

  const formElements = ['name', 'email', 'password', 'button'];
  const bgcolor = 'primary';
  const txtcolor = 'white'
  const initialButtonMessage = 'Create a new Account'
  const successMessage = 'Account Has been created. Would you like to create another new account?'
  const successButtonText = 'Create another new account'

  //GOOG HANDLER
  //Check For Goog Info
  var req = new XMLHttpRequest();
  var url = '/path/for/goog/create';
  

req.open('GET',url,true);
req.addEventListener('load',myStartFunction);
req.addEventListener('error',onError);

req.send();

            /********
            Proposed Goog Path
            User logs in with Goog, we take that info and jam it through our app like playdough through spaghetti maker
            1. User Clicks Authentication - Sent to Goog Login ('/login')
            2. We get the info in the server index, send it here to login page
            3. Try To Login to our app with Goog Creds
              (use goog data and send it through my login path)
                A. If { Logged In to this user , done (user has already made an account)
                B. Else { Create new account with Goog Creds
                  And Attempt Login Again
            **********/
function myStartFunction() {
  console.log("createAccount.js page loaded");
  if (document.getElementById("user-display").innerText !== "Please Log In") {
    console.log("YES");
  } else {
   if (this.responseText !== ""){
    console.log("createAccount.js --> the googUser is NOT null " + this.responseText);
   var response = this.responseText;
   var parsedResponse = JSON.parse(response);
   //console.log("createAccount.js LoadCall --> " + parsedResponse);

   //fill in form data
   var nameInput = document.getElementById('name');
   //nameInput.value = parsedResponse.displayName;//this doesn't work because React doesn't trigger onChange through programmed changes, only user interactions
    // input.value = Math.random().toString(); // nope
    // This will work by calling the native setter bypassing Reacts incorrect value change check
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
      .set.call(nameInput, parsedResponse.displayName);
    // This will trigger a new render for the component
    nameInput.dispatchEvent(new Event('change', { bubbles: true }));
    console.log("goog name filled out " + parsedResponse.displayName);

   var emailInput = document.getElementById('email');
   //nameInput.value = parsedResponse.displayName;//this doesn't work because React doesn't trigger onChange through programmed changes, only user interactions
    // input.value = Math.random().toString(); // nope
    // This will work by calling the native setter bypassing Reacts incorrect value change check
    Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
      .set.call(emailInput, parsedResponse.email);
    // This will trigger a new render for the component
    emailInput.dispatchEvent(new Event('change', { bubbles: true }));

    var passInput = document.getElementById('password');
    //nameInput.value = parsedResponse.displayName;//this doesn't work because React doesn't trigger onChange through programmed changes, only user interactions
     // input.value = Math.random().toString(); // nope
     // This will work by calling the native setter bypassing Reacts incorrect value change check
     Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
       .set.call(passInput, parsedResponse.id);
     // This will trigger a new render for the component
     passInput.dispatchEvent(new Event('change', { bubbles: true }));

   document.getElementById('Submit Button').click();//smiggity smash that button
  }
}
};

function onError() {
  // handle error here, print message perhaps
  console.log('error receiving async AJAX call');
}
//END GOOG HANDLER

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
          successButtonText={<a href="/logout">{successButtonText}</a>}
        />
      }
    />
  );
}
