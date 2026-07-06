import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

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
    }
})

staffSchema.pre('save', async function() {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
})

export const Staff = mongoose.model('Staff',staffSchema);