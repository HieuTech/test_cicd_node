import userModel from "../models/user.model.js";

export default {
    findMany: (req,res)=>{
        if(req.query.userId){
            let user = userModel.findById(req.query.userId);
            return res.status(user? 200:500).json({
                message: user? "success" :"ko co user",
                data: user? user: "ko co user"
            })
        }
        let students  = userModel.findMany();
        return res.status(200).json(students)
    }
}