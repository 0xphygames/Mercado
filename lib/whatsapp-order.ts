export type OrderProduct = 'agua20l' | 'gasP13';

export type PaymentMethod = 'pix' | 'cartao' | 'dinheiro';

export type OrderItem = {
  product: OrderProduct;
  quantity: number;
  unitPrice?: number;
  hasEmptyContainer: boolean;
};

export type WhatsAppOrder = {
  items: OrderItem[];
  neighborhood: string;
  address: string;
  reference?: string;
  paymentMethod: PaymentMethod;
  changeFor?: number;
};

export type WhatsAppOrderResult = {
  message: string;
  url: string;
};

const WHATSAPP_NUMBER = '5586995353043';

const PRODUCT_LABELS: Record<OrderProduct, string> = {
  agua20l: 'Galão de Água Mineral 20L',
  gasP13: 'Botijão de Gás P13',
};

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  pix: 'Pix na entrega',
  cartao: 'Cartão na entrega',
  dinheiro: 'Dinheiro na entrega',
};

export class WhatsAppOrderValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WhatsAppOrderValidationError';
  }
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function validateOrder(order: WhatsAppOrder): void {
  if (!order.items.length) {
    throw new WhatsAppOrderValidationError('Adicione pelo menos um item ao pedido.');
  }

  if (!order.neighborhood.trim()) {
    throw new WhatsAppOrderValidationError('Informe o bairro de entrega.');
  }

  if (!order.address.trim()) {
    throw new WhatsAppOrderValidationError('Informe o endereço de entrega.');
  }

  order.items.forEach((item) => {
    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      throw new WhatsAppOrderValidationError('A quantidade dos itens deve ser maior que zero.');
    }

    if (item.unitPrice !== undefined && (!Number.isFinite(item.unitPrice) || item.unitPrice < 0)) {
      throw new WhatsAppOrderValidationError('O preço dos itens deve ser válido.');
    }
  });

  if (order.paymentMethod === 'dinheiro' && order.changeFor !== undefined) {
    if (!Number.isFinite(order.changeFor) || order.changeFor <= 0) {
      throw new WhatsAppOrderValidationError('Informe um valor de troco válido.');
    }
  }
}

export function buildWhatsAppOrder(order: WhatsAppOrder): WhatsAppOrderResult {
  validateOrder(order);

  const itemLines = order.items.map((item) => {
    const price = item.unitPrice === undefined
      ? ''
      : ` (${formatCurrency(item.unitPrice * item.quantity)})`;
    const container = item.hasEmptyContainer ? 'Tenho vasilhame para troca' : 'Preciso de vasilhame novo';

    return `• ${item.quantity}x ${PRODUCT_LABELS[item.product]}${price}\n  ${container}`;
  });

  const estimatedTotal = order.items.reduce(
    (total, item) => total + (item.unitPrice ?? 0) * item.quantity,
    0,
  );

  const changeLine = order.paymentMethod === 'dinheiro' && order.changeFor !== undefined
    ? `\n💰 Troco para: ${formatCurrency(order.changeFor)}`
    : '';
  const referenceLine = order.reference?.trim() ? `\n• Referência: ${order.reference.trim()}` : '';
  const totalLine = estimatedTotal > 0
    ? `\n💵 Total estimado: ${formatCurrency(estimatedTotal)}`
    : '';

  const message = [
    '🛒 *NOVO PEDIDO - MERCADINHO BRISA MAR*',
    '',
    '📦 *Itens:*',
    itemLines.join('\n'),
    '',
    '📍 *Endereço de entrega:*',
    `• Bairro: ${order.neighborhood.trim()}`,
    `• Endereço: ${order.address.trim()}${referenceLine}`,
    '',
    `💳 *Pagamento:* ${PAYMENT_LABELS[order.paymentMethod]}${changeLine}`,
    totalLine,
    '',
    'Aguardando confirmação de disponibilidade, taxa e prazo de entrega.',
  ].filter(Boolean).join('\n');

  return {
    message,
    url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
  };
}
