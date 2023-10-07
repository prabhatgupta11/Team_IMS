const db = require("../models")
const Product = db.products
const NewProduct = db.newProduct
const fs = require('fs');
const xlsx = require('xlsx');
const Manufacturer = db.manufacturer



// Create Product 

const createProduct = async (req, res) => {
    try {
        if (req.file) {
            const tmp_path = req.file.path;
            req.body.newFileName = `${new Date().getTime()}_${req.file.originalname}`
            /** The original name of the uploaded file
                stored in the variable "originalname". **/
            const target_path = `public/uploads/${req.body.newFileName}`;

            /** A better way to copy the uploaded file. **/
            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);
            src.on('end', function () { });
            src.on('error', function (err) { });
        }
        let info = {
            externalitemId: req.body.externalitemId,
            itemName: req.body.itemName,
            shortName: req.body.shortName,
            length: req.body.length,
            breadth: req.body.breadth,
            height: req.body.height,
            weight: req.body.weight,
            width: req.body.width,
            box: req.body.box,
            rack: req.body.rack,
            foodType: req.body.foodType,
            taxId: req.body.taxId,
            imageUrl: req.body.newFileName,
            decimalsAllowed: req.body.decimalsAllowed,
            status: req.body.status,
            itemProductTaxType: req.body.itemProductTaxType,
            fulfilmentMode: req.body.fulfilmentMode,
            isReturnable: req.body.isReturnable,
            isCancellable: req.body.isCancellable,
            returnPeriod: req.body.returnPeriod,
            description: req.body.description,
            detailedDescription: req.body.detailedDescription,
            weightGrams: req.body.weightGrams,
            appliesOnline: req.body.appliesOnline,
            itemProductType: req.body.itemProductType,
            itemTaxType: req.body.itemTaxType,
            iBarU: req.body.iBarU,
            manufacturerId: req.body.manufacturerId,
            pageN: req.body.pageN,
            isDeleted: req.body.isDeleted,
            approve_b: req.body.approve_b,
            approve_by: req.body.approve_by,
            approve_date: req.body.approve_date

        }
        const product = await Product.create(info)
        req.flash('message', 'Product sucessfully created wait for Approval');
        return res.redirect('/productMasterList')
    }
    catch (err) {
        console.log(err.message)
        req.flash('message', 'Something went wrong');
        return res.redirect('/product')
    }
}

// create New Product

const createNewProduct = async (req,res) => {
    try {

        if (req.file) {
            const tmp_path = req.file.path;
            req.body.newFileName = `${new Date().getTime()}_${req.file.originalname}`
            /** The original name of the uploaded file
                stored in the variable "originalname". **/
            const target_path = `public/uploads/${req.body.newFileName}`;
            /** A better way to copy the uploaded file. **/
            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);
            src.on('end', function () { });
            src.on('error', function (err) { });
        }
       
        let info = {
            category : req.body.category,
            department : req.body.department,
            group : req.body.group,
            itemType : req.body.itemType,
            brand : req.body.brand,
            itemCode : req.body.itemCode,
            itemName : req.body.itemName,
            description : req.body.description,
            productType : req.body.productType,
            status : req.body.status,
            sellingPricePolicy : req.body.sellingPricePolicy,
            weight : req.body.weight,
            imageUrl : req.body.newFileName,
            taxType : req.body.taxType,
            tax : req.body.tax,
            displayOrder : req.body.displayOrder,
            edit_by : req.body.edit_by,
            edit_on : req.body.edit_on,
            approve_b : req.body.approve_b,
            approved_by : req.body.approved_by,
            rowguid : req.body.rowguid
        } 
            
        const product = await NewProduct.create(info)
        req.flash('message', 'Product sucessfully created wait for Approval');
        return res.redirect('/newProductList')
    }
    catch (err) {
        console.log(err)
        req.flash('message', 'Something went wrong');
        return res.redirect('/newProduct')
    }

}


// Update Product Details

const updateProduct = async (req, res) => {
    try {
        if (req.file) {
            const tmp_path = req.file.path;
            req.body.newFileName = `${new Date().getTime()}_${req.file.originalname}`
            /** The original name of the uploaded file
                stored in the variable "originalname". **/
            const target_path = `public/uploads/${req.body.newFileName}`;

            /** A better way to copy the uploaded file. **/
            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);
            src.on('end', function () { });
            src.on('error', function (err) { });
        }

        const product = await Product.update({ ...req.body, approve_b: 'pending', imageUrl: req.body.newFileName }, { where: { itemId: req.params.id } })

        if (!product) {
            req.flash('message', 'Product not found');
        }

        req.flash('message', 'Product Details updated sucessfully wait for approval');
        return res.redirect('/productMasterList')

    } catch (err) {
        console.log(err.message)
        req.flash('message', 'Something went wrong');
        return res.redirect('/updateProduct/:id')
    }


}

