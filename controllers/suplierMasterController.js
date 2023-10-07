const db = require("../models")
const SupplierMaster =db.supplier;

const createSuplier = async (req, res) => {
try {
  console.log(4678,req.body.outletId)
    const newSupplier = await SupplierMaster.create({...req.body,storeFk:req.body.outletId});
    
    // return res.status(201).json(newSupplier);
   req.flash('message', 'supplier created successfully')
    return res.redirect("/suppliersMasterList")


  }

  catch (error) {
    console.error('Error creating supplier:', error);
    req.flash('message', 'Something went wrong ! Please try again ')
    return res.redirect("/suppliersMasterList")
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

const updateSuplier = async (req, res) => {
  try {
      const newSupplier = await SupplierMaster.update({...req.body,storeFk:req.body.outletId},{where:{rowguid:req.params.uuid}});
      req.flash('message', 'supplier updated successfully')
      return res.redirect("/suppliersMasterList")
    }
  
    catch (error) {
      console.error('Error creating supplier:', error);
      return res.status(500).json({ error: 'Could not create supplier' });
    }
  
  }
  



module.exports = {
    createSuplier,
    supplierData,
    updateSuplier,

}