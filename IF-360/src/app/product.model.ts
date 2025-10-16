export interface Product {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  icon: string;
}

export const SAMPLE_PRODUCTS: Product[] = [
  { id: "1", title: "Wireless Mouse", subtitle: "Electronics · In Stock", price: "$29.99", icon: "🖱️" },
  { id: "2", title: "USB-C Cable", subtitle: "Accessories · In Stock", price: "$12.99", icon: "🔌" },
  { id: "3", title: "SSD 1TB", subtitle: "Storage · Low Stock", price: "$89.99", icon: "💾" },
  { id: "4", title: "Laptop Charger", subtitle: "Accessories · In Stock", price: "$49.99", icon: "🔋" },
  { id: "5", title: "Bluetooth Speaker", subtitle: "Audio · In Stock", price: "$69.99", icon: "🔊" },
  { id: "6", title: "HDMI Cable", subtitle: "Cables · In Stock", price: "$15.99", icon: "📺" },
];
