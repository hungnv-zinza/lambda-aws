import { DataSource } from "typeorm";

export async function connectDB() {
  const dataSource = new DataSource({
    type: "mysql",
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    logging: false,
    synchronize: false,
    host:
      process.env.DB_HOST ??
      "tm3-dev-v2.cluster-cnngkl1feko8.ap-northeast-1.rds.amazonaws.com",
    port: +process.env.DB_PORT ?? 3306,
    username: process.env.DB_USERNAME ?? "toremasse3_dev",
    password: process.env.DB_PASSWORD ?? "toremasse3_dev",
    database: process.env.DB_DATABASE ?? "toremasse_v3",
  });
  dataSource.initialize();
  return dataSource;
}
