const Material = require('../modules/Material');
const Stock = require('../modules/Stock');
const Employee = require('../modules/Employee');
const Owner = require('../modules/Owner');
const {  isExistNid } = require('../helper/helperFunctions');

const registerMaterial = async(materialDetails)=>{
    try {

        const {name, price} = materialDetails;
        if(!name || !price){
            throw new Error("you must provide name and price of product");
        }
        const material = new Material({
            ...materialDetails
        });

        return await material.save();
    } catch (error) {
        throw new Error(error.message)
    }
}

const importExportMaterial = async(materialDetails, type, employee)=>{


    try {
        const infoMaterial = await Material.findOne({mid: materialDetails.mid});

        if(!infoMaterial){
            throw new Error("invalid material id");
        }

        let alredyRegistedInStock = false
        const stockMat = await Stock.findOne({mid: infoMaterial.mid})

        if(stockMat){
            alredyRegistedInStock = true
        };

        let stock = null;

        switch(type){
            case 'min':
                if(!alredyRegistedInStock){
                    stock = new Stock({
                        ...{
                            mid : infoMaterial.mid,
                            name: infoMaterial.name,
                            quantity: parseInt(materialDetails.quantity),
                            unityPrice: parseInt(pinfoMaterial.price),
                            uid: employee.uid,
                            owner: employee.owner
                        }
                    });

                    return await stock.save();
                }

                stock = await Stock.findOne({mid: infoMaterial.mid})
                stock.quantity = stock.quantity + parseInt(materialDetails.quantity);

                return await stock.save();

            case 'mout':

                if(!alredyRegistedInStock){
                    throw new Error("this material was not registed in this stock");
                }

                stock = await Stock.findOne({mid: infoMaterial.mid});
                stock.quantity = stock.quantity - materialDetails.quantity;

                return await stock.save();
            default:
                return;
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    registerMaterial,
    importExportMaterial
}
