'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Droplets, Flame, Package, MapPin, Clock, Phone, ArrowRight, ExternalLink, CheckCircle2, Minus, Plus, Play } from 'lucide-react';
import Image from 'next/image';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import GoogleReviews from './google-reviews';

const WHATSAPP_NUMBER = '86995353043';
const STORE_LOCATION = { lat: -2.9013541, lng: -41.6201847 };
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/TWzoxuSqDiUtStHi9';

export default function MercadinhoBrisaMar() {
  const [order, setOrder] = useState({
    product: 'Água Mineral',
    bairro: 'Praia de Atalaia',
    vasilhame: 'Troca (já tenho galão/botijão)',
    quantity: 1
  });

  const generateWhatsAppLink = () => {
    const message = `Olá! Gostaria de fazer um pedido:
*Produto:* ${order.product}
*Quantidade:* ${order.quantity}
*Bairro:* ${order.bairro}
*Vasilhame:* ${order.vasilhame}

Pode me confirmar o valor total e o tempo de entrega?`;
    return `https://wa.me/55${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const neighborhoods = [
    'Praia de Atalaia', 'Praia do Coqueiro', 'Peito de Moça',
    'Praia de Macapá', 'Centro', 'Bairros Vizinhos'
  ];

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="min-h-screen bg-white text-slate-900 selection:bg-red-100 selection:text-red-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6">
          <div className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg">
              <Image 
                src="/assets/aistudio/image_87ae7aa9.png" 
                alt="Logo MBM" 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-red-600">
              Brisa Mar
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#fazer-pedido" className="hover:text-red-600 transition-colors whitespace-nowrap">Pedir Agora</a>
            <a href="#servicos" className="hover:text-red-600 transition-colors whitespace-nowrap">Serviços</a>
            <a href="#galeria" className="hover:text-red-600 transition-colors whitespace-nowrap">Galeria</a>
            <a href="#avaliacoes" className="hover:text-red-600 transition-colors whitespace-nowrap">Avaliações</a>
            <a href="#video-tour" className="hover:text-red-600 transition-colors whitespace-nowrap">Vídeo</a>
            <a href="#contato" className="hover:text-red-600 transition-colors whitespace-nowrap">Contato</a>
          </nav>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#fazer-pedido"
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 whitespace-nowrap"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Pedir via WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600 border border-red-100">
                  <Package className="h-4 w-4" />
                  <span>Entrega Rápida em Luís Correia</span>
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl text-wrap-balance mb-6 leading-tight">
                  Água e Gás no <span className="text-red-600">Brisa Mar</span>
                </h1>
                <p className="text-lg leading-relaxed text-slate-600 mb-8 max-w-xl">
                  A conveniência que você precisa para suas férias ou dia a dia em Luís Correia. Entregamos água mineral, gás e mercadorias com rapidez e segurança.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#fazer-pedido"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-8 py-5 text-base font-bold text-white transition-all hover:bg-red-700 hover:shadow-2xl hover:shadow-red-200"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Fazer Pedido Agora
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-8 py-5 text-base font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
                  >
                    <Phone className="h-5 w-5 text-green-600" />
                    Falar no WhatsApp
                  </a>
                </div>
                
                <div className="mt-10 flex items-center gap-6 text-sm font-medium text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Entrega na Praia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>Aceitamos PIX</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-2xl lg:aspect-square group"
              >
                <Image
                  src="/assets/aistudio/image_8c39438c.png"
                  alt="Mercadinho Brisa Mar - Fachada Principal"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-red-500" />
                    <span className="font-bold tracking-wide">Avenida Teresina, Luís Correia - PI</span>
                  </div>
                  <p className="text-white/80 font-medium">Sua loja de conveniência completa perto da praia.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Milestone 1: Order Form Section */}
        <section id="fazer-pedido" className="py-24 bg-white scroll-mt-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl mb-6">Peça Agora</h2>
              <p className="text-xl text-slate-600">
                O primeiro passo para sua comodidade. Escolha o que precisa e enviamos direto pelo WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="bg-slate-50 rounded-[2rem] p-8 lg:p-12 border border-slate-100 shadow-sm">
                <div className="space-y-8">
                  {/* Product Choice */}
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-4">1. O que você precisa?</label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: 'Água Mineral', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
                        { name: 'Gás de Cozinha', icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50' }
                      ].map((p) => (
                        <button
                          key={p.name}
                          onClick={() => setOrder({ ...order, product: p.name })}
                          className={`flex flex-col items-center justify-center gap-4 rounded-3xl border-3 p-6 transition-all ${
                            order.product === p.name 
                              ? 'border-red-600 bg-white shadow-xl shadow-red-100 scale-[1.02]' 
                              : 'border-white bg-white/50 text-slate-400 hover:border-slate-200'
                          }`}
                        >
                          <div className={`p-3 rounded-2xl ${order.product === p.name ? p.bg : 'bg-slate-100'}`}>
                            <p.icon className={`h-8 w-8 ${order.product === p.name ? p.color : 'text-slate-300'}`} />
                          </div>
                          <span className="font-black text-lg">{p.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-4">2. Quantas unidades?</label>
                    <div className="flex items-center justify-between rounded-3xl bg-white p-4 border-2 border-white shadow-sm">
                      <button 
                        onClick={() => setOrder({ ...order, quantity: Math.max(1, order.quantity - 1) })}
                        className="h-14 w-14 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <Minus className="h-6 w-6" />
                      </button>
                      <div className="flex flex-col items-center">
                        <span className="text-4xl font-black text-slate-900">{order.quantity}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase">Unidades</span>
                      </div>
                      <button 
                        onClick={() => setOrder({ ...order, quantity: order.quantity + 1 })}
                        className="h-14 w-14 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <Plus className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  {/* Neighborhood Choice */}
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-4">3. Onde entregar?</label>
                    <div className="relative">
                      <select 
                        value={order.bairro}
                        onChange={(e) => setOrder({ ...order, bairro: e.target.value })}
                        className="w-full rounded-3xl border-2 border-white bg-white p-6 font-bold text-slate-700 focus:border-red-600 focus:outline-none appearance-none shadow-sm cursor-pointer"
                      >
                        {neighborhoods.map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                        <MapPin className="h-6 w-6 text-red-500" />
                      </div>
                    </div>
                  </div>

                  {/* Vasilhame */}
                  <div>
                    <label className="block text-sm font-black uppercase tracking-widest text-slate-400 mb-4">4. Possui o vasilhame?</label>
                    <div className="grid grid-cols-1 gap-3">
                      {['Troca (já tenho galão/botijão)', 'Compra (não tenho vasilhame)'].map((v) => (
                        <label 
                          key={v}
                          className={`flex items-center gap-4 rounded-2xl border-2 p-5 cursor-pointer transition-all ${
                            order.vasilhame === v 
                              ? 'border-red-600 bg-white shadow-md' 
                              : 'border-white bg-white/50 hover:border-slate-100'
                          }`}
                        >
                          <input 
                            type="radio" 
                            name="vasilhame" 
                            className="hidden"
                            checked={order.vasilhame === v}
                            onChange={() => setOrder({ ...order, vasilhame: v })}
                          />
                          <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                            order.vasilhame === v ? 'border-red-600 bg-red-600' : 'border-slate-300'
                          }`}>
                            {order.vasilhame === v && <div className="h-2.5 w-2.5 rounded-full bg-white" />}
                          </div>
                          <span className={`font-bold text-lg ${order.vasilhame === v ? 'text-slate-900' : 'text-slate-500'}`}>{v}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-4 rounded-3xl bg-green-600 py-6 text-xl font-black text-white shadow-2xl shadow-green-200 transition-all hover:bg-green-700"
                  >
                    <Phone className="h-7 w-7" />
                    Enviar Pedido Completo
                  </motion.a>
                </div>
              </div>

              {/* Side Card / Summary */}
              <div className="lg:sticky lg:top-24 rounded-[2.5rem] bg-slate-900 p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                
                <div className="mb-10 flex items-center gap-4 border-b border-white/10 pb-8">
                  <div className="h-16 w-16 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/40">
                    <ShoppingCart className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter text-white">Resumo do Pedido</h4>
                    <p className="text-slate-400 font-medium">Tudo pronto para o WhatsApp</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Produto</span>
                    <span className="text-xl font-black text-right">{order.product}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-6">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Quantidade</span>
                    <span className="text-xl font-black">{order.quantity} unidades</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-6 items-start">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Destino</span>
                    <span className="text-xl font-black text-right">{order.bairro}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-6 items-start">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Vasilhame</span>
                    <span className="text-xl font-black text-right">{order.vasilhame}</span>
                  </div>
                </div>

                <div className="mt-16 space-y-5">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                    <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-300">Pague na entrega com PIX, Cartão ou Dinheiro</span>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                    <Clock className="h-6 w-6 text-red-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-300">Entrega rápida em até 40 minutos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Generic Product Images */}
        <section id="servicos" className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl mb-6">Nossos Produtos</h2>
              <p className="text-lg text-slate-600">Qualidade garantida e procedência em cada item entregue na sua porta.</p>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {[
                {
                  title: 'Água Mineral (20L)',
                  desc: 'Galões de 20 litros das melhores marcas. Higiene e pureza para sua família.',
                  icon: Droplets,
                  img: '/assets/images/water.jpg',
                  color: 'text-blue-600',
                  bg: 'bg-blue-50'
                },
                {
                  title: 'Gás de Cozinha (P13)',
                  desc: 'Botijão de 13kg com selo de qualidade. Entrega e instalação segura.',
                  icon: Flame,
                  img: '/assets/images/gas.jpg',
                  color: 'text-orange-600',
                  bg: 'bg-orange-50'
                },
                {
                  title: 'Mercadorias em Geral',
                  desc: 'Bebidas geladas, carvão, gelo e itens básicos de mercearia para o seu dia.',
                  icon: ShoppingCart,
                  img: '/assets/images/service_grocery_basket_1793835960942.jpg',
                  color: 'text-red-600',
                  bg: 'bg-red-50'
                }
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:border-red-100"
                  onClick={() => {
                    setOrder({ ...order, product: service.title.includes('Água') ? 'Água Mineral' : service.title.includes('Gás') ? 'Gás de Cozinha' : order.product });
                    document.getElementById('fazer-pedido')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={service.img}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/5" />
                  </div>
                  <div className="p-8">
                    <div className={`mb-6 inline-flex rounded-2xl ${service.bg} p-3 ${service.color}`}>
                      <service.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Tour Section - Improved Integration */}
        <section id="video-tour" className="py-24 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[16/9] overflow-hidden rounded-[2.5rem] shadow-2xl bg-slate-900 group cursor-pointer"
              >
                <a 
                  href={GOOGLE_MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <Image
                    src="/assets/aistudio/image_acb4bff6.png"
                    alt="Vídeo Tour Mercadinho Brisa Mar"
                    fill
                    className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                    <div className="h-24 w-24 rounded-full bg-red-600 flex items-center justify-center text-white shadow-2xl transition-transform group-hover:scale-110">
                      <Play className="h-10 w-10 fill-current ml-1" />
                    </div>
                    <p className="mt-6 text-white font-black text-xl tracking-tight shadow-sm uppercase">Assistir Tour Completo</p>
                  </div>
                  <div className="absolute bottom-8 left-8 flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-white font-bold text-sm uppercase tracking-widest">Google Local Guide Video</span>
                  </div>
                </a>
              </motion.div>
              
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600 border border-blue-100">
                  <ExternalLink className="h-4 w-4" />
                  <span>Conteúdo Google Maps</span>
                </div>
                <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl mb-8 leading-tight">Transparência em <span className="text-red-600">Tempo Real</span></h2>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                  Clique no vídeo ao lado para ver o tour completo gravado por nossos clientes no Google. Veja a organização do nosso mercado e a qualidade dos nossos produtos direto na fonte.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    'Tour Interno Completo',
                    'Frente do Estabelecimento',
                    'Produtos em Estoque',
                    'Entrega Verificada'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="h-2 w-2 rounded-full bg-red-600" />
                      <span className="font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Photos / Local Guide Gallery - AUTOMATED */}
        <GoogleReviews placeName="Mercadinho Brisa Mar" location={STORE_LOCATION} />

        {/* Map Section */}
        <section id="mapa" className="py-24 bg-slate-50 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl mb-4 leading-tight">Onde <span className="text-red-600">Estamos</span></h2>
                <p className="text-lg text-slate-600 max-w-xl font-medium">
                  Localização estratégica em Luís Correia para garantir que sua água e seu gás cheguem sempre no tempo certo.
                </p>
              </div>
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200 text-red-600 font-black hover:shadow-md transition-all hover:bg-red-50 hover:border-red-100"
              >
                Abrir Rota no GPS
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>

            <div className="h-[550px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-200 relative">
              {GOOGLE_MAPS_API_KEY ? (
                <Map
                  defaultZoom={15}
                  defaultCenter={STORE_LOCATION}
                  mapId="DEMO_MAP_ID"
                  gestureHandling="greedy"
                  disableDefaultUI={false}
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                >
                  <AdvancedMarker position={STORE_LOCATION} title="Mercadinho Brisa Mar">
                    <Pin background={'#dc2626'} borderColor={'#991b1b'} glyphColor={'#ffffff'} scale={1.4} />
                  </AdvancedMarker>
                </Map>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4 bg-slate-900 p-8 text-center text-white">
                  <MapPin className="h-12 w-12 text-red-500" />
                  <p className="max-w-md text-xl font-black">Mercadinho Brisa Mar</p>
                  <p className="text-slate-400 mb-4">Luís Correia - PI</p>
                  <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-red-600 px-8 py-4 text-base font-black text-white hover:bg-red-700 shadow-xl shadow-red-900/20 transition-all">
                    Ver no Google Maps
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact & Hours */}
        <section id="contato" className="py-24 bg-white border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                    <Clock className="h-6 w-6" />
                  </div>
                  Horário
                </h3>
                <div className="space-y-6 text-slate-600 font-bold">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="text-slate-400 uppercase tracking-widest text-xs">Segunda a Sábado</span>
                    <span className="text-lg text-slate-900">07h – 20h</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-slate-400 uppercase tracking-widest text-xs">Dom e Feriados</span>
                    <span className="text-lg text-slate-900">07h – 14h</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                    <MapPin className="h-6 w-6" />
                  </div>
                  Endereço
                </h3>
                <p className="text-xl text-slate-700 font-bold leading-relaxed">
                  Luís Correia, PI<br />
                  Avenida Teresina<br />
                  <span className="text-red-600 mt-4 block text-sm italic underline decoration-2 underline-offset-4">Próximo ao Centro</span>
                </p>
              </div>

              <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3 text-red-500">
                  <Phone className="h-6 w-6" />
                  Contato
                </h3>
                <div className="space-y-6">
                  <a
                    href={generateWhatsAppLink()}
                    className="flex items-center gap-5 group"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white transition-all group-hover:scale-110 shadow-lg shadow-green-900/40">
                      <Phone className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-black tracking-widest mb-1">WhatsApp</div>
                      <div className="text-xl font-black group-hover:text-red-500 transition-colors">(86) 9 9535-3043</div>
                    </div>
                  </a>
                  
                  <div className="flex gap-4 mt-8">
                    <a href={GOOGLE_MAPS_LINK} target="_blank" rel="noopener noreferrer" className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white/10 text-white hover:bg-red-600 transition-all hover:scale-110">
                      <MapPin className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 text-center border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl mx-auto mb-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer">
            <Image 
              src="/assets/aistudio/image_87ae7aa9.png" 
              alt="Logo MBM Footer" 
              fill 
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-slate-500 font-bold">© {new Date().getFullYear()} Mercadinho Brisa Mar. Todos os direitos reservados.</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-slate-600 font-medium">
            <MapPin className="h-4 w-4" />
            <span>Luís Correia - Piauí</span>
          </div>
        </div>
      </footer>
      </div>
    </APIProvider>
  );
}
