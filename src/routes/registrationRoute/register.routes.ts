import express,{Request, Response} from "express";
import databaseconnection from "../../datasource/datasource";
import { Registration } from "../../entities/register";

const route = express.Router();

route.post("/", async(req:Request, res:Response)=>{
  try{
    const {
        firstname,
        lastname,
        password,
        email, 
        phonenumber,
        dateofbirth,
        country
    } = req.body;

    const register = new Registration();
    register.firstname = firstname;
    register.lastname = lastname;
    register.password = password;
    register.email = email;
    register.phonenumber = phonenumber;
    register.dateofbirth = dateofbirth;
    register.country = country;

    const registrationRepo = databaseconnection.getRepository(Registration);
    const createRegistration = await registrationRepo.save(register);

    if(createRegistration){
        res.status(200).json({
            code:200,
            status:true,
            message:"Registration successful"
        })
    }else{
        res.status(400).json({
            code:400,
            status:false,
            message:"Failed to register"
        })
    }
  }catch(error){
    console.error("Error updating member:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
})

export default route