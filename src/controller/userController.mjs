import user from '../model/userModel.mjs';

function register(name, email, password) {
  let message = '';

  user.name = name;
  user.email = email;
  user.password = window.btoa(password);

  let accounts = JSON.parse(localStorage.getItem('accounts'));
  if(accounts === null) {
    accounts = user;
    accounts = [accounts];
  } else { 
    accounts = Array.from(accounts);
    if(accounts.length > 0) {
      accounts.forEach(account => {
        if (account.email === email) {
          message = 'Já existe um usuário com este e-mail... por favor inserir outro!';
        }
      });
    } else { console.log(accounts)
      if (accounts[0].email === email) {
        message = 'Já existe um usuário com este e-mail... por favor inserir outro!';
      }
    }

    if (message !== '') {
      return message;
    }

    accounts.push(user);
  }

  localStorage.setItem('accounts', JSON.stringify(accounts));

  return 'cadastrado';
}

function login(email, password) {
  let message = 'erro';
  const accountsSaves = JSON.parse(localStorage.getItem('accounts'));

  accountsSaves.forEach(account => {
    if(account.email === email && account.password === window.btoa(password)) {
      message = 'logou';
    }
  });

  return message;
}


export { login, register };
