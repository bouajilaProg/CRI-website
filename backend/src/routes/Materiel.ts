import { Router } from 'express';
import { sqlRun } from '../db/sqlCodes/db';

const MaterielRouter = Router();

// Get all materiel with their categories
MaterielRouter.get('/', async (req, res) => {
  try {
    const data = await sqlRun("SELECT * FROM materiel AS m, category AS c WHERE m.category_id = c.category_name_id;");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'error:/' });
  }
});

// Search for materiel by name, category, and availability
MaterielRouter.post('/search', async (req, res) => {
  const { name, category, availability } = req.body;
  try {
    const data = await sqlRun(
      "SELECT * FROM materiel AS m, category AS c WHERE m.category_id = c.category_name_id AND m.materiel_name LIKE '%$1%' AND m.category_id IN $2 AND (materiel_qte > 0 OR $3);",
      [name, category, availability]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'error:/search' });
  }
});

// Get a specific materiel by ID
MaterielRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await sqlRun(
      "SELECT * FROM materiel AS m, category AS c WHERE m.category_id = c.category_name_id AND m.materiel_id = $1;",
      [id]
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'error:/:id' });
  }
});

export default MaterielRouter;
