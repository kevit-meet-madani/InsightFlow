export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  inventoryStatus: string;
  image?: string;
  subtitle?: string;
  icon?: string;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
        id: 1,
        name: 'Bamboo Watch',
        category: 'Accessories',
        price: 65,
        rating: 4.2,
        inventoryStatus: 'INSTOCK',
        image: 'bamboo-watch.jpg',
        subtitle: 'Elegant bamboo watch with leather strap',
      },
      {
        id: 2,
        name: 'Black Watch',
        category: 'Accessories',
        price: 72,
        rating: 4.0,
        inventoryStatus: 'LOWSTOCK',
        image: 'black-watch.jpg',
        subtitle: 'Elegant bamboo watch with leather strap',
      },
      {
        id: 3,
        name: 'Blue Band',
        category: 'Fitness',
        price: 79,
        rating: 3.5,
        inventoryStatus: 'OUTOFSTOCK',
        image: 'blue-band.jpg',
        subtitle: 'Elegant bamboo watch with leather strap',
      }
];
