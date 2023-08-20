import { Request, Response } from 'express';
import { sendVerifyMail } from '../services/emailService';
import { signupCustomerServices,
         loginCustomerServices,
         getCustomerProfileService,
         updateCustomerProfileService,
         deleteCustomerProfileService,
         resetCustomerPasswordService,
         customerLogoutService } from '../services/customerService';

// - - - - - - - - - - - - - - - Signup Controller start - - - - - - - - - - - - - - - //
export async function signupCustomerController(req: Request, res: Response) {
    const { username, password, firstName, lastName, email, favoriteFood } = req.body;

    try {
        const newCustomer = await signupCustomerServices(username, password, firstName, lastName, email, favoriteFood);

        // Send verification email
        sendVerifyMail(firstName, email, newCustomer._id);

        res.status(201).json({ success: true, 
            message: 'Customer registered successfully. Please verify your mail', 
            customer: newCustomer
        });
    }
    catch ( error : any ) {
        console.error('Customer registration failed:', error);
        if (error.message === 'Customer already exists. Please login.') {
            res.status(400).json({ success: false, message: error.message });
        } else {
            res.status(500).json({ success: false, message: 'An error occurred during customer registration' });
        }
    }
}
// - - - - - - - - - - - - - - - Signup Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Login Controller start - - - - - - - - - - - - - - - //
export async function loginCustomerController(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const  token  = await loginCustomerServices(email, password);
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Customer login failed:', error);
        res.status(401).json({ success: false, message: 'Login failed' });
    }
}
// - - - - - - - - - - - - - - - Login Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Get Profile Controller Start - - - - - - - - - - - - - - - //
export async function getCustomerProfileController(req: Request, res: Response) {
    const email = req.body.email;
    try {
        const customer = await getCustomerProfileService(email);
        res.send(customer);
    }
    catch (error) {
        console.error('Error during fetching customer profile:', error);
        res.status(401).send(error);
    }
}
// - - - - - - - - - - - - - - - Get Profile Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Update Profile Controller Start - - - - - - - - - - - - - - - //
export async function updateCustomerProfileController(req: Request, res: Response) {
    const customerData = req.body;
    try {
        const email = req.body.email;
        const updatedCustomerProfile = await updateCustomerProfileService(email, customerData);
        if (!updatedCustomerProfile) {
            return res.status(404).json({ message: "Customer profile not found" });
        }
        res.status(200).json(updatedCustomerProfile);
    }
    catch (error) {
        console.error('Error during updating customer profile:', error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
// - - - - - - - - - - - - - - - Update Profile Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Delete Profile Controller Start - - - - - - - - - - - - - - - //
export async function deleteCustomerProfileController(req: Request, res: Response) {
    try {
        const email = req.body.email;
        const deleteCustomerProfile = await deleteCustomerProfileService(email);
        if (!deleteCustomerProfile) {
            return res.status(404).json({ message: "Customer profile not found" });
        }
        res.json({ message: "Customer deleted", deleteCustomerProfile });
    }
    catch (error) {
        console.error('Error during deleting customer profile:', error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
// - - - - - - - - - - - - - - - Delete Profile Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Forget Password Controller Start - - - - - - - - - - - - - - - //
export async function forgetCustomerPasswordController(req: Request, res: Response) {
    const { email, superAdminEmail, newPassword } = req.body;

    const result = await resetCustomerPasswordService(email, superAdminEmail, newPassword);

    if (result.success) {
        res.json({ message: result.message, token: result.token });
    } else {
        res.status(404).json({ message: result.message });
    }
}
// - - - - - - - - - - - - - - - Forget Password Controller end - - - - - - - - - - - - - - - //

// - - - - - - - - - - - - - - - Customer Logout Controller Start - - - - - - - - - - - - - - - //
export async function customerLogoutController(req: Request, res: Response) {
    try {
        const email = req.body.email;
        const result = await customerLogoutService(email);
        
        if (result.success) {
            res.status(200).json({ message: "Logout successful" });
        } else {
            res.status(500).json({ message: "Something went wrong during logout" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}
// - - - - - - - - - - - - - - - Customer Logout Controller Start - - - - - - - - - - - - - - - //