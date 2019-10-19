import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  AllowNull,
} from 'sequelize-typescript';
import Challenge from './Challenge';

@Table({ timestamps: false })
class File extends Model<File> {
  static existsFilename = async (filename: string) =>
    (await File.count({ where: { filename } })) > 0

  static removeByFilename = (filename: string) => File.destroy({ where: { filename } });

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  filename: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  originalname: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  path: string;

  @AllowNull(false)
  @Column
  size: number;

  @ForeignKey(() => Challenge)
  @Column
  challengeId: number;

  @BelongsTo(() => Challenge)
  challenge: Challenge;
}

export default File;
