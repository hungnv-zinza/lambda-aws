import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  AfterLoad,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
  Index,
} from "typeorm";

import { MaxLength, IsOptional, IsEmpty } from "class-validator";

@Entity({ name: "images" })
@Index(["site_id", "id"], { unique: true })
export class ImageEntity {
  @IsEmpty()
  @PrimaryGeneratedColumn({ type: "int", name: "internal_id" })
  internal_id: number;

  @IsEmpty()
  @Column("int", { name: "site_id", nullable: false })
  site_id: number;

  @Column("int", { name: "id", nullable: false, default: 0 })
  id: number;

  @IsOptional()
  @Column("int", { name: "creator_id", nullable: true })
  creator_id: number | null;

  @IsOptional()
  @MaxLength(255)
  @Column("varchar", { name: "title", nullable: true, length: 255 })
  title: string | null;

  @IsOptional()
  @Column("varchar", { name: "source", length: 255 })
  source: string | null;

  @CreateDateColumn({ name: "created_at", type: "timestamp", nullable: true })
  created_at: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  updated_at: Date;

  @Column("tinyint", { name: "delete_flag", width: 1, default: 0 })
  delete_flag: boolean;
}
