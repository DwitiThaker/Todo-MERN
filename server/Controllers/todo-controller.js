// import { User } from "../models/user-models";
import { Todo } from "../models/todo-models.js";

const created_todo = async (req, res) => {
  try {
    const { userId } = req.user;
    const { title, description } = req.body;

    const created = await Todo.create({
      title,
      description,
      status: "pending",
      user: userId
    });

    return res.status(201).json({ success: true, todo: created });
  } catch (error) {
    console.error("created_todo: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


const read_todo = async (req, res) => {
  try {
    const { userId } = req.user;

    const todoId = req.params.id.toString();

    const view = await Todo.findOne({ _id: todoId, user: userId });
    if (!view)
      return res
        .status(400)
        .json({ success: false, message: "Todo not found" });

    return res.status(200).json({ view, success: true, message: "Reading..." });
  } catch (error) {
    console.error("read_todo: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const read_all_todos = async (req, res) => {
  try {
    const { userId } = req.user; 

    const todos = await Todo.find({ user: userId }).sort({ createdAt: -1 });

    if (!todos || todos.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No todos found",
        todos: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched all todos",
      todos,
    });

  } catch (error) {
    console.error("read_all_todos: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};



const updated_todo = async (req, res) => {
  try {
    const { userId } = req.user;

    const todoId = req.params.id.toString();

    const { title, description, status } = req.body;

    const updateFields = {};

    if (title != undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;

    const updated = await Todo.findByIdAndUpdate(
      { _id: todoId, user: userId },
      { $set: updateFields }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Todo not found ",
      });
    }
    console.log("Update_todo: successfull")
    return res.status(200).json({ updated, success: true, message: "Reading..." });
  } catch (error) {
    console.error("updated_todo: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


const deleted_todo = async (req, res) => {
    try {
    const todoId = req.params.id.toString();

    const deleted = await Todo.findOneAndDelete({ _id: todoId });


    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Todo not found ",
      });
    }
    
    console.log("Delete_todo: successfull")
    return res.status(200).json({ deleted, success: true, message: "Deleted..." });
    } catch (error) {
    console.error("deleted_todo: ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }

} 

export { created_todo, read_todo, updated_todo, deleted_todo , read_all_todos};


