import bcrypt from 'bcrypt';
import Admin from '../models/adminModel';
import jwt from 'jsonwebtoken';
import { secretKey } from '../middleware/jwtMiddleware';

// - - - - - - - - - - - - - - - Signup Services start - - - - - - - - - - - - - - - //
export async function signupAdminServices( username : String, password : any, firstName : String, lastName : String, email : String, superAdminEmail : String) {
    const hashedPassword = await bcrypt.hash(password, 2);

    const newAdmin = new Admin({ username, password : hashedPassword, firstName, lastName, email , superAdminEmail});

    await newAdmin.save();
    return newAdmin;
}
// - - - - - - - - - - - - - - - Signup Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Login Services start - - - - - - - - - - - - - - - //
export async function loginAdminServices(email: string, password: string) {
   
    const admin : any = await Admin.findOne({ email });

    if (!admin) {
        throw new Error('Admin not found ...');
    }

    const checkPassword = await bcrypt.compare(password, admin.password);
    if (!checkPassword) {
        throw new Error("Invalid password" );
    }

    const token = jwt.sign({ email : admin.email, id : admin._id }, secretKey, { expiresIn: '1h' });
    
    return { token };
};
// - - - - - - - - - - - - - - - Login Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Profile Services Start - - - - - - - - - - - - - - - //
export async function getAdminProfileService(email: string) {
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            throw new Error('User not found');
        }
    return admin;
    } 
    catch (error) {
        throw new Error('Invalid email');
    }
}
// - - - - - - - - - - - - - - - Get Profile Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Update Profile Services Start - - - - - - - - - - - - - - - //
export async function updateAdminProfileService(email: string, adminData: any) {
    try {
        if (adminData.password) {
            const hashedPassword = await bcrypt.hash(adminData.password, 5);
            adminData.password = hashedPassword;
        }
        
        const updatedAdminProfile = await Admin.findOneAndUpdate( { email: email }, { $set: adminData }, { new: true } );
        return updatedAdminProfile;
    } 
    catch (error) {
        throw new Error('Failed to update admin profile');
    }
}
// - - - - - - - - - - - - - - - Update Profile Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Delete Profile Services Start - - - - - - - - - - - - - - - //
export async function deleteAdminProfileService(email: string) {
    try {
        const deleteAdminProfile = await Admin.findOneAndDelete( { email } );
        return deleteAdminProfile;
    } 
    catch (error) {
        throw new Error('Failed to delete admin profile');
    }
}
// - - - - - - - - - - - - - - - Delete Profile Services end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Forget password Services Start - - - - - - - - - - - - - - - //
export async function resetAdminPasswordService(email: string, superAdminEmail: string, newPassword: string) {
    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return { success: false, message: "Admin does not exist" };
      }
      if (superAdminEmail === admin.superAdminEmail) {
        const hashedPassword = await bcrypt.hash(newPassword, 5);
        admin.password = hashedPassword;
        await admin.save();
        const token = jwt.sign({ email: admin.email }, 'secret');
        return { success: true, message: "Password updated successfully and now you are logged in!", token };
      } else {
        return { success: false, message: "Security question failed" };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: "Something went wrong" };
    }
  }
// - - - - - - - - - - - - - - - Forget password Services end - - - - - - - - - - - - - - - //
  
