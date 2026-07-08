import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const staffSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['staff','admin'],
        default: 'staff'
    },
    refreshToken: {
        type: String,
        default: null,
    }
})

staffSchema.pre('save', async function() {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
})

staffSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

staffSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
        _id: this._id,
        username: this.username,
        role: this.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
)   
}

staffSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN}
    )
}

export const Staff = mongoose.model('Staff',staffSchema);