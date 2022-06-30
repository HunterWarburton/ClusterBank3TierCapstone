function Login(props) {
  const context = React.useContext(UserContext);

  const formElements = ['email', 'password', 'button'];
  const bgcolor = 'info';
  const txtcolor = 'white'
  const initialButtonMessage = 'Log In'
  const successMessage = 'Log In Successful!'
  const successButtonText = 'Sign Out'

  var loginFlag = false;


      //GOOG HANDLER
  //Check For Goog Info
  var reqL = new XMLHttpRequest();
  var urlL = '/path/for/goog/login';

  reqL.open('GET',urlL,true);
  reqL.addEventListener('load',myStartFunction);
  reqL.addEventListener('error',onError);

  reqL.send();

/*
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    initApplication();
  }
}*/

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
  console.log("login.js page loaded");
  if (document.getElementById("user-display").innerText !== "Please Log In") {
    loginFlag = true;//if logged in, turn off ability to continue logging in

  } else {
    loginFlag = false;//if the display name is "please Log In", then the user may log in
  }
   if (loginFlag == false){

 



    console.log("login.js --> the googUser is NOT null " + this.responseText);
   var response = this.responseText;
   var parsedResponse = JSON.parse(response);
   //console.log("Login.js LoadCall --> " + parsedResponse);

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
};

function onError() {
  // handle error here, print message perhaps
  console.log('error receiving async AJAX call');
}
//END GOOG HANDLER

    return (
    <>
    <Card
      bgcolor={bgcolor}
      txtcolor={txtcolor}
      headerText="Log In"
      body={
        context.currentUser === null ? 
          <>
          {console.log("Login.js --> form Loading")}
          <Form 
            pageName="Login"
            formElements={formElements}
            bgcolor={bgcolor} 
            txtcolor={txtcolor}
            initialButtonMessage={initialButtonMessage}
          />
          
          </>
          : 
          <FormMessage
            pageName="Login"
            bgcolor={bgcolor}
            txtcolor={txtcolor}
            successMessage={successMessage}
            successButtonText={<a href="/logout">{successButtonText}</a>}
          />
         
      }
    />
    
    </>
  );



}

/*
:
<>
{googUser.id}
{googUser.emails[0].value}
{googUser.displayName}
</>
*/