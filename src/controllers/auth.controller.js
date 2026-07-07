import { Staff } from '../models/Staff.model.js';

async function registerStaff(req, res) {
    console.log(`Register route hit`)
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Provide all the fields' });
    }

    const alreadyExists = await Staff.findOne({ username });
    if (alreadyExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const role = 'staff'; // hardcoded — public registration can never self-assign admin

    const registerUser = await Staff.create({ username, password, role });

    return res.status(201).json({ message: 'User successfully created', id: registerUser._id });

  } catch (error) {
    console.error(`Error registering user: ${error.message}`);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

export { registerStaff };