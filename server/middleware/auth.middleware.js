export function userAuthentification(req, res, next) {
  const user = req.cookies.userData;
  if (!user) return res.status(401).send({ message: "User not found" });
  else if (!req.isAuthenticated())
    return res.status(401).send({ message: "You must be logged in !" });

  console.log(`User ${user.username} is authentificated !`);
  res.status(200);
  next();
}
