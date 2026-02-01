import httpRequest from '@/services/index';

class CartService {
  public getAll = () => {
    return httpRequest.get('cart/getAll');
  };
}

export default new CartService();
