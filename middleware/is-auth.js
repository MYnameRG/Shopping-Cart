const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    console.log(token);
    jwt.verify(
      token,
      "secret",
      function (err, decoded) {
        if (err) {
          throw new Error("exp");
        }
      }
    );
    // const decodeToken = jwt.verify(token, "secret");
    //if(!decodeToken) return res.status(500).json({ message: 'Invalid token' });

    // if(decodeToken.role === 'admin') {
    //     req.role = 'admin';
    // }
    // else if(decodeToken.role === 'user') {
    //     req.role = 'user';
    // }

    // req.id = decodeToken.id;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};