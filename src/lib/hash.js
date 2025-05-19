import bcrypt from "bcrypt";
export const HashingService = {
    async hashPassword(password){
        return await bcrypt.hash(password, 10);
    },
    async comparePassword(password, hashPassword){
        return await bcrypt.compare(password, hashPassword)   
    }
}