import { Role } from '@src/casl/role.enum';
import mongoose from 'mongoose';

export const currentUser = {
  _id: new mongoose.Types.ObjectId('62191e8562c13f4accaddda4'),
  username: 'kamal',
  isAdmin: false,
  roles: [Role.User],
};
