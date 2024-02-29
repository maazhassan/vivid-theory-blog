import { DataTypes, Sequelize, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export class blog extends Model<InferAttributes<blog>, InferCreationAttributes<blog>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare slug: string;
  declare content: string;
  declare image: string;
  declare published_at: CreationOptional<Date>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare deleted_at: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
  blog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      published_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    }
  );
};