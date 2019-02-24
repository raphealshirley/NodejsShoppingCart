module.exports = function Cart(oldCart){ 
    this.items = oldCart.items || {};
    this.totalPrice = oldCart.totalPrice || 0;

    //add new produc to the cart
    this.add = function(item, id){ 
        var storedItem = this.items[id];
        if(!storedItem){
            storedItem = this.items[id] = { item: item, qty:0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalPrice += storedItem.item.price;

    }

    //remove the item from the cart
    this.removeItem = function(id){
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };

    //decrese product number in cart
    this.reduce = function(id){
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalPrice -= this.items[id].item.price;

        if(this.items[id].qty <= 0){
            delete this.items[id];
        }
    };

    //convert cart into array
    this.generateArray = function(){ 
        var arr = [];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
    
    //clean cart
    this.clean = function(){
        this.items = {};
        this.totalPrice = 0;
        oldCart.items = {};
        oldCart.totalPrice = 0;
    }
};
