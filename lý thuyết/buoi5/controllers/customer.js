import customerModel from "../models/customer.js";

export const CreateCustomer = async (req, res) => {
  try {
    const { name, age, address, email } = req.body;
    const newCustomer = new customerModel({
      name,
      age,
      address,
      email,
    });
    await newCustomer.save()
    res.status(201).send(newCustomer);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
};

export const GetCustomer = async (req, res) => {
    try {
        const customers = await customerModel.find()
        res.status(201).send(customers)
    }
    catch (error) {
        res.status(404).send({message: error.message})
    }
}

