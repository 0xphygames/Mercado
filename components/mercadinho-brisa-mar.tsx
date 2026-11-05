'use client';

import { motion } from 'motion/react';
import { ShoppingCart, Droplets, Flame, Package, MapPin, Clock, Phone, ArrowRight, Instagram, Facebook, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import GoogleReviews from './google-reviews';

const WHATSAPP_NUMBER = '86995353043';
const WHATSAPP_LINK = `https://wa.me/55${WHATSAPP_NUMBER}?text=Olá! Gostaria de fazer um pedido.`;
const STORE_LOCATION = { lat: -2.9013541, lng: -41.6201847 };
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export default function MercadinhoBrisaMar() {
  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="min-h-screen bg-white text-slate-900 selection:bg-red-100 selection:text-red-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-red-600">
              Brisa Mar
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#servicos" className="hover:text-red-600 transition-colors whitespace-nowrap">Serviços</a>
            <a href="#galeria" className="hover:text-red-600 transition-colors whitespace-nowrap">Galeria</a>
            <a href="#avaliacoes" className="hover:text-red-600 transition-colors whitespace-nowrap">Avaliações</a>
            <a href="#video-tour" className="hover:text-red-600 transition-colors whitespace-nowrap">Vídeo</a>
            <a href="#como-funciona" className="hover:text-red-600 transition-colors whitespace-nowrap">Como Funciona</a>
            <a href="#regioes" className="hover:text-red-600 transition-colors whitespace-nowrap">Regiões</a>
            <a href="#contato" className="hover:text-red-600 transition-colors whitespace-nowrap">Contato</a>
          </nav>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-200 whitespace-nowrap"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Pedir Agora</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-600">
                  <Package className="h-4 w-4" />
                  <span>Entrega Rápida em Luís Correia</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl text-wrap-balance mb-6">
                  Sua Entrega Rápida em <span className="text-red-600">Luís Correia</span>
                </h1>
                <p className="text-lg leading-relaxed text-slate-600 mb-8 max-w-xl">
                  Água mineral, gás de cozinha e compras de supermercado entregues na sua casa, pousada ou casa de praia. Praticidade para suas férias ou dia a dia.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-red-700 hover:shadow-xl hover:shadow-red-200"
                  >
                    Pedir pelo WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#servicos"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50"
                  >
                    Ver Serviços
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-video overflow-hidden rounded-3xl shadow-2xl lg:aspect-square"
              >
                <Image
                  src="/assets/aistudio/image_8c39438c.png"
                  alt="Mercadinho Brisa Mar - Fachada Real"
                  fill
                  className="object-cover"
                  priority
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Store Gallery / Real Photos Section */}
        <section id="galeria" className="py-24 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">Conheça o Brisa Mar</h2>
              <p className="text-slate-600">Fotos reais do nosso estabelecimento e região.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative h-[300px] overflow-hidden rounded-3xl shadow-xl"
              >
                <Image
                  src="/assets/aistudio/image_8c39438c.png"
                  alt="Fachada Mercadinho Brisa Mar"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-red-600">Nossa Loja</div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative h-[300px] overflow-hidden rounded-3xl shadow-xl"
              >
                <Image
                  src="/assets/aistudio/image_87ae7aa9.png"
                  alt="MBM - Identidade Visual"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-red-600">Marca MBM</div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative h-[300px] overflow-hidden rounded-3xl shadow-xl"
              >
                <Image
                  src="/src/assets/images/hero_luis_correia_beach_road_1793835959263.jpg"
                  alt="Luís Correia"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 px-3 py-1 text-xs font-bold text-red-600">Nossa Região</div>
              </motion.div>
            </div>
            
            <div className="mt-8 rounded-2xl bg-white p-8 border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-2 italic">&quot;Entrega rápida e atendimento nota 10!&quot;</h3>
              <p className="text-slate-600">
                Onde você estiver em Luís Correia, o Brisa Mar chega com o que você precisa. Do centro às praias mais distantes, seu pedido é nossa prioridade.
              </p>
            </div>
          </div>
        </section>

        {/* Video Tour Section */}
        <section id="video-tour" className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-video overflow-hidden rounded-3xl shadow-2xl bg-slate-900 group cursor-pointer"
              >
                <a 
                  href="https://www.google.com/maps/place/Mercadinho+Brisa+Mar/@-2.9013541,-41.6201847,3a,75y,90t/data=!3m8!1e5!3m6!1sCIHM0ogKEICAgIDZxqHvXw!2e10!3e10!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FANWiy9RzIPwG5l72fWpdTZCp-me2XMu_XlZrHP1t940Vc_jwPgUYdhS5gZtLQGFtZl3Mq3zJGR9lMLye7IzyEHRJqVh9m2vX1HVMFgsJo97EPQHhMXvMTcscDM3Jdy9bd8UH2OsMTBDJ%3Dw518-h298-k-no!7i640!8i368!4m17!1m7!3m6!1s0x7ec231532d3ae0f:0x9d402c89ae221302!2sMercadinho+Brisa+Mar!8m2!3d-2.9013541!4d-41.6201847!16s%2Fg%2F11qb3vq5n1!3m8!1s0x7ec231532d3ae0f:0x9d402c89ae221302!8m2!3d-2.9013541!4d-41.6201847!10e5!14m1!1BCgIgARICCAQ!16s%2Fg%2F11qb3vq5n1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/assets/aistudio/image_8c39438c.png"
                    alt="Vídeo Tour Mercadinho Brisa Mar"
                    fill
                    className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full bg-red-600 flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-125">
                      <Phone className="h-8 w-8 fill-current rotate-90" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-sm font-bold uppercase tracking-wider mb-1">Vídeo em Destaque</p>
                    <h4 className="text-xl font-bold">Assista ao nosso Tour no Google</h4>
                  </div>
                </a>
              </motion.div>
              
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">Transparência e Qualidade</h2>
                <p className="text-lg text-slate-600 mb-8">
                  Assista ao vídeo da nossa unidade e veja de perto como cuidamos do seu pedido. No Mercadinho Brisa Mar, a qualidade do atendimento começa antes mesmo da entrega.
                </p>
                <div className="space-y-4">
                  {[
                    'Ambiente limpo e organizado',
                    'Atendimento personalizado',
                    'Produtos selecionados',
                    'Logística de entrega eficiente'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-slate-700">
                      <div className="h-2 w-2 rounded-full bg-red-600" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section id="mapa" className="py-24 bg-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">Nossa Localização</h2>
                <p className="text-slate-600 max-w-xl">
                  Estamos localizados no coração de Luís Correia para servir você melhor. Use o mapa abaixo para ver onde estamos ou traçar sua rota.
                </p>
              </div>
              <a
                href="https://maps.app.goo.gl/TWzoxuSqDiUtStHi9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red-600 font-bold hover:underline"
              >
                Abrir no Google Maps
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="h-[450px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100 relative">
              <Map
                defaultZoom={15}
                defaultCenter={STORE_LOCATION}
                mapId="DEMO_MAP_ID"
                gestureHandling="greedy"
                disableDefaultUI={false}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              >
                <AdvancedMarker position={STORE_LOCATION} title="Mercadinho Brisa Mar">
                  <Pin background={'#dc2626'} borderColor={'#991b1b'} glyphColor={'#ffffff'} scale={1.2} />
                </AdvancedMarker>
              </Map>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servicos" className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">Nossos Serviços</h2>
              <p className="text-slate-600">Tudo o que você precisa com a conveniência de receber em casa.</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  title: 'Água Mineral (20L)',
                  desc: 'Entrega ágil de galões das principais marcas locais para sua hidratação.',
                  icon: Droplets,
                  img: '/src/assets/images/service_mineral_water_20l_1793835960305.jpg',
                  color: 'text-blue-600',
                  bg: 'bg-blue-50'
                },
                {
                  title: 'Gás de Cozinha (P13)',
                  desc: 'Entrega rápida com instalação segura para sua casa ou pousada.',
                  icon: Flame,
                  img: '/src/assets/images/service_gas_cylinder_p13_1793835960158.jpg',
                  color: 'text-orange-600',
                  bg: 'bg-orange-50'
                },
                {
                  title: 'Mercadorias em Geral',
                  desc: 'Alimentos, bebidas geladas, carvão, gelo e utilidades de praia.',
                  icon: ShoppingCart,
                  img: '/src/assets/images/service_grocery_basket_1793835960942.jpg',
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
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all hover:border-red-100 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={service.img}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <div className={`mb-4 inline-flex rounded-lg ${service.bg} p-2 ${service.color}`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-500">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Automatic Google Reviews Section */}
        <GoogleReviews placeName="Mercadinho Brisa Mar" location={STORE_LOCATION} />

        {/* How It Works */}
        <section id="como-funciona" className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
          <div className="mx-auto max-w-7xl px-6 relative z-10">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Como Funciona</h2>
              <p className="text-slate-400">Pedir é simples e rápido.</p>
            </div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              {[
                { step: '01', title: 'Escolha os itens', desc: 'Veja nosso catálogo ou envie sua lista de compras pelo WhatsApp.' },
                { step: '02', title: 'Chame no WhatsApp', desc: 'Clique no botão verde e envie seu pedido para nossa equipe.' },
                { step: '03', title: 'Receba no endereço', desc: 'Entregamos rápido! Pague no PIX, cartão ou dinheiro na entrega.' }
              ].map((item, i) => (
                <div key={item.step} className="relative">
                  <div className="mb-6 text-5xl font-black text-red-600/20">{item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Regions Served */}
        <section id="regioes" className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">Regiões Atendidas</h2>
              <p className="text-lg text-slate-600 mb-10">
                Garantimos a entrega mais rápida de Luís Correia, atendendo residências, pousadas e casas de temporada em toda a orla e centro.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {[
                  'Praia de Atalaia', 'Praia do Coqueiro', 'Peito de Moça',
                  'Praia de Macapá', 'Centro', 'Bairros Vizinhos'
                ].map((region) => (
                  <div key={region} className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-slate-700 transition-colors hover:bg-red-50">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <span className="font-semibold">{region}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Hours */}
        <section id="contato" className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-red-600" />
                  Horário de Atendimento
                </h3>
                <div className="space-y-3 text-slate-600">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span>Segunda a Sábado</span>
                    <span className="font-semibold text-slate-900">07:00 – 20:00</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span>Domingos e Feriados</span>
                    <span className="font-semibold text-slate-900">07:00 – 14:00</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  Localização
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Luís Correia, PI<br />
                  Avenida Teresina (Próximo ao Centro)<br />
                  <span className="text-xs text-slate-400 mt-2 block italic">*Consulte endereço exato no WhatsApp</span>
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-red-600" />
                  Contato Direto
                </h3>
                <div className="space-y-4">
                  <a
                    href={WHATSAPP_LINK}
                    className="flex items-center gap-4 group"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">WhatsApp</div>
                      <div className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">(86) 9 9535-3043</div>
                    </div>
                  </a>
                  <div className="flex gap-4 mt-6">
                    <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-blue-600 hover:text-white transition-colors">
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-pink-600 hover:text-white transition-colors">
                      <Instagram className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-center text-slate-500 text-sm border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-6">
          <p>© {new Date().getFullYear()} Mercadinho Brisa Mar. Todos os direitos reservados.</p>
          <p className="mt-2 text-slate-600">Luís Correia - Piauí</p>
        </div>
      </footer>
      </div>
    </APIProvider>
  );
}
