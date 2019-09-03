const router = require("express").Router();
const db = require("../data/helpers/projectModel");

router.get("/", async (req, res) => {
  try {
    const projects = await db.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const project = await db.get(id);
    project
      ? res.status(200).json(project)
      : res.status(404).json({
          error: "Project not found with given id"
        });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, completed } = req.body;
    const newProject = await db.insert({
      name,
      description,
      completed
    });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, completed } = req.body;
    const newProject = await db.update(id, {
      name,
      description,
      completed
    });
    res.status(204).json(newProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const project = await db.remove(id);
    project
      ? res.status(202).json(true)
      : res.status(404).json({
          error: "Project not found with given id"
        });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
