const db = require("../models")
const { v4: uuidv4 } = require('uuid');
const Order = db.order;
const ProductPrice = db.productPrice



 // Function to generate a unique order item ID
 function generateUniqueOrderId() {
    return uuidv4();
  }

// Create order

const createOrderBill = async (req, res) => {

    console.log(666666666666,req.body)

    try {
        const { customerName,
            customerMobile,
            customerEmail,
            customerCity,
            customerState,
            customerPinCode,
            paymentMode,
            totalAmount,
            products
        } = req.body; 

        // Create an order with customer details
        const order = await Order.create({
            customerName,
            customerMobile,
            customerEmail,
            customerCity,
            customerState,
            customerPinCode,
            paymentMode,
            totalAmount,
        });

       // Create order items for each product
        const orderItems = products.map(product => ({
            rowguid: generateUniqueOrderId(),
            orderFk: order.orderId,
            outletId: product.outletId,
            storeName: product.storeName,
            itemId: product.itemId,
            itemName: product.itemName,
            qty: product.quantity,
            salePrice: product.price,
            discount: product.discount,
            itemAmount: product.itemAmount,
            taxPercentage:product.taxPercentage

        }));
          
        // // Bulk create order items
        await ProductPrice.bulkCreate(orderItems);
        req.flash('message', 'Order Bill created successfully');
        return res.redirect('/orderList')

    } catch (err) {
        console.log(err);
        req.flash('message', 'Something went wrong');
        return res.redirect('/order')
    }
}

// Update Order Details

const updateOrderItems = async (req, res) => {
    const orderId = req.params.orderId;
    // console.log(22222222222222,req.body)

    try {
        // Extract order and product details from the request body
        const {
            customerName,
            customerMobile,
            customerEmail,
            customerCity,
            customerState,
            customerPinCode,
            paymentMode,
            totalAmount,
            products
        } = req.body;

        // Update the order details
        await Order.update({
            customerName,
            customerMobile,
            customerEmail,
            customerCity,
            customerState,
            customerPinCode,
            paymentMode,
            totalAmount
        }, {
            where: { orderId }
        });

        // Update the associated product details
        for (const product of products) {
            console.log('Updating order item with orderItemId:', product.orderItemId);

            // Use findOne to find the specific order item by orderItemId
            const orderItem = await ProductPrice.findOne({
                where: {
                    orderItemId: product.orderItemId
                }
            });

            if (orderItem) {
                // Update the found order item with the new data
                await orderItem.update({
                    outletId: product.outletId,
                    storeName: product.storeName,
                    itemId: product.itemId,
                    itemName: product.itemName,
                    quantity: product.quantity,
                    salePrice: product.price,
                    discountPercentage: product.discount,
                    itemAmount: product.itemAmount,
                    taxPercentage: product.taxPercentage
                });
                console.log('Order item updated successfully');
            } else {
                console.log('Order item not found with orderItemId:', product.orderItemId);
            }
        }

        req.flash('message', 'Order details updated successfully');
        return res.redirect('/orderList');
    } catch (err) {
        console.log(err.message);
        req.flash('message', 'Something went wrong');
        return res.redirect(`/orderList`);
    }
};


module.exports = {
    updateOrderItems,
    createOrderBill
};