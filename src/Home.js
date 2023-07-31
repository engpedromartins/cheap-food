import React, { useState } from 'react';
import Title from './components/Title';
import SearchBar from './components/SearchBar';
import DishesContainer from './components/Dishes/DishesContainer';
import { getDishes, getMerchantInformation } from './api/orders';
import {
  cleanMerchantArray,
  formatAndSortDishes,
  mergeMerchantInfo,
} from './helpers/helpers';

const MAX_REQUEST_PAGES = 2;
const MAX_ITEM_PER_PAGE = 999;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [dishes, setDishes] = useState({
    data: [
      // {
      //   id: '1b15a1b3-fac8-48e1-a423-85cc21575ab1',
      //   code: '46242223',
      //   name: 'Mediterrâneo kebab - vegan (shawarma)',
      //   description:
      //     '*vegano - pimentão vermelho, cogumelo, cebola, tomate, salsa, tempero especial, molho de tomate, no pão sírio médio.',
      //   resources: [
      //     {
      //       type: 'PHOTO',
      //       fileName:
      //         '3d6822c3-e8c2-4e8c-90b0-f33313714b70/201809142049_the_k.jpg',
      //     },
      //   ],
      //   category: {
      //     code: 'SQ5V',
      //     name: 'Kebabs artesanais com Entrega Grátis!',
      //   },
      //   tags: [
      //     'CPGN_DISC_1809',
      //     'CPGN_DISC_1809_30',
      //     'CPGN_DISC_1809_50',
      //     'CPGN_DISC_1809_PIZZA',
      //     'VEG_ALL_OUT19',
      //   ],
      //   originalPrice: 44.9,
      //   price: 26.9,
      //   minimumPrice: 26.9,
      //   merchant: {
      //     id: '3d6822c3-e8c2-4e8c-90b0-f33313714b70',
      //     name: 'The Kebabs',
      //     slug: 'sao-paulo-sp/the-kebabs-bela-vista',
      //     features: ['DELIVERY', 'IMMEDIATE_ORDER'],
      //     userRating: 4.4453301429748535,
      //     distance: 4.18,
      //     deliveryTime: 20,
      //     deliveryFee: {
      //       type: 'FIXED',
      //       value: 0,
      //       originalValue: 0,
      //     },
      //     resources: [
      //       {
      //         type: 'LOGO',
      //         fileName:
      //           '3d6822c3-e8c2-4e8c-90b0-f33313714b70/201809142040_captu.png',
      //       },
      //       {
      //         type: 'HEADER',
      //         fileName:
      //           '3d6822c3-e8c2-4e8c-90b0-f33313714b70/201905251544_hEUm_.jpeg',
      //       },
      //     ],
      //     tags: [
      //       'ADDRESS_PREFORM_TYPE',
      //       'ALL_OFF_SET19',
      //       'ATE15_TXGRATIS_NOVOS',
      //       'BF_CUPOM15OFF_NOV20',
      //       'BF_PIZZARIASESFIHARIAS_NOV20',
      //       'carrossel_madrugada_ago20',
      //       'CART::MCHT::CRITICOS_ABR_JUN_TAXA_100',
      //       'CART::MCHT::TAXA_GRATIS_NOVOS_ATE_3_0',
      //       'CART::MCHT::TX_GRATIS_CRITICOS_FEV_MAR_100',
      //       'Combos de Coca com frete grátis',
      //       'CONTA_ESTRATEGICA',
      //       'CPGN_1811_BLK_NOV',
      //       'CPGN_1811_BLK_NOV_30_ELIGIBLE',
      //       'CPGN_1811_BLK_NOV_30_OPTED_IN',
      //       'CPGN_1811_BLK_NOV_50_ELIGIBLE',
      //       'CPGN_1811_BLK_NOV_50_OPTED_IN',
      //       'CPGN_1811_BLK_NOV_ELIGIBLE',
      //       'CPGN_1811_BLK_NOV_OPTED_IN',
      //       'CPGN_1811_BLK_NOV_PERFORMANCE',
      //       'CPGN_DISC_1809',
      //       'CPGN_DISC_1809_30',
      //       'CPGN_DISC_1809_30_ELIGIBLE',
      //       'CPGN_DISC_1809_30_OPTED_IN',
      //       'CPGN_DISC_1809_50_ELIGIBLE',
      //       'CPGN_DISC_1809_50_OPTED_IN',
      //       'CPGN_DISC_1809_ELIGIBLE',
      //       'CPGN_DISC_1809_OPTED_IN',
      //       'CPGN_USER_DISCOUNT_6_LIST',
      //       'CRITICOS_CES',
      //       'CRM_LOW_VALUE_LIST',
      //       'ENG_CRM_SUPER_REST_2008',
      //       'EXCLUSIVO',
      //       'FAMOSOS',
      //       'FAMOSOSJAN20',
      //       'FAMOSOS_TOGO_NOV19',
      //       'FEV_20_TESTE_TAXA_GRATIS_SABADO',
      //       'GUIDED_HELP_TYPE',
      //       'JETSKI_WPP_FREQ',
      //       'JET_WPP_FREQ_19_03',
      //       'JET_WPP_FREQ_23_03_TO_26_03',
      //       'LOYALTY_CARD_5',
      //       'MAISPEDIDOS_REGIAO',
      //       'MELHORES_RESTAURANTES_CHURN_ABR21',
      //       'NAMORADOS_CUPOM',
      //       'PAR_COMBOS_COCA_ATE_25',
      //       'PAR_COMBOS_COCA_TAXA_GRATIS',
      //       'PRATOS_VEGANOS',
      //       'PRATOS_VEGANOS_MAR21',
      //       'PRATOS_VEGETARIANOS_FEV21',
      //       'PRATOS_VEGETARIANOS_MAR21',
      //       'QRCODE_MERCHANT',
      //       'RANKING_DESCONTO_ATE70_MAR21',
      //       'RANKING_OFERTAS_ATE20_MAR21',
      //       'RES_MAI21_COCA_SOCIAL',
      //       'RES_MAI21_COCA_SOCIAL_LOJAS',
      //       'RESTAURANTES_PGTO_OFF_CHURN_ABR21',
      //       'RESTAURANTE VOUCHER5 GUARANA',
      //       'REST_DEZ20_NAB_EG',
      //       'REST_FEV21_AMBEVNAB',
      //       'REST_NOV20_AMBEVNAB_EG',
      //       'SEMANAPIZZA_CARROSSEL',
      //       'SEMANAPIZZA_COCACOLA',
      //       'SEMANAPIZZA_TAXAGRATIS',
      //       'SO_TEM_NO_IFOOD',
      //       'SUPER_RESTAURANT',
      //       'TESTE_FREQUENCIA_WHATSAPP_REST',
      //       'VOUCHER_KEY_ACCOUNTS_AGO19',
      //       'WRAPPED_DEZ19',
      //     ],
      //     paymentCodes: [
      //       'DNR',
      //       'MPAY',
      //       'MOVPAY_MC',
      //       'RAM',
      //       'MC',
      //       'GPY_ELO',
      //       'REC',
      //       'RDREST',
      //       'ELOD',
      //       'GPY_MCMA',
      //       'AM',
      //       'MCMA',
      //       'MOVPAY_AM',
      //       'APL_ELOD',
      //       'IMV',
      //       'MOVPAY_VIS',
      //       'GPY_ELOD',
      //       'TRE',
      //       'APL_MCMA',
      //       'GPY_MC',
      //       'APL_ELO',
      //       'MOVPAY_HIPER',
      //       'DNREST',
      //       'PIX',
      //       'APL_VISE',
      //       'HIPER',
      //       'IFE',
      //       'ALR',
      //       'VIS',
      //       'RSODEX',
      //       'VVREST',
      //       'RED',
      //       'VIREST',
      //       'VR_SMA',
      //       'VSREST',
      //       'APL_VIS',
      //       'RHIP',
      //       'MOVPAY_ELO',
      //       'GPY_VISE',
      //       'MOVPAY_DNR',
      //       'VISE',
      //       'ELO',
      //       'APL_MC',
      //       'MEREST',
      //       'GPY_VIS',
      //     ],
      //     priceRange: 'MODERATE',
      //     mainCategory: {
      //       code: 'ARA',
      //       name: 'Árabe',
      //     },
      //     available: true,
      //     merchantChain: {
      //       resources: [],
      //     },
      //     takeoutTime: 15,
      //     contextSetup: {
      //       context: 'DEFAULT',
      //       regionGroup: 'e1dbd9d8-45d6-4b33-aafc-417b8d69b06d',
      //       catalogGroup: 'ffca0022-eb43-4205-9a1b-73a72f8e3f95',
      //     },
      //     minimumOrderValue: 29.9,
      //     preparationTime: 0,
      //     deliveryMethods: [
      //       {
      //         id: 'DEFAULT',
      //         priority: 1,
      //         type: 'FIXED',
      //         value: 0,
      //         originalValue: 0,
      //         title: 'Padrão',
      //         subtitle: 'O entregador leva até você agora',
      //         minTime: 20,
      //         maxTime: 30,
      //         mode: 'DELIVERY',
      //         schedule: {
      //           now: true,
      //           shifts: [
      //             {
      //               dayOfWeek: 0,
      //               startTime: '12:00',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 1,
      //               startTime: '01:00',
      //               endTime: '00:00',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 1,
      //               startTime: '11:30',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 2,
      //               startTime: '01:00',
      //               endTime: '01:00',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 2,
      //               startTime: '11:30',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 3,
      //               startTime: '01:00',
      //               endTime: '01:00',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 3,
      //               startTime: '11:30',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 4,
      //               startTime: '01:00',
      //               endTime: '01:00',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 4,
      //               startTime: '11:30',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 5,
      //               startTime: '01:00',
      //               endTime: '01:00',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 5,
      //               startTime: '11:30',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 6,
      //               startTime: '01:00',
      //               endTime: '01:00',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 6,
      //               startTime: '11:30',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //           ],
      //           timeSlots: [],
      //         },
      //         deliveredBy: 'MERCHANT',
      //         catalogGroup: 'ffca0022-eb43-4205-9a1b-73a72f8e3f95',
      //       },
      //     ],
      //     currency: 'BRL',
      //   },
      // },
      // {
      //   id: '009de889-0b9a-4662-a945-befadd8d4835',
      //   code: '81204284',
      //   name: '2 kebab por 32,90',
      //   description: 'Seus 2 kebabs favoritos por um preço incrível!',
      //   resources: [
      //     {
      //       type: 'PHOTO',
      //       fileName:
      //         '98fb7461-37e8-4c15-acb6-6d89d324b7c0/201907092205_iamj_.jpeg',
      //     },
      //   ],
      //   category: {
      //     code: '1VRH7',
      //     name: 'Promoção até 70% Off com Entrega Grátis!',
      //   },
      //   tags: [
      //     'ALMOCO_ATE_15',
      //     'ALMOCO_TOPSELLERS_LASTM',
      //     'ALMOCO_TOPSELLERS_LASTM_OVEREQUAL25',
      //     'ATE_70_OFF_NAO_DFN',
      //     'BB_STAMP_JUL20',
      //     'carrossel_madrugada_ago20',
      //     'DESCONTO_ATE70_BRASILEIRA_MAR21',
      //     'DESCONTO_ATE70_MARMITAS_MAR21',
      //     'DFN_70OFF_JUN19',
      //     'ENTREGA_FOGUETE_NOITE_FEV20',
      //     'EXCLUSIVOS_ATE_50_OFF_JAN_2021',
      //     'FAMOSOSJAN20',
      //     'JANTAR_ATE_15',
      //     'JANTAR_PARADOIS_FEV21',
      //     'MAIS_PEDIDOS_LUNCH_DEZ19',
      //     'MENU_ALMOCO_DEZ_19',
      //     'TAXA_TOP_50_CIDADES_CAP',
      //   ],
      //   originalPrice: 59.9,
      //   price: 32.9,
      //   minimumPrice: 32.9,
      //   merchant: {
      //     id: '98fb7461-37e8-4c15-acb6-6d89d324b7c0',
      //     name: 'Lahmajun - Delícias Turcas - Augusta',
      //     slug: 'sao-paulo-sp/lahmajun---delicias-turcas---augusta-bela-vista',
      //     features: [
      //       'DELIVERY',
      //       'TAKEOUT',
      //       'IMMEDIATE_ORDER',
      //       'INDOOR_TAKEOUT',
      //       'INDOOR_DELIVERY',
      //     ],
      //     userRating: 4.545770168304443,
      //     distance: 4.18,
      //     deliveryTime: 20,
      //     deliveryFee: {
      //       type: 'FIXED',
      //       value: 0,
      //       originalValue: 0,
      //     },
      //     resources: [
      //       {
      //         type: 'LOGO',
      //         fileName:
      //           '98fb7461-37e8-4c15-acb6-6d89d324b7c0/201808031850_captu.png',
      //       },
      //       {
      //         type: 'HEADER',
      //         fileName:
      //           '98fb7461-37e8-4c15-acb6-6d89d324b7c0/202006271712_AFYS_.jpeg',
      //       },
      //     ],
      //     tags: [
      //       'ADDRESS_PREFORM_TYPE',
      //       'ALL_OFF_SET19',
      //       'ALMOCO_ATE_15',
      //       'ALMOCO_ATE_15_ELIGIBLE',
      //       'ALMOCO_ATE_15_OPTED_IN',
      //       'ATE15_TXGRATIS_NOVOS',
      //       'ATE_70_OFF_NAO_DFN',
      //       'BF_CUPOM15OFF_NOV20',
      //       'BF_PIZZARIASESFIHARIAS_NOV20',
      //       'carrossel_madrugada_ago20',
      //       'CART::MCHT::CRITICOS_ABR_JUN_TAXA_100',
      //       'CART::MCHT::TAXA_GRATIS_NOVOS_ATE_3_0',
      //       'CART::MCHT::TX_GRATIS_CRITICOS_FEV_MAR_100',
      //       'Combos de Coca com frete grátis',
      //       'CONTA_ESTRATEGICA',
      //       'CPGN_1811_BLK_NOV',
      //       'CPGN_1811_BLK_NOV_30_ELIGIBLE',
      //       'CPGN_1811_BLK_NOV_30_OPTED_IN',
      //       'CPGN_1811_BLK_NOV_50_ELIGIBLE',
      //       'CPGN_1811_BLK_NOV_50_OPTED_IN',
      //       'CPGN_1811_BLK_NOV_ELIGIBLE',
      //       'CPGN_1811_BLK_NOV_OO',
      //       'CPGN_1811_BLK_NOV_OPTED_IN',
      //       'CPGN_1811_BLK_NOV_PERFORMANCE',
      //       'CPGN_DISC_1809_30_ELIGIBLE',
      //       'CPGN_DISC_1809_30_OPTED_IN',
      //       'CPGN_DISC_1809_50_ELIGIBLE',
      //       'CPGN_DISC_1809_50_OPTED_IN',
      //       'CPGN_DISC_1809_ELIGIBLE',
      //       'CPGN_DISC_1809_OPTED_IN',
      //       'CPGN_USER_DISCOUNT_6_LIST',
      //       'CPGN_VOUCHER_LIGHT_KA',
      //       'CRITICOS_CES',
      //       'CRM_EXC_RESTRITO_05_20',
      //       'CRM_HIGH_VALUE',
      //       'CRM_HIGH_VALUE_LIST',
      //       'ENG_CRM_SUPER_REST_2008',
      //       'ENTREGA_FOGUETE_NOITE_FEV20',
      //       'EXCLUSIVO',
      //       'FAMOSOS',
      //       'FAMOSOS_TOGO_NOV19',
      //       'FEV_20_TESTE_TAXA_GRATIS_SABADO',
      //       'GDES_MARCAS_SP_MAI19',
      //       'GUIDED_HELP_TYPE',
      //       'JANTAR_ATE_15',
      //       'JANTAR_ATE_15_ELIGIBLE',
      //       'JANTAR_ATE_15_OPTED_IN',
      //       'JETSKI_WPP_FREQ',
      //       'JET_WPP_FREQ_19_03',
      //       'JET_WPP_FREQ_23_03_TO_26_03',
      //       'LOYALTY_CARD_5',
      //       'MAIS_PEDIDOS_LUNCH_DEZ19',
      //       'MAISPEDIDOS_REGIAO',
      //       'MARCAS_FAMOSAS_CARROSSEL',
      //       'MELHORES_RESTAURANTES_CHURN_ABR21',
      //       'MENU_ALMOCO_DEZ_19',
      //       'MKT_PDIVIDIR_MAR20',
      //       'NAMORADOS_CUPOM',
      //       'NAMORADOS_MAI19',
      //       'NAMORADOS_MAI19_ELIGIBLE',
      //       'NAMORADOS_MAI19_OPTED_IN',
      //       'PAR_COMBOS_COCA_ATE_25',
      //       'PAR_COMBOS_COCA_TAXA_GRATIS',
      //       'PRA_RETIRAR_JUN19',
      //       'PRATOS_VEGANOS',
      //       'PRATOS_VEGANOS_MAR21',
      //       'PRATOS_VEGETARIANOS_FEV21',
      //       'PRATOS_VEGETARIANOS_MAR21',
      //       'RANKING_DESCONTO_ATE70_MAR21',
      //       'RANKING_OFERTAS_ATE20_MAR21',
      //       'RES_COCA_LISTACOMBOSCOCA',
      //       'RES_FEV21_COCA_COMBO25',
      //       'RES_MAI21_COCA_SOCIAL',
      //       'RES_MAI21_COCA_SOCIAL_LOJAS',
      //       'RES_MAR21_COCA_COMBO20OFF',
      //       'RES_MAR21_COCA_ITENSCOMBO20OFF',
      //       'RES_MAR21_COCA_ITENSCOMBO30OFF',
      //       'RESTAURANTES_PGTO_OFF_CHURN_ABR21',
      //       'RESTAURANTE VOUCHER5 GUARANA',
      //       'SELECIONADOS_KA_CE_ELIGIBLE',
      //       'SELECIONADOS_KA_CE_OPTED_IN',
      //       'SEMANA_HAMBURGUER_DESTAQUES',
      //       'SEMANAPIZZA_CARROSSEL',
      //       'SEMANAPIZZA_COCACOLA',
      //       'SEMANAPIZZA_TAXAGRATIS',
      //       'SO_TEM_NO_IFOOD',
      //       'SUPER_RESTAURANT',
      //       'TESTE_FREQUENCIA_WHATSAPP_REST',
      //       'WRAPPED_DEZ19',
      //     ],
      //     paymentCodes: [
      //       'DNR',
      //       'MPAY',
      //       'MOVPAY_MC',
      //       'RAM',
      //       'MC',
      //       'GPY_ELO',
      //       'REC',
      //       'RDREST',
      //       'ELOD',
      //       'GPY_MCMA',
      //       'BENRON',
      //       'AM',
      //       'MCMA',
      //       'MOVPAY_AM',
      //       'APL_ELOD',
      //       'IMV',
      //       'MOVPAY_VIS',
      //       'GPY_ELOD',
      //       'TRE',
      //       'APL_MCMA',
      //       'GPY_MC',
      //       'APL_ELO',
      //       'MOVPAY_HIPER',
      //       'DNREST',
      //       'PIX',
      //       'APL_VISE',
      //       'VRO',
      //       'HIPER',
      //       'IFE',
      //       'ALR',
      //       'VIS',
      //       'RSODEX',
      //       'VVREST',
      //       'RED',
      //       'VIREST',
      //       'VR_SMA',
      //       'SRP',
      //       'VSREST',
      //       'APL_VIS',
      //       'RHIP',
      //       'MOVPAY_ELO',
      //       'GPY_VISE',
      //       'MOVPAY_DNR',
      //       'VISE',
      //       'ELO',
      //       'APL_MC',
      //       'MEREST',
      //       'GPY_VIS',
      //     ],
      //     priceRange: 'MODERATE',
      //     mainCategory: {
      //       code: 'ARA',
      //       name: 'Árabe',
      //     },
      //     available: true,
      //     merchantChain: {
      //       id: 'd53021a3-0cb1-4bf8-8d07-3f4642fc816a',
      //       name: 'Lahmajun - Delicias Turcas',
      //       slug: 'lahmajun',
      //       resources: [
      //         {
      //           type: 'LOGO',
      //         },
      //         {
      //           type: 'HEADER',
      //         },
      //       ],
      //     },
      //     takeoutTime: 15,
      //     contextSetup: {
      //       context: 'DEFAULT',
      //       regionGroup: 'e1dbd9d8-45d6-4b33-aafc-417b8d69b06d',
      //       catalogGroup: 'ffca0022-eb43-4205-9a1b-73a72f8e3f95',
      //     },
      //     minimumOrderValue: 29.9,
      //     preparationTime: 0,
      //     deliveryMethods: [
      //       {
      //         id: 'DEFAULT',
      //         priority: 1,
      //         type: 'FIXED',
      //         value: 0,
      //         originalValue: 0,
      //         title: 'Padrão',
      //         subtitle: 'O entregador leva até você agora',
      //         minTime: 20,
      //         maxTime: 30,
      //         mode: 'DELIVERY',
      //         schedule: {
      //           now: true,
      //           shifts: [
      //             {
      //               dayOfWeek: 0,
      //               startTime: '12:00',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 1,
      //               startTime: '01:00',
      //               endTime: '00:00',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 1,
      //               startTime: '11:30',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 2,
      //               startTime: '01:00',
      //               endTime: '01:00',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 2,
      //               startTime: '11:30',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 3,
      //               startTime: '01:00',
      //               endTime: '01:00',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 3,
      //               startTime: '11:30',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 4,
      //               startTime: '01:00',
      //               endTime: '01:00',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 4,
      //               startTime: '11:30',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 5,
      //               startTime: '01:00',
      //               endTime: '01:00',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 5,
      //               startTime: '11:30',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 6,
      //               startTime: '01:00',
      //               endTime: '01:00',
      //               interval: 30,
      //             },
      //             {
      //               dayOfWeek: 6,
      //               startTime: '11:30',
      //               endTime: '22:59',
      //               interval: 30,
      //             },
      //           ],
      //           timeSlots: [],
      //         },
      //         deliveredBy: 'MERCHANT',
      //         catalogGroup: 'ffca0022-eb43-4205-9a1b-73a72f8e3f95',
      //       },
      //       {
      //         id: 'TAKEOUT',
      //         priority: 4,
      //         type: 'FIXED',
      //         value: 0,
      //         title: 'Retirada',
      //         subtitle: 'Você retira seu pedido no local',
      //         minTime: 15,
      //         maxTime: 25,
      //         mode: 'TAKEOUT',
      //         schedule: {
      //           now: true,
      //           shifts: [],
      //           timeSlots: [],
      //         },
      //       },
      //     ],
      //     currency: 'BRL',
      //   },
      // },
    ],
    page: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dishArray = await fetchDishes();
    const merchantIds = cleanMerchantArray(
      dishArray.map((dish) => dish.merchant.id)
    );
    const merchantInfo = await fetchMerchantInfoArray(merchantIds);
    const dishesWithMergedMerchantInfo = mergeMerchantInfo(
      merchantInfo,
      dishArray
    );

    setDishes({
      ...dishes,
      data: formatAndSortDishes(dishesWithMergedMerchantInfo),
      page,
    });

    setLoading(false);
  };

  const fetchDishes = async () => {
    const dishArray = [];
    let page = dishes.page;

    do {
      const res = await getDishes(searchQuery, page);

      dishArray.push(...res.data.items.data);

      page++;
    } while (page <= MAX_REQUEST_PAGES);

    return dishArray;
  };

  // GOTTA FIX CORS FIRST
  const fetchMerchantInfoArray = (merchantIds) => {
    // GET ALL MERCHANT INFO FROM ID AND RETURN AS ARRAY
    let merchantInfo = [];

    return Promise.all(merchantIds.map((id) => getMerchantInformation(id)))
      .then((res) => res.forEach((res) => merchantInfo.push(res.data)))
      .then(() => Promise.resolve(merchantInfo))
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    setDishes({ ...dishes, page: 0 });
  };

  const { data, page } = dishes;

  return (
    <main className='container'>
      <Title />
      <SearchBar
        handleSubmit={handleSubmit}
        loading={loading}
        pageSize={page}
        search={searchQuery}
        handleChange={handleChange}
      />
      {/* <nav>
        <ul className='pagination justify-content-center'>
          <li className='page-item'>
            <a className='page-link' href='#'>
              Previous
            </a>
          </li>
          {(dishes.data.length / MAX_ITEM_PER_PAGE)}
          <li className='page-item'>
            <a className='page-link' href='#'>
              Next
            </a>
          </li>
        </ul>
      </nav> */}
      {data.length > 0 && (
        <DishesContainer dishes={data.slice(0, MAX_ITEM_PER_PAGE)} />
      )}
    </main>
  );
};

export default Home;
