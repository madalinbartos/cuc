import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id!: string;

  @PrimaryGeneratedColumn('uuid')
  uuid!: string;

  @Column({ nullable: false, length: 20 })
  name!: string;

  @Column({ nullable: false, length: 200 })
  description!: string;

  @CreateDateColumn({ nullable: false })
  createdAt!: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt!: Date;
}
