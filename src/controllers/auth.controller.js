import { Staff } from '../models/Staff.model.js';

function generateAccessAndRefreshTokens(staff){
  const accessToken = staff.generateAccessToken()
  const refreshToken = staff.generateRefreshToken();

  return {accessToken,refreshToken};
}

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


async function loginStaff(req,res) {
  const {username,password} = req.body;

  if(!username || !password){
    return res.status(400).json({message: 'Provide all the fields'});
  }
  const staff = await Staff.findOne({username});

  if(!staff){
    return res.status(401).json({message: 'User does not exists'});

  }

  const isPasswordValid = await staff.comparePassword(password);
  if(!isPasswordValid){
    return res.status(401).json({message: 'Invalid credentials'});
  }

  const {accessToken,refreshToken} = generateAccessAndRefreshTokens(staff);

  staff.refreshToken = refreshToken;
  await staff.save();
  const cookieOptions = {
    httpOnly: true,
    secure: false
  }

  return res.status(200).cookie('accessToken',accessToken,cookieOptions).json({accessToken,
    message: "User logged in successfully"
  })

}

async function logoutStaff(req,res){
    const staff = req.staff;
    console.log(staff);
    const updatedStaff = await Staff.findByIdAndUpdate(staff._id,
      {
        $set: {refreshToken: null}
    },
    {new: true}
  )

      const cookieOptions = {
    httpOnly: true,
    secure: false
  }
    res.clearCookie('accessToken',cookieOptions);


    return res.status(200).json({message: "staff logged out successfully"});
}
export { registerStaff ,loginStaff,logoutStaff};