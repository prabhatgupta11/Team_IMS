const db = require("../models")
// const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
// const config = require("../config/auth.config")
const Store = db.store
const Category = db.category
const StoreCategoryMapping = db.storeCategoryMapping
const CodeMaster = db.codeMaster
const session = require('express-session');


const addStoreCategoryMapping = async (req, res) => {

  const selectedStoreId = req.body.outletId; 
  const selectedCategoryIds = req.body.categoryId; // An array of selected categoryIds
  
console.log(selectedCategoryIds,selectedStoreId)
  try {

    // Find the store by selectedStoreId
    const store = await Store.findByPk(selectedStoreId);

    // Create associations between the user and selected stores
    for (const selectedCategoryId of selectedCategoryIds) {
      const category = await Category.findByPk(selectedCategoryId);
      if (category) {
        // Create a UserStoreMapping entry
        await StoreCategoryMapping.create({
          storeFk: store.outletId,
          categoryFk: category.categoryId
        });
      }
    }
    req.flash('message', 'Added categories for this store Sucessfully.');
    return res.redirect('/storeCategoryMapping')

  } catch (error) {
    console.log(error)
    req.flash('message', 'Something went wrong');
    return res.redirect('/storeCategoryMapping')
  }
}




//  get category data based on store from database and show into selected checkbox

// const getStoreCategoryData = async (req, res) => {
  
//   const outletId = req.params.outletId;

//   try {

//     const category = await Category.findAll()

//     let selectedCategory = await StoreCategoryMapping.findAll({ where: { storeFk: outletId } })

//     let arr = []
//     let storeCategoryIds = []

//     for (i = 0; i < selectedCategory.length; i++) {
//       storeCategoryIds.push(selectedCategory[i].categoryFk)
//     }

//     function onlyUnique(value, index, array) {
//       return array.indexOf(value) === index;
//     }
//     var unique = storeCategoryIds.filter(onlyUnique);
//   console.log(unique)

//     for (i = 0; i < category.length; i++) {
//       let flag = false
      
//       for (let j = 0; j < storeCategoryIds.length; j++) {
//         if (category[i].categoryId == storeCategoryIds[i]) {
//           flag = true
//         }
//       }

//       if (flag == true) {
//         arr.push({ ...category[i].dataValues, checked: true })
//       } else {
//         arr.push({ ...category[i].dataValues, checked: false })
//       }
//     }

//     res.json(arr);

//   } catch (error) {
//     console.log(error)
//     req.flash('message', 'Internam Server error');
//     return res.redirect('/storeCategoryMapping')
//   }
// }

const getStoreCategoryData = async (req, res) => {
  console.log(222222222222)
  const outletId = req.params.outletId;

  try {
    // const category = await CodeMaster.findAll({where : {code_level : 1}})
    const category = await CodeMaster.findAll({where : {code_level : 1}})

    let selectedCategory = await StoreCategoryMapping.findAll({ where: { storeFk: outletId } })
 
    let arr = []
    let storeCategoryIds = []

    for (i = 0; i < selectedCategory.length; i++) {
      storeCategoryIds.push(selectedCategory[i].categoryFk)
    }

    function onlyUnique(value, index, array) {
      return array.indexOf(value) === index;
    }
    var unique = storeCategoryIds.filter(onlyUnique);

    for (i = 0; i < category.length; i++) {
      let flag = false
      
      for (let j = 0; j < storeCategoryIds.length; j++) {
        if (category[i].id == storeCategoryIds[j]) {
          flag = true
        }
        
      }

      if (flag == true) {
        
        arr.push({ ...category[i].dataValues, checked: true })
      } else {
       
        arr.push({ ...category[i].dataValues, checked: false })
      }
    }
    res.json(arr);

  } catch (error) {
    console.log(error)
    req.flash('message', 'Internal Server error');
    return res.redirect('/storeCategoryMapping')
  }
}


// deselect a store 

const deselectCategories = async (req, res) => {
  console.log(11111111111111)
  const categoryId = req.params.categoryId;  
  const outletId = req.params.outletId;
console.log(789456123, categoryId,outletId)
  try {
      // Remove the store from the UserStoreMapping table
    const removeCategory =  await StoreCategoryMapping.destroy({ where: { categoryFk: categoryId, storeFk: outletId } });

   req.flash('message', 'category update Sucessfully.');
   return res.redirect('/storeCategoryMapping')

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}






module.exports = {
  addStoreCategoryMapping,
  getStoreCategoryData,
  deselectCategories,
  // userStoreMappingApprovalList,
  // updateUserStoreMappingApprovalStatus

}