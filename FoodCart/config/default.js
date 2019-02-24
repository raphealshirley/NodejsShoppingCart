module.export = {
    session:{
        secret: 'FoodCart', 
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }), 
    },
    mongodb:'mongodb://localhost/FoodCart'
};
