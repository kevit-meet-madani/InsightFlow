import { Product } from 'src/products/product.entity';
import { Entity, Column, OneToOne, JoinColumn, BaseEntity, PrimaryColumn } from 'typeorm';


@Entity({ name: 'inventory' })
export class Inventory extends BaseEntity {

  @PrimaryColumn()
  id:number;

  @JoinColumn()
  product: Product;

  @Column({ type: 'int' })
  quantityAvailable: number;

  @Column({ nullable: true })
  warehouseLocation: string;

  @Column({ type: 'int', default: 5 })
  threshold: number;
}
