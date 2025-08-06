export interface CheckoutAddress {
  name: string;
  street: string;
  phone: string;
}

export interface CheckoutOrderItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  unit: string;
  subtotal: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  selected: boolean;
}

export interface CheckoutShipping {
  options: ShippingOption[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  fee: number;
  selected: boolean;
}

export interface CheckoutPayment {
  methods: PaymentMethod[];
}

export interface CheckoutSummary {
  subtotal: number;
  shipping: number;
  adminFee: number;
  total: number;
}

export interface CheckoutData {
  address: CheckoutAddress;
  orderItems: CheckoutOrderItem[];
  shipping: CheckoutShipping;
  payment: CheckoutPayment;
  summary: CheckoutSummary;
}
