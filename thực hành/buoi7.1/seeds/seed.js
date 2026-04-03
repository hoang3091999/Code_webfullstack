import roleModel from "../models/roles.js";
import {Action, userResource} from "../permission.js"

export const seedRole = async () => {
  const count = await roleModel.countDocuments();

  if (count === 0) {
    await roleModel.insertMany([
      {
        name: "ADMIN",
        permissions: [
          `${Action.read}:${userResource}`,
          `${Action.write}:${userResource}`,
          `${Action.update}:${userResource}`,
          `${Action.delete}:${userResource}`,
        ],
      },
      {
        name: "USER",
        permissions: [`${Action.read}:${userResource}`],
      },
    ]);
    console.log("seed role done")
  }
};
