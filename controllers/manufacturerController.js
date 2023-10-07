const db = require("../models")
const Manufacturer = db.manufacturer;

// Create Manufacturer

const addManufacturer = async (req, res) => {

  try {

    let info = {
      manufacturerId,
      shortDescription,
      longDescription,
      approve_b,
      approve_by,
      approve_date
    } = req.body

    const manufacturer = await Manufacturer.create(info)

    req.flash('message', 'Manufacturer added Successfully and Sent for Approval');
    return res.redirect('/manufacturerList')

  }

  catch (err) {
    console.log(err)
    req.flash('message', 'something went wrong');
    return res.redirect('/manufacturer')
  }

}


// Update Manufacturer Details

const updateManufacturer = async (req, res) => {

  try {

    const manufacturer = await Manufacturer.update({ ...req.body, approve_b: 'pending' }, { where: { manufacturerId: req.params.id } })

    if (!manufacturer) {
      req.flash('message', 'Manufacturer not found');
      return res.redirect('/updateManufacturer/:id')
    }

    req.flash('message', 'Manufacturer Updated Successfully and Sent for Admin Approval');
    return res.redirect('/manufacturerList')

  } catch (err) {
    console.log(err.message)
    req.flash('message', 'Something went wrong');
    return res.redirect('/updateManufacturer/:id')
  }


}

// Admin view for approving categories

const adminView = async (req, res) => {

  try {

    const pendingCategories = await Manufacturer.findAll(
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

    const manufacturerId = req.params.manufacturerId;

    const manufacturer = await Manufacturer.update({ approve_b: 'yes' }, { where: { manufacturerId: manufacturerId } });

    res.status(200).send(manufacturer)
    //   res.redirect('/categories/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
}


//   Manufacturer Approval List

const manufacturerApprovalList = async function (req, res) {

  const approvalStatus = req.query.approvalStatus; 

  let whereClause = {};

  if (approvalStatus === 'pending') {
    whereClause = { approve_b: 'pending' };
  } else if (approvalStatus === 'approved') {
    whereClause = { approve_b: "approved" };
  } else if (approvalStatus === 'rejected') {
    whereClause = { approve_b: "rejected" };
  }

  const manufacturer = await Manufacturer.findAll({ where: whereClause });
  res.render('approval/manufacturerApprovalList', { title: 'Express', message: req.flash('message'), manufacturer });
}

const updateManufacturerApprovalStatus = async (req, res) => {
  const { action, selectedManufacturerIds } = req.body;
  const flashMessages = [];

  if (action === 'approved' || action === 'rejected') {
    try {
      for (const manufacturerId of selectedManufacturerIds) {

        const manufacturer = await Manufacturer.findByPk(manufacturerId);

        if (manufacturer) {

          await Manufacturer.update({ approve_b: action }, { where: { manufacturerId: manufacturerId } });
          flashMessages.push(`Manufacturer ID ${manufacturerId} ${action}`);
        }
      }

      if (flashMessages.length > 0) {
        req.flash('message', flashMessages.join(', '));
      } else {
        req.flash('message', 'No manufacturers were updated.');
      }

      return res.redirect('/manufacturerApprovalList');
    } catch (err) {
      console.error(err);
      req.flash('message', 'Something went wrong');
      return res.redirect('/manufacturerApprovalList');
    }
  }
}


module.exports = {
  addManufacturer,
  updateManufacturer,
  adminView,
  adminApprove,
  manufacturerApprovalList,
  updateManufacturerApprovalStatus
}