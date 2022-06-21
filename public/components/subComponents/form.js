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
        const result = await fetch(url);
        const data = await result.json();
        console.log(`form.js ${url} get result: `, data);
        //display name for context
        if (data !== null) {
        userDisplay.innerText = `Welcome, ${data.name}`;
        } else {
          userDisplay.innerHTML = `Please <a href="#/login/">Log In</a>`;
        }
        return data;
      } catch(error) {
        console.error(`form.js ${url} get error: `, error);
      }
    }
    
    switch (props.pageName) {
      case 'CreateAccount':
        post({name, email, password}, '/account/createaccount')
          .then((user) => {
            user ? props.setShowForm(false) : setErrorMessage('User not created.');
          });
        break;
      
      case 'Login':
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
        break;

      case 'Deposit':
        post({currentUser: context.currentUser, amount: Number(amount)}, '/update/balance')
          .then((user) => {
            props.setShowForm({form: false, balance: user.value.balance});
          });
        break;

      case 'Withdraw':
        post({currentUser: context.currentUser, amount: Number(amount * -1)}, '/update/balance')
          .then((user) => {
            props.setShowForm({form: false, balance: user.value.balance});
          });
        break;
    }
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
            type="submit"
            className={buttonClass}
            onClick={handleSubmit}
          >{props.initialButtonMessage}</button>
        </>
      }

      {
        errorMessage &&
        <div style={{color: "red", marginTop: "10px"}}>{errorMessage}</div>
      }

    </form>
  );
}
