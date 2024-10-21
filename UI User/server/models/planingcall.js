import mongoose from "mongoose";

const planingcallSchema = new mongoose.Schema({

    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    }

  }, {
    timestamps: true,
  });
  

const Planingcall = mongoose.model("Planingcall", planingcallSchema);
export default Planingcall;
