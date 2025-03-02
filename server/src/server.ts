import app from "./app";
import logger from "./utils/logger";

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  console.log(`Server is running on port ${PORT}`);
});
