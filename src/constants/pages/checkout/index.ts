import { CheckoutData } from '@/types/page/checkout';

export const mockCheckoutData: CheckoutData = {
  address: {
    name: 'CV. Maju Bersama',
    street: 'Jl. Raya Bogor No. 123, Depok, Jawa Barat 16424',
    phone: '+62 812-3456-7890',
  },
  orderItems: [
    {
      id: '1',
      name: 'Tepung Singkong',
      description: 'Koperasi Tani Makmur',
      image: '/images/Hero.png',
      price: 12000,
      quantity: 50,
      unit: 'kg',
      subtotal: 1250000,
    },
  ],
  shipping: {
    options: [
      {
        id: 'local',
        name: 'Kurir Lokal',
        description: '1-2 hari kerja',
        price: 25000,
        selected: true,
      },
      {
        id: 'express',
        name: 'Express',
        description: 'Same day (area tertentu)',
        price: 20000,
        selected: false,
      },
    ],
  },
  payment: {
    methods: [
      {
        id: 'qris',
        name: 'QRIS',
        description: 'Bayar dengan scan QR',
        icon: 'qris',
        fee: 0,
        selected: true,
      },
      {
        id: 'bank',
        name: 'Transfer Bank',
        description: 'Transfer manual ke rekening',
        icon: 'bank',
        fee: 0,
        selected: false,
      },
    ],
  },
  summary: {
    subtotal: 1250000,
    shipping: 20000,
    adminFee: 5000,
    total: 1275000,
  },
};
