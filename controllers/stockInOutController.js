const db = require("../models")
const StockInOut = db.stockInOut
const ProductStock = db.productStock
const ProductPrice = db.productPrice

// Update stock in product stock 

const stockInOut = async (req, res) => {

    try {

        const productStock = await ProductStock.findOne({ where: { itemId: req.body.itemId, outletId: req.body.outletId } })

        if (productStock) {
            const qty = parseInt(req.body.qty)

            if (req.body.type == 'in') {

                const addproductStock = await ProductStock.update({ approve_b: 'pending', stock: (productStock.stock) + qty }, { where: { itemId: req.body.itemId, outletId: req.body.outletId } })
                req.flash('message', 'Stock successfully added into product stock');

            } else if (req.body.type == 'out') {

                const removeProductStock = await ProductStock.update({ approve_b: 'pending', stock: (productStock.stock) - qty }, { where: { itemId: req.body.itemId, outletId: req.body.outletId } })
                req.flash('message', 'Stock successfully out from product stock');
            }

            const info = {
                itemId: req.body.itemId,
                outletId: req.body.outletId,
                type: req.body.type,
                qty: req.body.qty,
                remarks: req.body.remarks,
                approve_b: req.body.approve_b,
                approve_by: req.body.approve_by,
                approve_date: req.body.approve_date
            }

            const stockInOut = await StockInOut.create(info)
            return res.redirect('/productDetailsList')

        } else {
            req.flash('message', 'Product is not available into product stock');
            return res.redirect('/stockInOut')
        }
    }
    catch (err) {
        console.log(err)
        req.flash('message', 'Something went wrong');
        return res.redirect('/stockInOut')
    }

}

const addStockIn = async (req,res) => {
try{
const info = {
        outletId,
        stockType,
        supplierCustomer,
        itemId,
        hsnCode,
        batchNo,
        mfgDate,
        expDate,
        freeQty,
        qty,
        purchasePrice,
        discountType,
        discount,
        originalPrice,
        mrp,
        salePrice,
        costPriceWithoutTax,
        taxPercentage,
        taxAmount,
        packingType,
        pack  
} = req.body

const stockIn = await ProductPrice.create(info)
console.log(stockIn)
req.flash('message', 'Stock Added Successfully')
return res.redirect('/stockIn')

}catch(err){
    req.flash('message', 'Something Went Wrong')
    return res.redirect('/stockIn')
}

}





// Stock In/Out Approval Listing

const stockInOutApprovalList = async function (req, res) {

    const approvalStatus = req.query.approvalStatus; // Get the approval status from query parameter

    let whereClause = {};

    if (approvalStatus === 'pending') {
        whereClause = { approve_b: 'pending' };
    } else if (approvalStatus === 'approved') {
        whereClause = { approve_b: "approved" };
    } else if (approvalStatus === 'rejected') {
        whereClause = { approve_b: "rejected" };
    }

    const stockInOut = await StockInOut.findAll({ where: whereClause });

    res.render('approval/stockInOutApprovalList', { title: 'Express', message: req.flash('message'), stockInOut });
}


const updateStockInOutApprovalStatus = async (req, res) => {
    const { action, selectedItemIds } = req.body;

    const flashMessages = []

    if (action === 'approved' || action === 'rejected') {
        try {

            for (const itemId of selectedItemIds) {

                const stockInOut = await StockInOut.findOne({ where: { itemId: itemId } });
                const productStock = await ProductStock.findOne({ where: { itemId: itemId } });

                if (stockInOut && productStock) {

                    await StockInOut.update({ approve_b: action }, { where: { itemId: stockInOut.itemId, outletId: stockInOut.outletId } });
                    await ProductStock.update({ approve_b: action }, { where: { itemId: stockInOut.itemId, outletId: stockInOut.outletId } });

                    flashMessages.push(`checked Id ${itemId} ${action}`)
                }
            }
            if (flashMessages.length > 0) {
                req.flash('message', flashMessages.join(', '));
            } else {
                req.flash('message', 'No approval requests were updated.');
            }

            return res.redirect('/stockInOutApprovalList');
        } catch (err) {

            console.error(err);
            req.flash('message', 'Something went wrong');
            return res.redirect('/stockInOutApprovalList');
        }
    }
}





module.exports = {
    stockInOut,
    addStockIn,
    stockInOutApprovalList,
    updateStockInOutApprovalStatus
}