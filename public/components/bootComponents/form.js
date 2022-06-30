function Form(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const context = React.useContext(UserContext);
  //holder for user name when they login
  const userDisplay = document.getElementById("user-display");


  const background = props.bgcolor ? ` btn-${props.bgcolor}` : ' btn-primary';
  const buttonClass = `btn${background}`;
  


  function handleSubmit(e) {
    e.preventDefault();

    console.log('****form.js submit clicked');
    console.log(e.target.id);

    const post = (data, url) => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify(data);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      const returnData = (async () => {
        try {
          const result = await fetch(url, requestOptions);
          const data = await result.json();
          console.log(`form.js ${url} post result: `, data);
          return data;
        } catch(error) {
          console.error(`form.js ${url} post error: `, error);
        }
      })();

      
      return returnData; 
    }

    const get = async (url) => {
      try {
        console.log(`*****FROM.JS get****`);
        const result = await fetch(url);
        console.log(`FROM.JS get fetch URL ${result}`);
        const data = await result.json();
        console.log(`FROM.JS get data ${data}`);
        console.log(`form.js ${url} get result: `, data);
        //display name for context
        if (data !== null) {
        userDisplay.innerText = `Welcome, ${data.name}`;
        userDisplay.balance = data.balance;
        console.log("User's Balance: " + userDisplay.balance);
        } else {
          userDisplay.innerHTML = `Please <a href="#/login/">Log In</a>`;
        }
        
        return data;
      } catch(error) {
        console.error(`form.js ${url} get error: `, error);
      }
    }
    
    //What to do in the form, based on the Page loaded
    switch (props.pageName) {
      case 'CreateAccount':
        console.log('****form.js Attempting Creating Account');
        //Validate
        let errorCreate = "none";
        //console.log("error= " + error);
        //name
        //console.log("name= " + name);
        console.log(name);
        if(name=="") {
          
          if (errorCreate == "none") {
            alert('Name Required');
          }
          errorCreate = "Name Required";
          console.log("Name not entered")
        }
        //Email
        if(!validateEmail(email)) {
          if (errorCreate == "none") {
            alert('Invalid Email Address, Valid Email Required');
          }
          errorCreate = "Valid Email Required";
          console.log("Valid Email not entered")
        }
        //Password
        if(password=="") {
          if (errorCreate == "none") {
            alert('Password Required');
          }
          errorCreate = "Password Required";
          console.log("Password not entered")
        }

        //If There was a validation error, don't post new user credentials
        if (errorCreate !== "none") {
          console.log(errorCreate);
          setErrorMessage('User not created.');
        } else {
          post({name, email, password}, '/account/createaccount')
           .then((user) => {
             user ? props.setShowForm(false) : setErrorMessage('User not created.');
           });
           
          }
        break;
      
      case 'Login':
        //Goog Login Origin - Button ID "Goog Button"
        if (e.target.id == "Goog Button") {
          //the goog button sends for authentication, no need to put stuff here
          //except for this if statement because i had 2 buttons at one point
        } else {

        //Normal Login - Button ID "Submit Button"
        console.log('****form.js Attempting Login');
        get(`/account/login/${email}`)
          .then((user) => {
            // authenticate
            let userPassword;
            user ? userPassword = user.password : userPassword = false;
            if (userPassword === password) {
              context.setCurrentUser(user._id);
            } else {
              setErrorMessage('The Email and Password are not correct');
              return;
            }
          });
        }
        break;

      case 'Deposit':
          //Validate
          let errorDeposit = "none"; 
          //Null or 0
          console.log("amount= " + Number(amount));
          if (Number(amount) === 0) {
            alert('Deposit amount required');
            errorDeposit = "Deposit must be a positive number";
          } else if (Number(amount) <0) {
            //negative amount
            alert('Deposit amount is less than 0');
            errorDeposit = "Deposit Amount must be positive";
          }

          if (errorDeposit !== "none") {
            console.log(errorDeposit);
            setErrorMessage(errorDeposit);
          } else {
            post({currentUser: context.currentUser, amount: Number(amount)}, '/update/balance')
              .then((user) => {
                props.setShowForm({form: false, balance: user.value.balance});
                userDisplay.balance += Number(amount);
            });
        }
        break;

      case 'Withdraw':
         //Validate
         let errorWithdraw = "none";
         console.log("attempting withdraw validation");
         console.log("userDisplay.balance = " + userDisplay.balance);
         //Null or 0
         if (Number(amount) == 0) {
           alert('Withdraw amount required');
           errorWithdraw = "Withdraw Amount must be a positive number";
         } else if (Number(amount) <0) {
           //negative amount
           alert('Withdraw amount is less than 0');
           errorWithdraw = "Withdraw Amount must be positive";
         } else if (Number(amount) > userDisplay.balance) {
          console.log(Number(amount));
          //Withdraw more than balance
          alert('Withdraw amount is greater than the total balance');
          errorWithdraw = "Withdraw Amount must be less than remaining balance";
         }

         if (errorWithdraw !== "none") {
           console.log(errorWithdraw);
           setErrorMessage(errorWithdraw);
         } else {
        post({currentUser: context.currentUser, amount: Number(amount * -1)}, '/update/balance')
          .then((user) => {
            props.setShowForm({form: false, balance: user.value.balance});
            userDisplay.balance -= Number(amount);
          });
        }
        break;
    }
  }


  function validateEmail(emailField){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailField) == false) 
    {return false;}
    return true;
  }


  return (
    <form>

      {
        props.formElements.includes('name') &&
        <>
          <label htmlFor="name">Name</label><br/>
          <input 
            id="name"
            type="text" 
            className="form-control" 
            value={name} 
            onChange={e => setName(e.currentTarget.value)} 
          /><br/>
        </>
      }

      {
        props.formElements.includes('email') &&
        <>
          <label htmlFor="email">Email</label><br/>
          <input 
            id="email"
            type="email" 
            className="form-control" 
            autoComplete="email"
            value={email} 
            onChange={e => setEmail(e.currentTarget.value)} 
          /><br/>

        </>
      }

      {
        props.formElements.includes('password') &&
        <>
          <label htmlFor="password">Password</label><br/>
          <input 
            id="password"
            type="password" 
            className="form-control" 
            autoComplete="current-password"
            value={password} 
            onChange={e => setPassword(e.currentTarget.value)} 
          /><br/>
        </>
      }

      {
        props.formElements.includes('amount') &&
        <>
          <label htmlFor="amount ">{props.pageName}</label><br/>
          <input 
            id="amount"
            type="number" 
            className="form-control" 
            value={amount} 
            onChange={e => setAmount(e.currentTarget.value)} 
          /><br/>
        </>
      }

      {
        props.formElements.includes('button') &&
        <>
          <button
            id="Submit Button"
            type="submit"
            className={buttonClass}
            onClick={handleSubmit}
          >{props.initialButtonMessage}</button>
        </>
      }

      {//also make button for Goog Auth LOGIN
          props.pageName == 'Login' &&
          <>
          <br></br>
          <a href="/auth/google/login">Login with Google</a>
          {//secret name holder for goog auth}
          }
          <input
            hidden
            id="name"
            type="text" 
            className="form-control" 
            value={name} 
            onChange={e => setName(e.currentTarget.value)} 
          /><br/>
         </>
         }

        {//also make button for Goog CREATE ACCOUNT
          props.pageName == 'CreateAccount' &&
          <>
            <br></br>
            <a href="/auth/google/create">Create an Account through Google</a>
          </>
         }

      {
        errorMessage &&
        <div style={{color: "red", marginTop: "10px"}}>{errorMessage}</div>
      }

    </form>
  );
}