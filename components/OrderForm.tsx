'use client';

import { FormEvent, useState } from 'react';
import {
  buildWhatsAppOrder,
  OrderProduct,
  PaymentMethod,
  WhatsAppOrderValidationError,
} from '@/lib/whatsapp-order';

type ProductState = {
  selected: boolean;
  quantity: number;
  hasEmptyContainer: boolean;
};

const initialProducts: Record<OrderProduct, ProductState> = {
  agua20l: { selected: false, quantity: 1, hasEmptyContainer: true },
  gasP13: { selected: false, quantity: 1, hasEmptyContainer: true },
  mercadorias: { selected: false, quantity: 1, hasEmptyContainer: false },
};

const productLabels: Record<OrderProduct, string> = {
  agua20l: 'Água mineral 20L',
  gasP13: 'Gás de cozinha P13',
  mercadorias: 'Mercadorias em geral',
};

const neighborhoods = [
  'Residencial Brisa Mar',
  'Peito de Moça',
  'Coqueiro',
  'Atalaia',
  'Macapá',
  'Centro',
  'Barro Preto',
  'Outro bairro',
];

export default function OrderForm() {
  const [products, setProducts] = useState(initialProducts);
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [reference, setReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [changeFor, setChangeFor] = useState('');
  const [merchandiseRequest, setMerchandiseRequest] = useState('');
  const [error, setError] = useState('');

  function updateProduct(product: OrderProduct, patch: Partial<ProductState>) {
    setProducts((current) => ({
      ...current,
      [product]: { ...current[product], ...patch },
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    try {
      const items = (Object.keys(products) as OrderProduct[])
        .filter((product) => products[product].selected)
        .map((product) => ({
          product,
          quantity: products[product].quantity,
          hasEmptyContainer: products[product].hasEmptyContainer,
        }));

      const order = buildWhatsAppOrder({
        items,
        neighborhood,
        address,
        reference,
        paymentMethod,
        changeFor: paymentMethod === 'dinheiro' && changeFor ? Number(changeFor) : undefined,
        merchandiseRequest,
      });

      window.open(order.url, '_blank', 'noopener,noreferrer');
    } catch (validationError) {
      setError(validationError instanceof WhatsAppOrderValidationError
        ? validationError.message
        : 'Confira os dados do pedido e tente novamente.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8" noValidate>
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-wider text-red-600">Pedido rápido</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">Peça Água, Gás ou Mercadorias</h2>
        <p className="mt-2 text-sm text-slate-600">Peça produtos prontos ou solicite um orçamento de mercadorias pelo WhatsApp.</p>
      </div>

      <fieldset className="space-y-4">
        <legend className="mb-3 text-sm font-bold text-slate-900">1. Escolha os produtos</legend>
        {(Object.keys(products) as OrderProduct[]).map((product) => {
          const state = products[product];
          return (
            <div key={product} className="rounded-2xl border border-slate-200 p-4">
              <label className="flex cursor-pointer items-center gap-3 font-semibold text-slate-900">
                <input
                  type="checkbox"
                  checked={state.selected}
                  onChange={(event) => updateProduct(product, { selected: event.target.checked })}
                  className="h-5 w-5 accent-red-600"
                />
                {productLabels[product]}
              </label>
              {state.selected && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {product === 'mercadorias' ? (
                    <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                      O que você deseja cotar?
                      <textarea
                        value={merchandiseRequest}
                        onChange={(event) => setMerchandiseRequest(event.target.value)}
                        placeholder="Ex.: 2 caixas de cerveja, gelo, carvão, frutas e itens para churrasco"
                        rows={3}
                        className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900"
                      />
                    </label>
                  ) : (
                    <>
                  <label className="text-sm font-medium text-slate-700">
                    Quantidade
                    <input
                      type="number"
                      min="1"
                      value={state.quantity}
                      onChange={(event) => updateProduct(product, { quantity: Number(event.target.value) })}
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900"
                    />
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 sm:items-end sm:pb-2">
                    <input
                      type="checkbox"
                      checked={state.hasEmptyContainer}
                      onChange={(event) => updateProduct(product, { hasEmptyContainer: event.target.checked })}
                      className="h-4 w-4 accent-red-600"
                    />
                    Tenho vasilhame para troca
                  </label>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </fieldset>

      <div className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Bairro de entrega
          <select value={neighborhood} onChange={(event) => setNeighborhood(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-900">
            <option value="">Selecione seu bairro</option>
            {neighborhoods.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Endereço completo
          <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Rua, número e complemento" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-3 text-slate-900" />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Ponto de referência <span className="font-normal text-slate-400">(opcional)</span>
          <input value={reference} onChange={(event) => setReference(event.target.value)} placeholder="Ex.: próximo à praça" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-3 text-slate-900" />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Forma de pagamento
          <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-slate-900">
            <option value="pix">Pix na entrega</option>
            <option value="cartao">Cartão na entrega</option>
            <option value="dinheiro">Dinheiro na entrega</option>
          </select>
        </label>

        {paymentMethod === 'dinheiro' && (
          <label className="block text-sm font-medium text-slate-700">
            Troco para quanto? <span className="font-normal text-slate-400">(opcional)</span>
            <input type="number" min="0" step="0.01" value={changeFor} onChange={(event) => setChangeFor(event.target.value)} placeholder="R$ 0,00" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-3 text-slate-900" />
          </label>
        )}
      </div>

      {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}

      <button type="submit" className="mt-6 w-full rounded-xl bg-[#25D366] px-5 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-green-200">
        Enviar pedido no WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">A equipe confirma disponibilidade, taxa e prazo pelo WhatsApp.</p>
    </form>
  );
}
