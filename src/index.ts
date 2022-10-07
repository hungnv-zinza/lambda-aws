import "reflect-metadata";
import { DataSource, FindOneOptions } from "typeorm";
import { BlogEntity } from "./entities/blog.entity";
const AppDataSource = new DataSource({
  type: "mysql",
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  logging: false,
  synchronize: false,
  host: process.env.DB_HOST ?? "tm3-dev-v2.cluster-cnngkl1feko8.ap-northeast-1.rds.amazonaws.com",
  port: +process.env.DB_PORT ?? 3306,
  username: process.env.DB_USERNAME ?? "toremasse3_dev",
  password: process.env.DB_PASSWORD ?? "toremasse3_dev",
  database: process.env.DB_DATABASE ?? "toremasse_v3",
});

setTimeout(async () => {
  await AppDataSource.initialize();
  const BlogRepo = AppDataSource.getRepository(BlogEntity);
  console.log(
    await BlogRepo.findOneBy({
      site_id: 735,
    })
  );
  await AppDataSource.destroy();
}, 0);

exports.handler = async (event, context) => {
  await AppDataSource.initialize();
  const BlogRepo = AppDataSource.getRepository(BlogEntity);
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, " ")
  );
  const params = {
    Bucket: bucket,
    Key: key,
  };
  try {
    console.log(
      await BlogRepo.findOneBy({
        site_id: 735,
      })
    );
  } catch (err) {
    console.log(err);
  } finally {
    await AppDataSource.destroy();
  }
};
