const planSchema = new mongoose.Schema({
    id : {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 0,
        max: 10
    },
    price: {
        type: Number,
        required: true,
    },
    delivery: Boolean,
    meals: {
        type: Number,
        min: 1
    },
    description: {
        type: String,
    },
});
