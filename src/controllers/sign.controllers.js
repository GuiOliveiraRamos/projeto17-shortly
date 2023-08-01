export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  try {
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
