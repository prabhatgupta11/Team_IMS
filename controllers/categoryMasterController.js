const db = require("../models")
const Category = db.category;

// Create Category

const addCategory = async (req, res) => {

  try {

    let info = {
      categoryId,
      shortDescription,
      longDescription,
      approve_b,
      approve_by,
      approve_date

    } = req.body

    const category = await Category.create(info)

    req.flash('message', 'Category added Successfully and Sent for Approval');

    return res.redirect('/categoryList')


  }

  catch (err) {
    console.log(err)
    req.flash('message', 'Something Went Wrong');
    return res.redirect('/category')

  }

}

// Admin view for approving categories

const adminView = async (req, res) => {

  try {

    const pendingCategories = await Category.findAll(
      {
        where: { approve_b: null }
      }
    )
    return res.status(200).send({
      success: true,
      pendingCategories
    })
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "something went wrong"
    })
    console.log(err)
  }
}

// Admin approves a category

const adminApprove = async (req, res) => {

  try {

    const categoryId = req.params.categoryId;

    const category = await Category.update({ approve_b: 'yes' }, { where: { categoryId: categoryId } });

    res.status(200).send(category)
    //   res.redirect('/categories/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
}



// Update Manufacturer Details

const updateCategory = async (req, res) => {

  try {

    const category = await Category.update({ ...req.body, approve_b: 'pending' }, { where: { categoryId: req.params.id } })

    if (!category) {
      req.flash('message', 'Category not found');
    }

    req.flash('message', 'Category Details updated successfully and sent for Approval');
    return res.redirect('/categoryList')

  } catch (err) {
    console.log(err.message)
    req.flash('message', 'Something Went Wrong');
    return res.redirect('/updateCategory/:id')
  }


}


//  Approval For Category

const categoryApprovalList = async function (req, res) {

  const approvalStatus = req.query.approvalStatus; // Get the approval status from query parameter

  let whereClause = {};

  if (approvalStatus === 'pending') {
    whereClause = { approve_b: 'pending' };
  } else if (approvalStatus === 'approved') {
    whereClause = { approve_b: "approved" };
  } else if (approvalStatus === 'rejected') {
    whereClause = { approve_b: "rejected" };
  }

  const category = await Category.findAll({ where: whereClause });

  res.render('approval/categoryApprovalList', { title: 'Express', message: req.flash('message'), category });
}

const updateCategoryApprovalStatus = async (req, res) => {
  const { action, selectedCategoryIds } = req.body;

  const flashMessages = [];

  if (action === 'approved' || action === 'rejected') {
    try {
      for (let i = 0; i < selectedCategoryIds.length; i++) {
        const categoryId = selectedCategoryIds[i];
        const category = await Category.findOne({ where: { categoryId: categoryId } });
      
        if (category) {
          await Category.update({ approve_b: action }, { where: { categoryId: categoryId } });
          flashMessages.push(`CategoryId ${categoryId} ${action}`);
          console.log(1234, flashMessages);
        }
      }
      

      if (selectedCategoryIds.length > 0) {
        console.log(flashMessages)
        req.flash('message', flashMessages.join(', '));
        return res.redirect('/categoryApprovalList');
      } else {
        req.flash('message', 'No categories were updated.');
        return res.redirect('/categoryApprovalList');
      }
    } catch (err) {
      console.error(err);
      req.flash('message', 'Something went wrong');
      return res.redirect('/categoryApprovalList');
    }
  }
}


module.exports = {
  addCategory,
  adminView,
  adminApprove,
  updateCategory,
  categoryApprovalList,
  updateCategoryApprovalStatus
}