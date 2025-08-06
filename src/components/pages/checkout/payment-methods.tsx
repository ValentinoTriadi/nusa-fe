import { Building2, CreditCard, Scan } from 'lucide-react';


import { CheckoutPayment } from '@/types/page/checkout';

export const PaymentMethods = ({
  payment,
  selectedPayment,
  setSelectedPayment,
}: {
  payment: CheckoutPayment;
  selectedPayment: string;
  setSelectedPayment: (_value: string) => void;
}) => {
  return (
    <div className="border-t border-gray-200 p-4 py-6">
      <div className="mb-3 flex items-center gap-2">
        <CreditCard className="text-accent h-7 w-7" />
        <h2 className="text-xl font-semibold text-gray-900">
          Metode Pembayaran
        </h2>
      </div>

      <div className="space-y-3">
        {payment.methods.map((method) => (
          <label
            key={method.id}
            className="flex cursor-pointer items-center justify-between rounded-lg border p-3 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={selectedPayment === method.id}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="h-4 w-4 text-orange-500"
              />
              <div className="flex items-center gap-2">
                {method.icon === 'qris' ? (
                  <Scan className="h-5 w-5 text-purple-600" />
                ) : (
                  <Building2 className="h-5 w-5 text-blue-600" />
                )}
                <div>
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
              </div>
            </div>
            <span className="text-sm font-medium text-green-600">
              {method.fee === 0
                ? 'Gratis'
                : `Rp ${method.fee.toLocaleString()}`}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
