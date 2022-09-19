import 'reflect-metadata';
import { app } from './app';
import { AppDataSource } from './infra/typeorm/index';

AppDataSource.initialize().then(() => {
  const server = app.listen(process.env.PORT || 3333, () => {
    console.log(`Server started on port ${process.env.PORT || 3333}! 🏆`);
  });
});
