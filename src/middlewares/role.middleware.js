
function requireRole(...allowedRoles){
    return function (req,res,next){

        if(!allowedRoles.includes(req.staff.role)){
            return res.status(403).json({message: `Access denied ,Unauthorized request`})
        }
        next();
    }
}

export default requireRole