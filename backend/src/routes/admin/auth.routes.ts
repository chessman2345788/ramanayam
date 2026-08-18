import {Router} from "express";
const router= Router();
router.post("/login",(req,res)=>{
  res.json({
    success:true,
    message:"Admin login route working"
  });
});
export default router;