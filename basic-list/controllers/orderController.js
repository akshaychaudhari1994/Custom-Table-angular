const OrdersModel = require("../models/order");
const uuid = require("uuid");

const createOder = async (req, res) => {
  try {
    const body = req.body;

    const order = await OrdersModel.findOne({
      productName: body.productName,
      userName: body.userName,
    }).exec();

    if (order) {
      return res.status(401).json({ message: "Order already exists" });
    }

    const newOrderTobeAdded = {
      id: uuid.v4(),
      productName: body.productName,
      amount: body.amount,
      address: body.address,
      userName: body.userName,
      status: body.status,
    };
    const newOrderDoc = await OrdersModel.create(newOrderTobeAdded);
    const newOrder = await newOrderDoc.save();
    if (!newOrder) {
      return res.status(500).json({ message: "Unable to create order" });
    }

    return res.status(200).json(newOrder);
  } catch (error) {
    console.log(`error in create newOrder ,error : ${error.message}`);
    return res.status(500).json({ message: "internal error" });
  }
};

const getOrderList = async (req, res) => {
  try {
    const query = req.body;
    const searchQuery = query.searchQuery || "";

    let filter = {};

    if (query && "status" in query) {
      filter["status"] = query["status"].toLowerCase();
    }
    if (searchQuery) {
      const query = {
        $or: [
          { productName: { $regex: searchQuery, $options: "i" } },
          { userName: { $regex: searchQuery, $options: "i" } },
          { address: { $regex: searchQuery, $options: "i" } },
        ],
      };
      filter = { ...filter, ...query };
    }

    const sortBy = query.sortBy || "createdAt";
    let sortOrder = -1;
    if (query.sortOrder === "asc") {
      sortOrder = 1;
    }
    const limit = Number(query.limit) || 10;
    const page = query.currentPage || 1;

    const sortQuery = { [sortBy]: sortOrder };
    const countResult = await OrdersModel.countDocuments("_id");
    const result = await OrdersModel.aggregate([
      { $match: filter },

      // { $sort: { [sortBy]: sortOrder } },
      // { $skip: (page - 1) * limit }
      {
        $facet: {
          original: [
            { $count: "totalCount" },
            { $set: { limit: limit } },
            { $set: { currentPage: page } },
          ],
          paginated: [
            {
              $sort: sortQuery,
            },
            { $skip: (page - 1) * limit },
            {
              $limit: limit,
            },
            {
              $project: {
                _id: 0,
              },
            },
          ],
        },
      },
      { $unwind: { path: "$original" } },
      {
        $project: {
          data: "$paginated",
          currentPage: "$original.currentPage",
          totalPages: { $ceil: { $divide: ["$original.totalCount", limit] } },
        },
      },
    ]).exec();

    if (!result) {
      return res.status(500).json({ message: "Unable to get orders" });
    }
    result[0].totalDocs = countResult;

    return res.status(200).json(
      result && result.length > 0
        ? result[0]
        : {
            data: [],
            currentPage: page,
            totalPage: 0,
            totalDocs: 0,
          }
    );
  } catch (error) {
    console.log(`error in orders list ,error : ${error.message}`);
    return res.status(500).json({ message: "internal error" });
  }
};
const getOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "bad request" });
    }
    const query = {
      id,
    };
    const order = await OrdersModel.findOne(query).exec();
    if (!order) {
      return res.status(500).json({ message: "Unable to get order" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log(`error in getOrder ,error : ${error.message}`);
    return res.status(500).json({ message: "internal error" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;

    const body = req.body;
    if (!id) {
      return res.status(400).json({ message: "bad request" });
    }
    const query = {
      id,
    };
    const order = await OrdersModel.findOne(query).exec();
    if (!order) {
      return res.status(500).json({ message: "Unable to get order" });
    }
    if (body && "status" in body) {
      product.status = body.status;
    }
    const updateOrder = await product.save();
    if (!updateOrder) {
      return res.status(500).json({ message: "Unable to update order" });
    }
    return res.status(200).json(updateOrder);
  } catch (error) {
    console.log(`error in updateOrder ,error : ${error.message}`);
    return res.status(500).json({ message: "internal error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "bad request" });
    }
    const query = {
      id,
    };
    const order = await OrdersModel.findOneAndDelete(query).exec();
    return res.status(200).json(order);
  } catch (error) {
    console.log(`error in deleteOrder ,error : ${error.message}`);
    return res.status(500).json({ message: "internal error" });
  }
};

module.exports = {
  createOder,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderList,
};
