import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  IsEmpty,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import { ECategoryGroup } from "../enum/categoryGroup.enum";
import { BlogEntity } from "./blog.entity";

@Entity({ name: "categories" })
@Index(["site_id", "id"], { unique: true })
export class CategoryEntity {
  @IsEmpty()
  @PrimaryGeneratedColumn({ type: "int", name: "internal_id" })
  internal_id: number;

  @IsEmpty()
  @Column("int", { name: "site_id", nullable: false })
  site_id: number;

  @Column("int", { name: "id", nullable: false, default: 0 })
  id: number;

  @IsString()
  @MaxLength(255)
  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @IsOptional()
  @IsInt()
  @Column("int", { name: "parent_id", default: 0 })
  parent_id: number;

  @IsOptional()
  @IsInt()
  @Column("tinyint", { name: "display_order", nullable: true, default: 0 })
  display_order: number | null;

  @IsIn([1, 2])
  @Column("tinyint", { name: "type", nullable: true })
  @Index()
  type: number | null;

  @IsIn([0, 1, 2, 3])
  @Column("tinyint", {
    name: "category_group_id",
    default: ECategoryGroup.area,
  })
  category_group_id: number | null;

  @IsOptional()
  label: string | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp", nullable: true })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  updated_at: Date;

  @Column("tinyint", { name: "delete_flag", width: 1, default: 0 })
  @Index()
  delete_flag: number;

  @ManyToMany(() => BlogEntity, (BlogEntity) => BlogEntity.categories, {
    eager: false,
  })
  blogs: BlogEntity[];
}
