import { Router } from "express";
import users from "../data/users.js";

const usersRouter = Router();

usersRouter.get("/users", (req, res) => {
  return res.json(users);
});

usersRouter.get("/users/:id", (req, res) => {
  const userID = req.params.id;
  const userByID = users.find((user) => user.id === parseInt(userID));

  if (!userByID) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json(userByID);
});

usersRouter.post("/users", (req, res) => {
  const { firstName, lastName, telephone, address, hobbies } = req.body;

  if ((!firstName, !lastName, !telephone, !address, !hobbies)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = {
    id: users.length + 1,
    firstName,
    lastName,
    telephone,
    address,
    hobbies,
  };

  users.push(newUser);
  return res.status(201).json(newUser);
});

usersRouter.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, telephone, address, hobbies } = req.body;

  let userByID = users.find((user) => user.id === parseInt(id));
  if (!userByID) {
    return res.status(404).json({ message: "Not found" });
  }
  userByID = {
    id: userByID.id,
    firstName: firstName || userByID.firstName,
    lastName: lastName || userByID.lastName,
    telephone: telephone || userByID.telephone,
    address: address || userByID.address,
    hobbies: hobbies || userByID.hobbies,
  };
  return res.status(201).json(userByID);
});

usersRouter.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    let userByID = users.find((user) => user.id === parseInt(id));
    if (!userByID) {
      return res.status(404).json({ message: "Not found" });
    }
    const userIndex = users.indexOf(userByID);
    users.slice(userIndex, 1);

    return res.status(202).json("Deleted");
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "erreur" });
  }
});

export default usersRouter;
