import List from '../models/listModel.js';

export const createList = async (req, res) => {
  const { name, user } = req.body;
  
  try {
    const list = await List.createList(name, user);
    
    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getLists = async (req, res) => {
  const {user} = req.params;

  try {
    const lists = await List.find({ user });
    
    res.status(200).json(lists);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const addMovie = async (req, res) => {
  const {id} = req.params;
  const {movie} = req.body;

  try {
    const list = await List.add(id, movie);

    res.status(200).json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}