import crypto from "crypto";
import API from "../models/api.js";
import User from "../models/user.js";

export const CreateAPI = async (req, res) => {
  const { id } = req.params;
  const customer = await User.findById(id);
  const customerID = customer.id
  const customerEmail = customer.email
  
  const generateAPIKey = (customerId, email) => {
    const randomString = crypto.randomBytes(16).toString("hex");
    return `web --$${customerId}$--$${email}$--$${randomString}$`;
  };

  const key = generateAPIKey(customerID, customerEmail);

  const randomString = key.split("$--$")[2]?.replace("$", "");

  const KeyAPI = await API.create({
    customerId : customerID,
    customerEmail : customerEmail,
    key,
    randomString,
  });
  res.status(200).send({
    message: "gen API thành công",
    data: KeyAPI,
  });
};
