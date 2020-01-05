import { Document, Schema, Model, model} from 'mongoose';
import { IUser } from '../interfaces/iuser';


export interface IUserModel extends IUser, Document {
    fullName(): string;
}
  
export var UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    birthDate: { type: Date, required: true }
}, { timestamps: true });


UserSchema.methods.fullName = function(): String {
    return (this.name.trim() + ' ' + this.lastName.trim());
};
  
export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);