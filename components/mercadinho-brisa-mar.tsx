'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Package, MapPin, Clock, Phone, ArrowRight, ExternalLink, CheckCircle2, ShieldCheck, Waves, Droplets, Flame, Search, Plus } from 'lucide-react';
import Image from 'next/image';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import GoogleReviews from './google-reviews';
import OrderForm from './OrderForm';

const WHATSAPP_NUMBER = '86995353043';
const STORE_LOCATION = { lat: -2.9013541, lng: -41.6201847 };
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
const GOOGLE_MAPS_LINK = 'https://maps.app.goo.gl/TWzoxuSqDiUtStHi9';

export default function MercadinhoBrisaMar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1-6 = Mon-Sat
      const hour = now.getHours();
      
      if (day === 0) { // Sunday
        setIsOpen(hour >= 7 && hour < 14);
      } else { // Mon-Sat
        setIsOpen(hour >= 7 && hour < 20);
      }
    };
    
    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  const generateWhatsAppLink = (message = 'Olá! Gostaria de falar com o Mercadinho Brisa Mar.') => {
    return `https://wa.me/55${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="min-h-screen bg-white text-slate-900 selection:bg-red-100 selection:text-red-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-red-50 rounded-lg border border-red-100 scale-90 sm:scale-100">
              <Waves className="h-4 w-4 text-blue-600" />
              <Droplets className="h-4 w-4 text-blue-400" />
              <Flame className="h-4 w-4 text-orange-500" />
            </div>
            <div className="hidden sm:block h-6 w-px bg-slate-200" />
            <span className="text-xl font-black tracking-tighter text-red-600">
              BRISA MAR
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#fazer-pedido" className="hover:text-red-600 transition-colors whitespace-nowrap">Pedidos</a>
            <a href="#servicos" className="hover:text-red-600 transition-colors whitespace-nowrap">Produtos</a>
            <a href="#avaliacoes" className="hover:text-red-600 transition-colors whitespace-nowrap">Avaliações</a>
            <a href="#contato" className="hover:text-red-600 transition-colors whitespace-nowrap">Contato</a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${isOpen ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
              <div className={`h-1.5 w-1.5 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`} />
              {isOpen ? 'Aberto' : 'Fechado'}
            </div>
            <a
              href="#fazer-pedido"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-black text-white transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 whitespace-nowrap"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">PEDIR AGORA</span>
              <span className="sm:hidden">PEDIR</span>
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
                className="max-w-2xl text-center lg:text-left"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-red-600 border border-red-100">
                  <Package className="h-3.5 w-3.5" />
                  <span>Sua Entrega Rápida em Luís Correia</span>
                </div>
                <h1 className="text-5xl font-black tracking-tight text-slate-900 sm:text-7xl text-wrap-balance mb-6 leading-[1.1]">
                  Água, Gás e <span className="text-red-600 italic">Conveniência</span>
                </h1>
                <p className="text-lg leading-relaxed text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0 font-medium">
                  Praticidade para moradores e turistas. Entregamos em domicílio, pousadas e casas de temporada com a rapidez que o seu dia merece.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#fazer-pedido"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl bg-red-600 px-10 py-5 text-base font-black text-white transition-all hover:bg-red-700 hover:shadow-2xl hover:shadow-red-200"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    FAZER PEDIDO
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <a
                    href={generateWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-10 py-5 text-base font-black text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
                  >
                    <Phone className="h-5 w-5 text-green-600" />
                    WHATSAPP
                  </a>
                </div>
                
                <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Entrega na Praia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Aceitamos PIX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-blue-500" />
                    <span>Qualidade Garantida</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-[4/3] overflow-hidden rounded-[3rem] shadow-2xl lg:aspect-square group"
              >
                <Image
                  src="/assets/aistudio/image_8c39438c.png"
                  alt="Fachada Mercadinho Brisa Mar"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg font-black tracking-tight">Luís Correia - PI</span>
                  </div>
                  <p className="text-white/80 font-bold text-xl leading-tight">O ponto certo para sua conveniência no litoral.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Milestone 1: Order Form Section */}
        <section id="fazer-pedido" className="py-24 bg-white scroll-mt-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-blue-600 border border-blue-100">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  <span>Pedido em 3 Etapas</span>
                </div>
                <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl mb-8 leading-tight">Peça sem <span className="text-red-600">Sair de Casa</span></h2>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                  Atendimento direto via WhatsApp para garantir rapidez. Selecione seus itens, informe o endereço e receba em minutos.
                </p>
                <div className="space-y-6">
                  {[
                    { title: 'Escolha os Produtos', desc: 'Água mineral, gás ou itens de mercearia.' },
                    { title: 'Confirme o Endereço', desc: 'Atendemos em toda a orla e centro.' },
                    { title: 'Pague na Entrega', desc: 'Aceitamos Pix, cartão e dinheiro.' }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-5 group">
                      <div className="h-12 w-12 shrink-0 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black text-xl border border-red-100 transition-colors group-hover:bg-red-600 group-hover:text-white">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-900 mb-1">{step.title}</h4>
                        <p className="text-slate-500 font-medium">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-6 rounded-[4rem] bg-slate-900/5 blur-3xl pointer-events-none" />
                <OrderForm />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Visual Search Placeholder */}
        <section id="servicos" className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl mb-6">Nossos Produtos</h2>
                <p className="text-lg text-slate-600 font-medium">Qualidade e procedência garantida. O essencial para o seu dia a dia.</p>
              </div>
              <div className="relative w-full md:w-96">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="O que você está procurando?" 
                  className="w-full h-14 pl-14 pr-6 rounded-2xl border border-slate-200 bg-white shadow-sm focus:border-red-600 focus:ring-4 focus:ring-red-50 transition-all font-bold text-slate-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {[
                {
                  title: 'Água Mineral (20L)',
                  desc: 'As principais marcas da região. Higiene rigorosa e pureza total.',
                  img: '/assets/images/water.jpg',
                  price: 'Consulte valor',
                  tag: 'Top Vendas'
                },
                {
                  title: 'Gás de Cozinha (P13)',
                  desc: 'Botijão de 13kg com selo de segurança. Instalação profissional inclusa.',
                  img: '/assets/images/gas.jpg',
                  price: 'Consulte valor',
                  tag: 'Entrega Imediata'
                },
                {
                  title: 'Mercadorias Gerais',
                  desc: 'Bebidas geladas, carvão, gelo e mercearia. Temos kits para churrasco, praia e reposição para casas de temporada.',
                  img: '/assets/images/service_grocery_basket_1793835960942.jpg',
                  price: 'Vários itens',
                  tag: 'Conveniência'
                }
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-sm transition-all hover:shadow-2xl hover:border-red-100"
                  onClick={() => {
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
                    <div className="absolute top-6 left-6">
                      <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-red-600 shadow-sm">
                        {service.tag}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/5" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-slate-900 mb-3">{service.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium mb-6">
                      {service.desc}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <span className="text-red-600 font-black text-lg">{service.price}</span>
                      <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <Plus className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Regulatory Placeholders */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/50 border border-slate-200 border-dashed rounded-3xl p-8 flex items-center gap-6 opacity-60">
                <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="h-8 w-8 text-slate-400" />
                </div>
                <div>
                  <h4 className="font-black text-slate-400 uppercase tracking-widest text-xs mb-1">Registro Regulatório</h4>
                  <p className="text-sm font-bold text-slate-400 italic">Revendedor Autorizado ANP (Em validação)</p>
                </div>
              </div>
              <div className="bg-white/50 border border-slate-200 border-dashed rounded-3xl p-8 flex items-center gap-6 opacity-60">
                <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="h-8 w-8 text-slate-400" />
                </div>
                <div>
                  <h4 className="font-black text-slate-400 uppercase tracking-widest text-xs mb-1">Segurança e Qualidade</h4>
                  <p className="text-sm font-bold text-slate-400 italic">Certificado de Qualidade Litorânea (Em validação)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Tour Section */}
        <section id="video-tour" className="py-24 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[16/9] overflow-hidden rounded-[2.5rem] shadow-2xl bg-slate-900 group"
              >
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster="/assets/aistudio/image_8c39438c.png"
                  aria-label="Tour em vídeo do Mercadinho Brisa Mar"
                >
                  <source src="/assets/brand/tour-mercadinho-brisa-mar.mp4" type="video/mp4" />
                  Seu navegador não suporta reprodução de vídeo.
                </video>
              </motion.div>
              
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-600 border border-blue-100">
                  <ExternalLink className="h-4 w-4" />
                  <span>Conteúdo Verificado</span>
                </div>
                <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl mb-8 leading-tight">Transparência em <span className="text-red-600">Tempo Real</span></h2>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                  Veja a organização do nosso mercado e a qualidade dos nossos produtos direto na fonte. Transparência total para sua segurança.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Tour Interno Completo',
                    'Produtos em Estoque',
                    'Entrega Verificada',
                    'Organização Profissional'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="h-2 w-2 rounded-full bg-red-600" />
                      <span className="font-bold text-slate-700 text-sm">{item}</span>
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

            <div className="h-[550px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-200 relative">
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
              <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600">
                    <Clock className="h-7 w-7" />
                  </div>
                  Horário
                </h3>
                <div className="space-y-6 text-slate-600 font-bold">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                    <span className="text-slate-400 uppercase tracking-widest text-[10px]">Segunda a Sábado</span>
                    <span className="text-lg text-slate-900">07h – 20h</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-slate-400 uppercase tracking-widest text-[10px]">Dom e Feriados</span>
                    <span className="text-lg text-slate-900">07h – 14h</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-red-100 flex items-center justify-center text-red-600">
                    <MapPin className="h-7 w-7" />
                  </div>
                  Endereço
                </h3>
                <p className="text-xl text-slate-700 font-black leading-relaxed">
                  Luís Correia, PI<br />
                  Avenida Teresina<br />
                  <span className="text-red-600 mt-6 block text-sm italic underline underline-offset-8 decoration-2">Próximo ao Centro</span>
                </p>
              </div>

              <div className="bg-slate-900 p-12 rounded-[3rem] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <h3 className="text-2xl font-black mb-10 flex items-center gap-3 text-red-500">
                  <Phone className="h-7 w-7" />
                  Atendimento
                </h3>
                <div className="space-y-8">
                  <a
                    href={generateWhatsAppLink()}
                    className="flex items-center gap-6 group"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white transition-all group-hover:scale-110 shadow-lg shadow-green-900/40">
                      <Phone className="h-8 w-8" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">WhatsApp Oficial</div>
                      <div className="text-2xl font-black group-hover:text-red-500 transition-colors">(86) 9 9535-3043</div>
                    </div>
                  </a>
                  
                  <div className="flex gap-4 mt-10">
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
      <footer className="bg-slate-900 py-20 text-center border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-xl border border-white/10 opacity-50">
              <Waves className="h-4 w-4 text-blue-400" />
              <Droplets className="h-4 w-4 text-blue-300" />
              <Flame className="h-4 w-4 text-orange-400" />
            </div>
          </div>
          <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs">© {new Date().getFullYear()} Mercadinho Brisa Mar</p>
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-600 font-bold">
            <MapPin className="h-4 w-4" />
            <span>Luís Correia - Piauí</span>
          </div>
        </div>
      </footer>
      </div>
    </APIProvider>
  );
}
