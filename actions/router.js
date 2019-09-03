const db = require("../data/helpers/actionModel");
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
  db.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const action = await db.get(id);
    res.status(200).json(action);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { description, notes, completed } = req.body;
    const newAction = await db.insert({
      description,
      notes,
      completed
    });
    res.status(200).json(newAction);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { description, notes, completed } = req.body;
    const updatedAction = await db.update(id, {
      description,
      notes,
      completed
    });
    updatedAction
      ? res.status(200).json(updatedAction)
      : res.status(404).json({
          error: "Action not found with given id"
        });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const action = await db.remove(id);
    action
      ? res.status(200).json(true)
      : res.status(404).json({
          error: "Action not found with given id"
        });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
