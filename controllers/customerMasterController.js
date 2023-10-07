const db = require("../models")
const CustomerMaster =db.customer;

const createCustomer = async (req, res) => {
try {
    const newCustomer = await CustomerMaster.create(req.body);

   req.flash('message', 'Customer Master created successfully')
    return res.redirect("/customerMasterList")


  }

  catch (error) {
    console.error('Error creating supplier:', error);
    return res.status(500).json({ error: 'Could not create supplier' });
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

const updateCustomer = async (req, res) => {
  try {
      const newCustomer = await CustomerMaster.update({...req.body},{where:{rowguid:req.params.uuid}});
      req.flash('message', 'customer updated successfully')
      return res.redirect("/customerMasterList")
    }
  
    catch (error) {
      console.error('Error updating Customer:', error);
      return res.status(500).json({ error: 'Could not update Customer' });
    }
  
  }
  



module.exports = {
    createCustomer,
    supplierData,
    updateCustomer,

}