import express,{Request, Response} from "express";
import databaseconnection from "../../datasource/datasource";
import { Registration } from "../../entities/register";

const route = express.Router();

route.post("/", async(req:Request, res:Response)=>{
    try{

        const {email, password} = req.body;

        const registerRepo = databaseconnection.getRepository(Registration);
        
        const findUser = await registerRepo.findOne({where:{email:email, password:password}});

        if(findUser){
            res.status(200).json({
                code:200,
                status:true,
                message:"login successful"
            })
        }else{
            res.status(400).json({
                code:400,
                status:false,
                message:"fail to login"
            })
        }

    }catch(error){
        console.error("Error updating member:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

export default route;

