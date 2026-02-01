import CartService from '@/services/api/cart';

export const useCart = defineStore('cart', () => {
  const [isCartMenuOpen, setCartMenuOpen] = useAppState(false);
  const cartItems = ref<CartProduct[]>([]);

  const { getItem, setItem } = useStorage('session');

  const totalAmount = computed(() =>
    cartItems.value.reduce((total, item) => total + Number(item.price) * item.quantity, 0),
  );

  function addToCart(product: CartProduct) {
    const generateUid = (product: CartProduct) => `${product.id}-${product.color}-${product.size}`;

    const targetUid = generateUid(product);

    const existingItem = cartItems.value.find(item => generateUid(item) === targetUid);

    if (existingItem) existingItem.quantity++;
    else cartItems.value.push({ ...product, uid: targetUid });

    setCartMenuOpen(true);
    setItem('cartItems', cartItems.value);

    setTimeout(() => {
      setCartMenuOpen(false);
    }, 5000);
  }

  function removeCartItem(uid: string) {
    cartItems.value = cartItems.value.filter(item => item.uid !== uid);

    setItem('cartItems', cartItems.value);

    if (cartItems.value.length === 0) setCartMenuOpen(false);
  }

  async function getAll() {
    const addedItems = getItem('cartItems');

    if (!addedItems) {
      cartItems.value = [];

      return;
    }

    try {
      cartItems.value = JSON.parse(addedItems) as CartProduct[];
    } catch (e) {
      cartItems.value = [];
    }
  }

  return {
    isCartMenuOpen,
    cartItems,
    totalAmount,

    setCartMenuOpen,
    addToCart,
    removeCartItem,
    getAll,
  };
});
