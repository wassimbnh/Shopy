const stripe = require('stripe')(process.env.STRIPE_SERCRET_KEY);
require('dotenv').config()


const payment = async(req,res) =>{
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    //show the user the session that stripe create for them
    res.send(JSON.stringify({ 
        url: session.url
    }));
}



module.exports = payment;