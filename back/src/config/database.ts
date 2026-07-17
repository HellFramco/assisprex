import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: false,
  }
);

export const connectDB = async () => {
  const maxRetries = 10;
  const delay = 5000;

  for (let i = 1; i <= maxRetries; i++) {
    try {
      await sequelize.authenticate();
      console.log("Conexión a PostgreSQL OK");

      await sequelize.sync();
      return;
    } catch (eraror) {
      console.error(eraror);
      console.log(`esperando a PostgreSQL -------> ${i}/${maxRetries}...`);

      if (i === maxRetries) {
        console.error("No fue posible conectar con PostgreSQL");
        process.exit(1);
      }

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export default sequelize;
