async function isRegistered(model, username, password) {
  console.log("Validating "+username);
  const qres = await model.findOne({
    name: username,
    password: password,
  });

  return qres;
}

module.exports = isRegistered;
