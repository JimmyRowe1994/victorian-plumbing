interface Image {
    attributes: {
      imageAltText: string;
    };
    url: string;
}
  
interface Price {
    isOnPromotion?: boolean;
    priceIncTax: number;
}
  
export interface Product {
    id: string;
    image: Image;
    price: Price;
    productName: string;
}