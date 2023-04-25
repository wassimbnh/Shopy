// coffe : price_1Mx9jIEXYQfbBZFa9YQ6aWIM
// sunglasses : price_1Mx9nYEXYQfbBZFaxzwbXYPs
//camera :price_1Mx9qhEXYQfbBZFaMd2T2Yg2


const productsArray = [
    {
        
        id:"price_1MxYrrEXYQfbBZFacmhm7QfO",
        ident:1,
        title:"T-shirt",
        img:"T-shirt.jpg",
        price :45.99
    },
    {
        id:"price_1MxYsTEXYQfbBZFawbRuVC62",
        ident:2,
        title:"Jacket",
        img: "jacket.jpg",
        description:"Lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu",
        price : 119.99
    },
    {
        id:"price_1MxYu7EXYQfbBZFaAhkoiFau",
        title:"Black Shirt",
        ident:3,
        img:'blackshirt.jpg',
        description:"Lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu",
        price : 11.99
    },
    {
        id:"price_1MxYvrEXYQfbBZFanKrDWaFd",
        ident:4,
        title:"Jeans",
        img:"jeans.jpg",
        description:"Lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu",
        price : 44.99
    },
    {
        id:"price_1MxYwrEXYQfbBZFa6d3gqbf6",
        title:"Sweater",
        ident: 5,
        img:"sweater.jpg",
        description:"Lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu",
        price : 25.99
    },
    {
        id:"price_1MxYxnEXYQfbBZFa8h3ClwDr",
        title:"SweatShirt",
        ident:6,
        description:"Lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu lorem ipsu",
        img:"sweatshirt.jpg",
        price : 15.99
    }
]

function getProductData(id) {
    let productData = productsArray.find(product => product.id ===id)

    if (productData === undefined){
        console.log("Product data does not exists")
        return undefined;
    }

    return productData;
}

function getProductDataByIdent(ident) {
    let productData = productsArray.find(product => product.ident === ident)

    if (productData === undefined){
        console.log("Product data does not exists")
        return undefined;
    }

    return productData;
}
export {productsArray, getProductData, getProductDataByIdent }; 