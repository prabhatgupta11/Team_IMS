const db = require("../models")
const Category = db.codeMaster;

// Create Category

// const createCategory = async (req, res) => {

//   try {

//     let info = {
//       code_name,
//       displayorder,
//       ParentPk:-1,
//       code_level:1
//     } = req.body

//     const category = await Category.create(info)

//     req.flash('message', 'Category created Successfully');

//     return res.redirect('/categoryMaster')


//   }

//   catch (err) {
//     console.log(err)
//     req.flash('message', 'Something Went Wrong');
//     return res.redirect('/categoryMaster')

//   }

// }
   //////////////////////////////////////////////////  update category ///////////////////////////////////////////////// 

const createCategory = async (req, res) => {
    try {
      const { code_name, displayorder,Active } = req.body;
  
      // Create a new category
      const category = await Category.create({
        code_name,
        displayorder,
        Active,
        ParentPk: -1,
        code_level: 1,
      });
  
      req.flash('message', 'Category created successfully.');
      return res.redirect('/codeCategoryMasterList');
    } catch (err) {
      console.log(err);
      req.flash('error', 'Something went wrong. Please try again later.');
      return res.redirect('/codeCategoryMasterList');
    }
  };


   //////////////////////////////////////////////////  update category ///////////////////////////////////////////////// 

const updateCategory = async (req, res) => {
  try {
    console.log(44444444444444,req.body)
      const newDepartment = await Category.update({...req.body,ParentPk: -1,code_level: 1,},{where:{rowguid:req.params.uuid}});
      req.flash('message', 'Category updated successfully')
      console.log(newDepartment)
      return res.redirect("/codeCategoryMasterList")
    }
  
    catch (error) {
      console.error('Error updating category:', error);
      return res.status(500).json({ error: 'Could not update category' });
      
    }
  
  }


  // create Department
  const createDepartment = async (req, res) => {
    try {
      const { code_name, displayorder,ParentPk,Active} = req.body;
      // Create a new category
      const department = await Category.create({
        code_name,
        displayorder,
        Active,
        ParentPk,
        code_level: 2,
      });
  
      req.flash('message', 'Department created successfully.');
      return res.redirect('/departmentMasterList');
    } catch (err) {
      console.log(err);
      req.flash('error', 'Something went wrong. Please try again later.');
      return res.redirect('/departmentMasterList');
    }
  };



     //   update department

const updateDepartment = async (req, res) => {
  try {
    console.log(123,"department")
      const newDepartment = await Category.update({...req.body},{where:{rowguid:req.params.uuid}});
      req.flash('message', 'Department updated successfully')
      console.log(newDepartment)
      return res.redirect("/departmentMasterList")
    }
  
    catch (error) {
      console.error('Error updating department:', error);
      return res.status(500).json({ error: 'Could not update department' });
      
    }
  
  }



  // create Group 

  const createGroup = async (req, res) => {
    try {
      console.log(2222222,req.body.ParentPk)
      const { code_name, displayorder,ParentPk,Active} = req.body;
      // Create a new category
      const group = await Category.create({
        code_name,
        Active,
        displayorder,
        ParentPk,
        code_level: 3,
      });
  
      req.flash('message', 'Group created successfully.');
      return res.redirect('/groupMasterList');
    } catch (err) {
      console.log(err);
      req.flash('error', 'Something went wrong. Please try again later.');
      return res.redirect('/groupMasterList');
    }
  };

  // create ItemType

  const createItemType = async (req, res) => {
    try {
      const { code_name, displayorder,ParentPk,Active} = req.body;
      // Create a new category
      const itemtype = await Category.create({
        code_name,
        displayorder,
        Active,
        ParentPk,
        code_level: 4,
      });
  
      req.flash('message', 'ItemType created successfully.');
      return res.redirect('/itemTypeMasterList');
    } catch (err) {
      console.log(err);
      req.flash('error', 'Something went wrong. Please try again later.');
      return res.redirect('/itemTypeMasterList');
    }
  };


//   update taxitem type

const updateItemType = async (req, res) => {
  try {
      const newItemtype = await Category.update({...req.body},{where:{rowguid:req.params.uuid}});
      req.flash('message', 'itemType updated successfully')
      return res.redirect("/itemTypeMasterList")
    }
  
    catch (error) {
      console.error('Error updating itemType:', error);
      return res.status(500).json({ error: 'Could not update itemType' });
    }
  
  }

  //   update group

const updateGroup = async (req, res) => {
  try {
    console.log(500000000000,req.body)
      const newItemtype = await Category.update({...req.body},{where:{rowguid:req.params.uuid}});
      req.flash('message', 'Group updated successfully')
      return res.redirect("/groupMasterList")
    }
  
    catch (error) {
      console.error('Error updating group:', error);
      return res.status(500).json({ error: 'Could not update group' });
    }
  
  }




module.exports = {
    createCategory,
    createDepartment,
    createGroup,
    createItemType,
    updateItemType,
    updateGroup,
    updateDepartment,
    updateCategory
}