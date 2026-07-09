
import jwt from 'jsonwebtoken'

async function isStaffAuthenticated(req,res,next){
    const token = req.cookies.accessToken ||req.headers.authorization?.split(' ')[1];

    if(!token){
        
        return res.status(401).json({message: 'Access denied. No token provided'});
    }
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);

        req.staff = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Invalid or expired token'});
    }
    
}

export default isStaffAuthenticated