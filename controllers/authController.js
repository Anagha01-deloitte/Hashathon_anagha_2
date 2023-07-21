const authService = require("../service/authService");
const employeeService = require("../service/employeeService")

exports.login = async(req,res)=>{
    const {userName,password} = req.body;

    //check if user has entered the fields
    if(!userName){
        res.status(400).json({
            status:"Failed",
            message:"Please enter user name"
        })
    }

    if(!password){
        res.status(400).json({
            status:"Failed",
            message:"Please enter password"
        })
    }

    //check if user exists and password is correct
    const employee = await employeeService.getEmployeeService({userName});
    const passwordStored = employee.password;
    
    if(!employee && !await employee.checkPassword(password, passwordStored)){
        
        res.status(400).json({
            status:"Failed",
            message:"Bad credentials"
        })
       
    } 
    const result = await authService.loginService({
        id:employee._id
    });

    return res.status(200).json({
        status:"success",
        message:"loggedIn succesfully",
        data:{
            token: result
        }
    })
    
   
}

exports.signup = async(req,res) =>{
    const result = await authService.sigupService(req.body);

    if(result.code=="11000"){
       return  res.status(400).json({
            status:"Failed",
            message:"Duplicate key error"
        })
    }

    req.userId={
        _id:result.newEmployee._id
    }
   return  res.status(201).json({
        status:"success",
        data:result
    })
} 

exports.protect = (req,res)=>{
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        const token = req.headers.authorization.split(" ")[1]
        
        if(!token){
            res.status(403).json({
                status:"Failed",
                message:"Please login to continue"
            })
        }
    }
}





