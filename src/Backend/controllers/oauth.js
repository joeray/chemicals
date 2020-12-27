const axios = require('axios');

exports.oauth = function (req, res) {
  const clientID = 'c179a92372af346617e1';
  const clientSecret = 'fdee4f8992ce978ba72ad0496af104dcd1714ba2';
  const body = {
    client_id: clientID,
    client_secret: clientSecret,
    code: req.query.code,
  };
  const opts = { headers: { accept: 'application/json' } };
  axios
    .post(`https://github.com/login/oauth/access_token`, body, opts)
    .then(res => res.data['access_token'])
    .then(_token => {
      res.cookie('access-token-github', _token);
      res.redirect(`http://localhost:3000/`);
    })
    .catch(err => res.status(500).json({ message: err.message }));
};