const updateNewProduct = async (req, res) => {
    try {
        if (req.file) {
            const tmp_path = req.file.path;
            req.body.newFileName = `${new Date().getTime()}_${req.file.originalname}`
            /** The original name of the uploaded file
                stored in the variable "originalname". **/
            const target_path = `public/uploads/${req.body.newFileName}`;

            /** A better way to copy the uploaded file. **/
            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);
            src.on('end', function () { });
            src.on('error', function (err) { });
        }

        const product = await NewProduct.update({ ...req.body, approve_b: 'pending', imageUrl: req.body.newFileName }, { where: { rowguid: req.params.id } })

        if (!product) {
            req.flash('message', 'Product not found');
        }

        req.flash('message', 'Product Details updated sucessfully wait for approval');
        return res.redirect('/newProductList')

    } catch (err) {
        console.log(err)
        req.flash('message', 'Something went wrong');
        return res.redirect(`/updateNewProduct/${req.params.id}`)
    }


}

// upload bulk products

const uploadBulkProducts = async function (req, res) {
    try {
        if (req.file) {
            const filePath = req.file.path;
            const fileData = fs.readFileSync(filePath);
            const workbook = xlsx.read(fileData, { type: 'buffer' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const productsInJson = xlsx.utils.sheet_to_json(sheet);
            for (const productData of productsInJson) {
                // console.log(productData)

                const newFileName = `${new Date().getTime()}_${productData.imageUrl}`
                const target_path = `public/uploads/${newFileName}`;
                /** A better way to copy the uploaded file. **/
                // const src = fs.createReadStream(tmp_path);
                const dest = fs.createWriteStream(target_path);
                // src.pipe(dest);
                // src.on('end', function () { });
                // src.on('error', function (err) { });

                let manufacturer = await Manufacturer.findOne({ where: { shortDescription: productData.manufacturer } });

                if (!manufacturer) {
                    manufacturer = await Manufacturer.create({ shortDescription: productData.manufacturer });
                }

                // Create the product with the manufacturer ID
                await Product.create({
                    externalitemId: productData.externalitemId,
                    itemName: productData.itemName,
                    shortName: productData.shortName,
                    length: productData.length,
                    breadth: productData.breadth,
                    height: productData.height,
                    weight: productData.weight,
                    width: productData.width,
                    box: productData.box,
                    rack: productData.rack,
                    foodType: productData.foodType,
                    taxId: productData.taxId,
                    imageUrl: newFileName,
                    decimalsAllowed: productData.decimalsAllowed,
                    status: productData.status,
                    itemProductTaxType: productData.itemProductTaxType,
                    fulfilmentMode: productData.fulfilmentMode,
                    isReturnable: productData.isReturnable,
                    isCancellable: productData.isCancellable,
                    returnPeriod: productData.returnPeriod,
                    description: productData.description,
                    detailedDescription: productData.detailedDescription,
                    weightGrams: productData.weightGrams,
                    appliesOnline: productData.appliesOnline,
                    itemProductType: productData.itemProductType,
                    itemTaxType: productData.itemTaxType,
                    iBarU: productData.iBarU,
                    manufacturerId: manufacturer.manufacturerId,
                    pageN: productData.pageN,
                    // isDeleted: productData.isDeleted,
                    // approve_b: productData.approve_b,
                    // approve_by: productData.approve_by,
                    // approve_date: productData.approve_date,
                });
            }

            req.flash('message', 'Products Successfully Uploaded.');
            return res.redirect('/productMasterList');
        }
    } catch (err) {
        console.log(err.message);
        req.flash('message', 'Something went wrong');
        return res.redirect('/uploadBulkProducts');
    }
};




// product approval list

const productApprovalList = async function (req, res) {

    const approvalStatus = req.query.approvalStatus; // Get the approval status from query parameter

    let whereClause = {};

    if (approvalStatus === 'pending') {
        whereClause = { approve_b: 'pending' };
    } else if (approvalStatus === 'approved') {
        whereClause = { approve_b: "approved" };
    } else if (approvalStatus === 'rejected') {
        whereClause = { approve_b: "rejected" };
    }

    const product = await Product.findAll({ where: whereClause });

    res.render('approval/productApprovalList', { title: 'Express', message: req.flash('message'), product });
}

const updateProductApprovalStatus = async (req, res) => {
    const { action, selectedItemIds } = req.body;
    const flashMessages = [];

    if (action === 'approved' || action === 'rejected') {
        try {
            for (const itemId of selectedItemIds) {

                const product = await Product.findOne({ where: { itemId: itemId } });

                if (product) {
                    await Product.update({ approve_b: action }, { where: { itemId: itemId } });
                    flashMessages.push(`Item ID ${itemId} ${action}`);
                }
            }

            if (flashMessages.length > 0) {
                req.flash('message', flashMessages.join(', '));
            } else {
                req.flash('message', 'No approval requests were updated.');
            }

            return res.redirect('/productApprovalList');
        } catch (err) {
            console.error(err.message);
            req.flash('message', 'Something went wrong');
            return res.redirect('/productApprovalList');
        }
    }
}









module.exports = {
    updateProduct,
    updateNewProduct,
    createNewProduct,
    createProduct,
    updateProduct,
    productApprovalList,
    updateProductApprovalStatus,
    uploadBulkProducts

}