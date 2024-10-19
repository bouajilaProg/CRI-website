import { Router } from 'express';
import { sqlRun } from '../db/db';

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
  available: number;
};







const MaterielRouter = Router();

// Get all materiel with their categories
MaterielRouter.get('/', async (req, res) => {
  try {
    const data = await sqlRun("SELECT * FROM materiel AS m, category AS c WHERE m.category_id = c.category_name_id;");
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).json({ error: 'error:/' });
  }
});

// Search for materiel by name, category, and availabilitiy V
MaterielRouter.post('/search', async (req, res) => {
  const { name, category, availability } = req.body as {
    name: string;
    category: string[];
    availability: boolean;
  };
  try {
    const data = await sqlRun(

      "SELECT * FROM materiel AS m, category AS c WHERE m.category_id = c.category_name_id AND m.materiel_name LIKE '%' || $1 || '%';",
      [name]
    );
    let result = data.rows;
    if (category.length != 0) {
      result = data.rows.filter((materiel: Materiel) => category.includes(materiel.category_name));
    }

    if (availability == true) {
      result = result.filter((materiel: Materiel) => materiel.available > 0);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error });
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
    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'error:/:id' });
  }
});

export default MaterielRouter;
