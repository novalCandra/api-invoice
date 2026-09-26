import { AuthServicesLogin, AuthServicesRegister } from "../services/auth.service.js";
export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { loginServices, token } = await AuthServicesLogin({ email, password });
        return res.status(201).json({
            status: true,
            message: "Sucess Login",
            data: loginServices,
            token: token
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};
export const RegisterController = async (req, res) => {
    try {
        const { nama, email, password, role } = req.body;
        const { createAccount } = await AuthServicesRegister({ nama, email, password, role });
        return res.status(200).json({
            status: true,
            message: "Success Create Account",
            data: createAccount
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
};
