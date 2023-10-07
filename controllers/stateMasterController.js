const db = require("../models")
const StateMaster =db.stateMaster;

const createStateMaster = async (req, res) => {
  try {
    console.log(50500000, req.body);
    const newStateMaster = await StateMaster.create(req.body);
   req.flash('message', 'State Master created successfully')
  return res.redirect("/stateMasterList")

  } catch (error) {
    console.log(error)
    req.flash('message', 'Something Went Wrong Creating State Master')
    return res.redirect("/stateMaster")
    
  }
}


const supplierData=async(req,res)=>{
  try{
     const Allsuplier=await SupplierMaster.findAll();
     return res.status(201).json(Allsuplier);
  }catch(err){
    return res.status(500).json({ error: 'Could not fund all supplier' });
  }
}

const updateStateMaster = async (req, res) => {
  try {
      const newStateMaster = await StateMaster.update({...req.body},{where:{rowguid:req.params.uuid}});
      req.flash('message', 'State Master updated successfully')
      return res.redirect("/stateMasterList")
    }
  
    catch (error) {
      req.flash('message', 'Something went wrong')
      return res.redirect(`/stateMaster/${req.params.uuid}`)
    }
  
  }
  



module.exports = {
    createStateMaster,
    supplierData,
    updateStateMaster,

}