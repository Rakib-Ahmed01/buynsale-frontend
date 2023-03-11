function saveToken(email, name) {
  fetch(`${process.env.REACT_APP_url}/users/jwt`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, name }),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem('token-bns', data.token);
    })
    .catch((err) => console.log(err));
}

export default saveToken;
