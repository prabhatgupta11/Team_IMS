const db = require("../models")
const StockInOut = db.stockInOut
const ProductStock = db.productStock
const ProductPrice = db.productPrice
const Order = db.order

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

const addStockIn = async (req, res) => {
    try {

        const {
            stockType,
            orderDate,
            outletId,
            supplierCustomer,
            name,
            email,
            mobileNo,
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
            packing,
            pack
        } = req.body

console.log(888888888,req.body)
        // Create an order with customer details
        const order = await Order.create({
            outletId: outletId,
            orderDate: orderDate,
            customerName: name,
            customerMobile: mobileNo,
            customerEmail: email,
        });

        let products = []
        // Loop through the items (assuming itemId is a unique identifier for each product)
        for (let i = 0; i < itemId.length; i++) {

            const product = {
                outletId: outletId,
                stockType: stockType,
                supplierCustomer: supplierCustomer,
                itemId: itemId[i],
                hsnCode: hsnCode[i],
                batchNo: batchNo[i],
                mfgDate: mfgDate[i],
                expDate: expDate[i],
                freeQty: freeQty[i],
                qty: qty[i],
                purchasePrice: purchasePrice[i],
                discountType: discountType[i],
                discount: discount[i],
                originalPrice: originalPrice[i],
                mrp: mrp[i],
                salePrice: salePrice[i],
                costPriceWithoutTax: costPriceWithoutTax[i],
                taxPercentage: taxPercentage[i],
                taxAmount: taxAmount[i],
                packing: packing[i],
                pack: pack[i]
            };
            products.push(product);

        }
        console.log(11111111,products)
        // Create order items for each product
        const orderItems = products.map(product => ({
            orderFk: order.orderId,
            outletId: product.outletId,
            itemId: product.itemId,
            stockType: stockType,
            supplierCustomer: product.supplierCustomer,
            hsnCode : product.hsnCode,
            batchNo : product.batchNo,
            mfgDate : product.mfgDate,
            expDate : product.expDate,
            freeQty : product.freeQty,
            qty :product.qty,
            purchasePrice : product.purchasePrice,
            discountType: product.discountType,
            discount: product.discount,
            originalPrice: product.originalPrice,
            mrp: product.mrp,
            salePrice: product.salePrice,
            costPriceWithoutTax: product.costPriceWithoutTax,
            taxPercentage: product.taxPercentage,
            taxAmount: product.taxAmount,
            packingType : product.packing,
            pack : product.pack

        }));
        console.log(22222222222,orderItems)

        const stockIn = await ProductPrice.bulkCreate(orderItems)
        console.log(stockIn)
        req.flash('message', 'Stock Added Successfully')
        return res.redirect('/stockIn')

    } catch (err) {
        console.log(err)
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