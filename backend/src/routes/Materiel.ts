import { Router } from "express";
import { sqlRun } from "../db/db";
import { testNumber } from "../checks";

//types
type Materiel = {
  materiel_id: number;
  materiel_name: string;
  category_qte: number;
  description: string;
  image_link: string;
  category_id: number;
  category_name_id: number;
  category_name: string;
  materiel_qte: number;
};

const MaterielRouter = Router();

// Get all materiel with their categories sql
MaterielRouter.get("/", async (req, res) => {
  try {
    const data = await sqlRun(
      "SELECT * FROM materiel AS m, category AS c WHERE m.category_id = c.category_name_id;",
    );
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).json({
      error: error,
      context: "Error retrieving all materials.",
    });
  }
});

// Get all materials
MaterielRouter.get("/search", async (req, res) => {
  try {
    const data = await sqlRun(
      "SELECT * FROM materiel AS m, category AS c WHERE m.category_id = c.category_name_id",
    );

    const categories = data.rows.map((materiel: Materiel) =>
      materiel.category_name
    );

    const removeDuplicates = (arr: string[]) => {
      if (arr.length === 0) {
        return arr;
      }
      let unique = [arr[0]];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] != arr[i - 1]) {
          unique.push(arr[i]);
        }
      }
      return unique;
    };

    res.status(200).json({
      materiels: data.rows,
      categories: removeDuplicates(categories),
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      context: "Error searching materials.",
    });
  }
});

// Search for materiel by name, category, and availability
MaterielRouter.get("/search/:name", async (req, res) => {
  let name = req.params.name as string;

  if (name === undefined) {
    name = "";
  }

  try {
    const data = await sqlRun(
      "SELECT * FROM materiel AS m, category AS c WHERE m.category_id = c.category_name_id AND m.materiel_name LIKE '%' || $1 || '%';",
      [name],
    );

    const categories = data.rows.map((materiel: Materiel) =>
      materiel.category_name
    );

    const removeDuplicates = (arr: string[]) => {
      if (arr.length === 0) {
        return arr;
      }
      let unique = [arr[0]];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] != arr[i - 1]) {
          unique.push(arr[i]);
        }
      }
      return unique;
    };

    res.status(200).json({
      materiels: data.rows,
      categories: removeDuplicates(categories),
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      context: "Error searching materials by name.",
    });
  }
});

// Get a specific materiel by ID
MaterielRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  testNumber(parseInt(id));
  try {
    const data = await sqlRun(
      "SELECT * FROM materiel AS m, category AS c WHERE m.category_id = c.category_name_id AND m.materiel_id = $1;",
      [id],
    );
    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.status(500).json({
      error: error,
      context: `Error retrieving material with ID: ${id}.`,
    });
  }
});

// Add new materiel
MaterielRouter.post("/add", async (req, res) => {
  try {
    const {
      materiel_name,
      materiel_qte,
      description,
      image_link,
      category_id,
    } = req.body;

    if (
      materiel_name === undefined ||
      materiel_qte === undefined ||
      description === undefined ||
      image_link === undefined ||
      category_id === undefined
    ) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    const query =
      "INSERT INTO materiel(materiel_name, materiel_qte, description, image_link, category_id) VALUES($1, $2, $3, $4, $5)";

    try {
      const result = await sqlRun(query, [
        materiel_name,
        materiel_qte,
        description,
        image_link,
        category_id,
      ]);
      res.status(201).json({ message: "Material added successfully." });
    } catch (error) {
      res.status(500).json({
        error: error,
        context: "Error adding new material.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      context: "Unexpected error during material addition.",
    });
  }
});

// Update materiel
MaterielRouter.put("/update", async (req, res) => {
  try {
    const {
      materiel_id,
      materiel_name,
      materiel_qte,
      description,
      image_link,
      category_id,
    } = req.body;

    if (
      materiel_id === undefined ||
      materiel_name === undefined ||
      materiel_qte === undefined ||
      description === undefined ||
      image_link === undefined ||
      category_id === undefined
    ) {
      res.status(400).json({ error: "Missing parameters" });
      return;
    }

    const query =
      "UPDATE materiel SET materiel_name = $1, materiel_qte = $2, description = $3, image_link = $4, category_id = $5 WHERE materiel_id = $6;";

    try {
      const result = await sqlRun(query, [
        materiel_name,
        materiel_qte,
        description,
        image_link,
        category_id,

        materiel_id,
      ]);
      res.status(200).json({ message: "Material updated successfully." });
    } catch (error) {
      res.status(500).json({
        error: error,
        context: "Error updating material.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      context: "Unexpected error during material update.",
    });
  }
});

// Delete materiel
MaterielRouter.delete("/:materiel_id", async (req, res) => {
  try {
    const { materiel_id } = req.params;

    if (materiel_id === undefined) {
      res.status(400).json({ error: "Missing material ID." });
      return;
    }

    const query = "DELETE FROM materiel WHERE materiel_id = $1";

    try {
      const result = await sqlRun(query, [materiel_id]);
      res.status(200).json({ message: "Material deleted successfully." });
    } catch (error) {
      res.status(500).json({
        error: error,
        context: "Error deleting material.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      context: "Unexpected error during material deletion.",
    });
  }
});

export default MaterielRouter;
