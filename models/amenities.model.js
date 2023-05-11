import mongoose from "mongoose";

const amenitiesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true
    },
});

const Amenities = mongoose.model("Amenities",amenitiesSchema);
export default Amenities;