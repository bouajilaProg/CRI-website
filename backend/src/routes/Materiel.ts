import { Router } from 'express';
import { sqlRun } from '../db/db';
import { testNumber } from '../checks';

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

// Get all materiel with their categories
MaterielRouter.get('/', async (req, res) => {
  try {
    const data = await sqlRun("SELECT * FROM materiel AS m, category AS c WHERE m.category_id = c.category_name_id;");
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Search for materiel by name, category, and availabilitiy V
MaterielRouter.get('/search', async (req, res) => {

  let name = req.query.name as string;

  if (name === undefined) {
    name = "";
  }

  try {
    const data = await sqlRun(

      "SELECT * FROM materiel AS m, category AS c WHERE m.category_id = c.category_name_id AND m.materiel_name LIKE '%' || $1 || '%';",
      [name]
    );




    const categories = data.rows.map((materiel: Materiel) => materiel.category_name);

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
    }

    res.status(200).json({ materiels: data.rows, categories: removeDuplicates(categories) });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get a specific materiel by ID
MaterielRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  testNumber(parseInt(id));
  try {
    const data = await sqlRun(
      "SELECT * FROM materiel AS m, category AS c WHERE m.category_id = c.category_name_id AND m.materiel_id = $1;",
      [id]
    );
    res.status(200).json(data.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default MaterielRouter;
