const db = require("../models")
const ProductRaise = db.productRaise;
const ProductStock = db.productStock;
const sequelize = require('sequelize');



const addProductRaise = async (req, res) => {

    try {
        if (req.body.store_selection == 'applied_to_all') {

            const sameProductPriceForAllStore = await ProductStock.update({ approve_b: 'pending', mrp: req.body.mrp, salePrice: req.body.price }, { where: { itemId: req.body.itemId } })

            req.flash('message', 'MRP and Price are added to same product of all stores wait for approval');
            return res.redirect('/productDetailsList')

        } else {

            const productStock = await ProductStock.findOne({ where: { itemId: req.body.itemId, outletId: req.body.outletId } })

            if (productStock) {

                const addMrpPriceInStock = await ProductStock.update({ approve_b: 'pending', mrp: req.body.mrp, salePrice: req.body.price }, { where: { itemId: req.body.itemId, outletId: req.body.outletId } })


                const info = {
                    itemId: req.body.itemId,
                    outletId: req.body.outletId,
                    mrp: req.body.mrp,
                    price: req.body.price,
                    approve_b: req.body.approve_b,
                    approve_by: req.body.approve_by,
                    approve_date: req.body.approve_date
                }

                const addProductRaise = await ProductRaise.create(info)

                req.flash('message', 'MRP and Price are updated wait for approval');
                return res.redirect('/productDetailsList')
            }
            else {
                req.flash('message', 'Product is not available into product stock');
                return res.redirect('/productRaise')
            }
        }
    }
    catch (err) {
        console.log(err)
        req.flash('message', 'Something went wrong');
        return res.redirect('/productRaise')
    }

}

const updateProductRaise = async (req, res) => {

    try {

        const productStock = await ProductStock.update({ ...req.body, mrp: req.body.mrp, salePrice: req.body.price }, { where: { itemId: req.params.id } })

        if (!productStock) {
            return res.status(500).send({
                success: false,
                message: "ProductStock is not found"
            })
        }

        req.flash('message', 'MRP and Price Updated.');
        return res.redirect('/productDetailsList')

    }

    catch (err) {
        console.log(err.message)
        res.status(500).send({
            success: false,
            message: "something went wrong"
        })
        console.log(err)
    }

}



// Product Rate Approval Listing

const productRaiseApprovalList = async function (req, res) {

    const approvalStatus = req.query.approvalStatus; // Get the approval status from query parameter

    let whereClause = {};

    if (approvalStatus === 'pending') {
        whereClause = { approve_b: 'pending' };
    } else if (approvalStatus === 'approved') {
        whereClause = { approve_b: "approved" };
    } else if (approvalStatus === 'rejected') {
        whereClause = { approve_b: "rejected" };
    }

    const productRaise = await ProductRaise.findAll({ where: whereClause });
    // const productStock = await ProductStock.findAll({where:whereClause});

    res.render('approval/productRaiseApprovalList', { title: 'Express', message: req.flash('message'), productRaise });
}


const updateProductRaiseApprovalStatus = async (req, res) => {

    const { action, selectedItemIds } = req.body;

    const flashMessages = []

    if (action === 'approved' || action === 'rejected') {  
        try {
            
            for (const itemId of selectedItemIds) {
               
                const productRaise = await ProductRaise.findOne({where : {itemId:itemId}});
                const productStock = await ProductStock.findOne({where : {itemId:itemId}});

                if (productRaise && productStock) {
                    
                    await ProductRaise.update({ approve_b: action }, { where: { itemId: productRaise.itemId, outletId: productRaise.outletId } });
                    await ProductStock.update({ approve_b: action }, { where: { itemId: productRaise.itemId, outletId: productRaise.outletId } });
                   
                    flashMessages.push(`checked Id ${itemId} ${action}`)
                }
            }

         if (flashMessages.length > 0) {
        req.flash('message', flashMessages.join(', '));
      } else {
        req.flash('message', 'No approval requests were updated.');
      }

      return res.redirect('/productRaiseApprovalList');
    } catch (err) {
      console.error(err);
      req.flash('message', 'Something went wrong');
      return res.redirect('/productRaiseApprovalList');
    }
  }
}



module.exports = {
    addProductRaise,
    updateProductRaise,
    productRaiseApprovalList,
    updateProductRaiseApprovalStatus
}