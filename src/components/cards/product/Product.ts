export interface Product {
  name: string;
  image: string;
  price: string;
  /*Later user type can place */
  profile: {
    userType: string;
    userName: string;
    userIcon: string;
    verified: boolean;
  };
}
