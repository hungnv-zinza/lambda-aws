import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

// import { BlogCategoryIdsEntity } from "./blogCategoryIds.entity";
import { CategoryEntity } from "./category.entity";
import {
  IsArray,
  IsEmpty,
  IsInt,
  IsOptional,
  Min,
  ValidateIf,
} from "class-validator";
import { ImageEntity } from "./image.entity";
import { Transform, Type } from "class-transformer";

@Entity({ name: "blogs" })
@Index(["site_id", "id"], { unique: true })
export class BlogEntity {
  @IsEmpty()
  @PrimaryGeneratedColumn({ type: "int", name: "internal_id" })
  internal_id: number;

  @IsEmpty()
  @Column("int", { name: "site_id", nullable: false })
  site_id: number;

  @Column("int", { name: "id", nullable: false, default: 0 })
  id: number;

  @Column("text", { name: "title", nullable: true })
  title: string | null;

  @Column("longtext", { name: "content", nullable: true })
  content: string | null;

  @Column("varchar", { name: "url_name", nullable: true, length: 255 })
  url_name: string | null;

  @ValidateIf((q) => q.date)
  @Type(() => Date)
  @Column("date", { name: "date", nullable: true })
  date: Date | null;

  @Column("tinyint", { name: "status", nullable: true })
  status: number | null;

  @IsOptional()
  @IsArray()
  category_ids: number[] | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform((value) => (value ? parseInt(value) || null : null))
  @Column("varchar", { name: "image_id", nullable: true })
  image_id: number | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp", nullable: true })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  updated_at: Date;

  @Column("tinyint", { name: "delete_flag", width: 1, default: 0 })
  delete_flag: number;

  @ManyToMany(() => CategoryEntity, (CategoryEntity) => CategoryEntity.blogs, {
    cascade: true,
  })
  @JoinTable({
    name: "blog_categories",
    joinColumn: {
      name: "blog_id",
    },
    inverseJoinColumn: {
      name: "category_id",
    },
  })
  categories: CategoryEntity[];

  @ManyToOne(() => ImageEntity, {
    cascade: true,
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "image_id" })
  image: ImageEntity;
}
