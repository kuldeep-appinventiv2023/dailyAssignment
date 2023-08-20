import { Request, Response } from 'express';
import { signupAdminServices ,
         loginAdminServices, 
         getAdminProfileService, 
         updateAdminProfileService, 
         deleteAdminProfileService, 
         resetAdminPasswordService } from '../services/adminService';

// - - - - - - - - - - - - - - - Signup Controller start - - - - - - - - - - - - - - - //
export async function signupAdminController(req: Request, res: Response) {
    const { username, password, firstName, lastName, email , superAdminEmail} = req.body;

    try {
        const newAdmin = await signupAdminServices(username, password, firstName, lastName, email, superAdminEmail);
        res.status(201).json({ success: true, message: 'Admin registered successfully', admin: newAdmin });
    } 
    catch (error) {
        console.error('Admin nahi bana :', error);
        res.status(500).json({ success: false, message: 'An error occurred during user registration' });
    }
}
// - - - - - - - - - - - - - - - Signup Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Login Controller start - - - - - - - - - - - - - - - //
export async function loginAdminController(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const { token } = await loginAdminServices(email, password);
        res.status(200).json({ success: true, token });
    } 
    catch (error) {
        console.error('Error during login:', error);
        res.status(401).json({ success: false, message: 'Login failed' });
    }
}
// - - - - - - - - - - - - - - - Login Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Profile Controller Start - - - - - - - - - - - - - - - //
export async function getAdminProfileController(req: Request, res: Response) {
    const email = req.body.email;
    try {
        const admin = await getAdminProfileService(email);
        res.send(admin);
    } 
    catch (error) {
        console.error('Error during fetching profile:', error);
        res.status(401).send(error);
    }
}
// - - - - - - - - - - - - - - - Get Profile Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Update Profile Controller Start - - - - - - - - - - - - - - - //
export async function updateAdminProfileController(req: Request, res: Response) {
    const adminData = req.body;
    try {
        const email = req.body.email;
        const updatedAdminProfile = await updateAdminProfileService(email, adminData);
        if (!updatedAdminProfile) {
            return res.status(404).json({ message: "Admin profile not found" });
        }
        res.status(200).json(updatedAdminProfile);
    } 
    catch (error) {
        console.error('Error during updating admin profile:', error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
// - - - - - - - - - - - - - - - Update Profile Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Delete Profile Controller Start - - - - - - - - - - - - - - - //
export async function deleteAdminProfileController(req: Request, res: Response) {
    try {
        const email = req.body.email;
        const deleteAdminProfile = await deleteAdminProfileService(email);
        if (!deleteAdminProfile) {
            return res.status(404).json({ message: "Admin profile not found" });
        }
        res.json({message: "admin deleted" , deleteAdminProfile });
    } 
    catch (error) {
        console.error('Error during deletinging admin profile:', error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
// - - - - - - - - - - - - - - - Delete Profile Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Forget Password Controller Start - - - - - - - - - - - - - - - //
export async function forgetAdminPasswordController(req: Request, res: Response) {
    const { email, superAdminEmail, newPassword } = req.body;
  
    const result = await resetAdminPasswordService(email, superAdminEmail, newPassword);
  
    if (result.success) {
      res.json({ message: result.message, token: result.token });
    } else {
      res.status(404).json({ message: result.message });
    }
}
// - - - - - - - - - - - - - - - Forget Password Controller end - - - - - - - - - - - - - - - //

