import "reflect-metadata";
import { DataSource, FindOneOptions } from "typeorm";
import { BlogEntity } from "./entities/blog.entity";
import { importCSV as importCSVBlog } from "./scripts/importCSVBlog";

exports.handler = async (event, context) => {
  try {
    console.log(JSON.stringify(event, null, 2));
    context.succeed("Hello " + event.name);
  } catch (err) {
    console.log(err);
  } finally {
  }
};
