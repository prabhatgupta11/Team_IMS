const db = require("../models")
// const Store = db.store;
const Store = db.store
const CodeMaster = db.codeMaster
const StoreCategoryMapping = db.storeCategoryMapping
const UserStoreMapping = db.userStoreMapping


// const createStore = async (req, res) => {

//   try {

//     let info = {
//       outletId,
//       storeName,
//       storeAddress,
//       approve_b,
//       approve_by,
//       approve_date
//     } = req.body

//     const store = await Store.create(info)

//     req.flash('message', 'Store added Successfully and Sent for Approval');
//     return res.redirect('/storeList')

//   }

//   catch (err) {
//     req.flash('message', 'Something Went Wrong');
//     return res.redirect('/storeMaster')
//   }

// }

// Get All Store Details
const getAllStoreDetails = async (req, res) => {
  const stores = await Store.findAll()
  res.status(200).send({
    success: true,
    stores
  })
}


// Update Store Details

// const updateStore = async (req, res) => {

//   try {

//     const store = await Store.update({ ...req.body, approve_b: 'pending' }, { where: { outletId: req.params.id } })

//     if (!store) {
//       res.status(200).send({
//         success: false,
//         message: "Store Not Found"
//       })
//     }

//     req.flash('message', 'Store updated successfully and sent for Approval');
//     return res.redirect('/storeList')

//   } catch (err) {
//     console.log(err.message)
//     req.flash('message', 'Something Went Wrong');
//     return res.redirect('/storeMaster')
//   }

// }


//   store Approval List

const storeApprovalList = async function (req, res) {
  const approvalStatus = req.query.approvalStatus; // Get the approval status from query parameter

  let whereClause = {};

  if (approvalStatus === 'pending') {
    whereClause = { approve_b: 'pending' };
  } else if (approvalStatus === 'approved') {
    whereClause = { approve_b: "approved" };
  } else if (approvalStatus === 'rejected') {
    whereClause = { approve_b: "rejected" };
  }

  const store = await Store.findAll({ where: whereClause });

  res.render('approval/storeApprovalList', { title: 'Express', message: req.flash('message'), store });
}

const updateStoreApprovalStatus = async (req, res) => {
  console.log(123456)
  const { action, selectedStoreIds } = req.body;
  if (action === 'approved' || action === 'rejected') {

    selectedStoreIds.forEach(async outletId => {
      try {
        // Find the category by ID using Sequelize
        const store = await Store.findByPk(outletId);

        if (store) {
          // Update the approval status of the category
          await Store.update({ approve_b: action }, { where: { outletId: outletId } });
        }

        req.flash('message', `Checked approval requests are ${action}`)
        return res.redirect('/storeApprovalList')

      } catch (err) {
        console.log(err.message)
        req.flash('message', 'Something went wrong')
        return res.redirect('/storeApprovalList')
      }

    });
  }
}


const createNewStore = async function (req, res) {
 
  try {
    let info = {
      outletId,
      code,
      storeName,
      businessType,
      address1,
      address2,
      state,
      pincode,
      contactPersonName,
      contactNo1,
      contactNo2,
      GSTNo,
      panNo,
      taxState,
      status,
      displayOrder,
      edit_by,
      edit_on,
      approve_b,
      approve_by,
      rowguid
    } = req.body

    const newStore = await Store.create(info)

     const selectedStoreId = newStore.outletId; 
     const selectedCategoryIds = req.body.category; //ids in array
     const store = await Store.findByPk(selectedStoreId);

    // Create associations between the user and selected stores
    for (const selectedCategoryId of selectedCategoryIds) {
      const category = await CodeMaster.findByPk(selectedCategoryId);
      if (category) {
        // Create a UserStoreMapping entry
        await StoreCategoryMapping.create({
          storeFk: store.outletId,
          categoryFk: category.id
        });
      }
    }
    if (req.session.userDetail.role == 'super admin'){
      await UserStoreMapping.create({
        userFk: req.session.userDetail.id,
        storeFk: newStore.outletId
      });
    }
    req.flash('message', 'Store added Successfully and Sent for Approval');
    return res.redirect('/newStoreList')

  }

  catch (err) {
    console.log(err)
    req.flash('message', 'Something Went Wrong');
    return res.redirect('/newStore')
  }

}


const updateNewStore = async (req, res) => {
  try {
    const store = await Store.findOne({ where: { rowguid: req.params.id } });

    if (!store) {
      // Handle the case where the store with the given ID doesn't exist
      req.flash('message', 'Store not found');
      return res.redirect('/newStoreList');
    }

    // Update the store's information
    await store.update({ ...req.body, approve_b: 'pending' });

    const selectedCategoryIds = req.body.id || []; // Default to an empty array if no categories are selected

    if (selectedCategoryIds.length === 0) {
      // If no categories are selected, remove all existing category associations
      await StoreCategoryMapping.destroy({ where: { storeFk: store.outletId } });
      req.flash('message', 'Store updated successfully');
    } else {
      // Remove existing category associations for this store
      await StoreCategoryMapping.destroy({ where: { storeFk: store.outletId } });

      // Create associations between the store and selected categories
      for (const selectedCategoryId of selectedCategoryIds) {
        const category = await CodeMaster.findByPk(selectedCategoryId);

        if (category) {
          // Create a StoreCategoryMapping entry
          await StoreCategoryMapping.create({
            storeFk: store.outletId,
            categoryFk: category.id
          });
        }
      }
      req.flash('message', 'Store updated successfully and sent for Approval');
    }

    return res.redirect('/newStoreList');
  } catch (err) {
    console.error(err);
    req.flash('message', 'Something Went Wrong');
    return res.redirect(`/updateNewStore/${req.params.id}`);
  }
};





module.exports = {
  createNewStore,
  updateNewStore,
  // createStore,
  getAllStoreDetails,
  // updateStore,
  storeApprovalList,
  updateStoreApprovalStatus
}