import abaLogo from '../assets/clients/aba.webp'
import javLogo from '../assets/clients/jav.webp'
import javilLogo from '../assets/clients/javil.webp'

export interface NavItem {
  to: string
  label: string
}

export interface Highlight {
  title: string
  description: string
}

export interface Company {
  name: string
  tagline: string
  headline: string[]
  intro: string
  closing: string
  aboutHeadline: string
  servicesHeadline: string
  about: string[]
  mission: string
  email: string
  phones: string[]
  whatsapp: string
  instagram: string
  address: string
}

export interface Client {
  name: string
  logo: string
}

export interface Service {
  id: string
  title: string
  summary: string
  description: string
  features: Highlight[]
}

export const navItems: NavItem[] = [
  { to: '/', label: 'Início' },
  { to: '/services', label: 'Serviços' },
  { to: '/about', label: 'Sobre' },
  { to: '/contact-us', label: 'Contactos' },
]

export const labels = {
  contactCta: 'Fale connosco',
  servicesCta: 'Ver serviços',
  learnMore: 'Saber mais',
  servicesTitle: 'O que fazemos',
  pillarsTitle: 'Os nossos pilares',
  clientsTitle: 'Os nossos clientes',
  openMenu: 'Abrir menu',
  closeMenu: 'Fechar menu',
  footerNav: 'Navegação',
  footerServices: 'Serviços',
  footerContact: 'Contactos',
  instagram: 'Instagram',
  whatsapp: 'WhatsApp',
  rights: 'Todos os direitos reservados.',
  backToTop: 'Voltar ao topo',
}

export const company: Company = {
  name: 'IMEXIA',
  tagline: 'Ligando pessoas, negócios e oportunidades.',
  headline: ['Um grupo.', 'Múltiplas soluções.', 'Novas oportunidades.'],
  intro:
    'Mais do que serviços, entregamos soluções que impulsionam negócios e criam novas possibilidades.',
  closing: 'Juntos, vamos mais longe.',
  aboutHeadline: 'A IMEXIA chegou para transformar negócios.',
  servicesHeadline: 'Conectando oportunidades globais.',
  about: [
    'A IMEXIA é um grupo empresarial que reúne diferentes áreas de atuação para oferecer soluções completas e integradas, com um único parceiro.',
    'Unimos experiência, inovação e compromisso para gerar valor, aproximar pessoas e empresas e impulsionar negócios em Angola e no mercado global.',
    'Transformamos estratégias em resultados reais e sustentáveis, e construímos parcerias duradouras, assentes na confiança e no crescimento mútuo.',
  ],
  mission:
    'Oferecer soluções inovadoras em cada área de atuação, com qualidade, confiança e eficiência em cada operação, porque o sucesso dos nossos clientes é o nosso maior objetivo.',
  email: 'imexiageral@gmail.com',
  phones: ['+244 921 146 863', '+244 925 670 134'],
  whatsapp: '+244 925 670 134',
  instagram: 'imexia.ao',
  address: 'Av. Talatona, Via C2, Luanda, Angola',
}

export const pillars: Highlight[] = [
  {
    title: 'Soluções integradas',
    description: 'Atuamos de forma conectada para entregar resultados completos e eficazes.',
  },
  {
    title: 'Processos otimizados',
    description: 'Procuramos eficiência em cada detalhe para reduzir custos e aumentar a produtividade.',
  },
  {
    title: 'Qualidade e confiabilidade',
    description: 'Seguimos os mais altos padrões para garantir segurança e excelência em tudo o que fazemos.',
  },
  {
    title: 'Foco no cliente',
    description: 'Entendemos as suas necessidades e criamos soluções que geram valor real e duradouro.',
  },
]

export const clients: Client[] = [
  { name: 'ABA Construção e Engenharia', logo: abaLogo },
  { name: 'JAVIL Comércio & Indústria', logo: javilLogo },
  { name: 'J.A.V Móveis & Decoração', logo: javLogo },
]

export const values: Highlight[] = [
  {
    title: 'Integridade',
    description: 'Agimos com ética, transparência e responsabilidade.',
  },
  {
    title: 'Excelência',
    description: 'Procuramos a melhoria contínua em tudo o que fazemos.',
  },
  {
    title: 'Compromisso',
    description: 'Dedicamo-nos ao sucesso de cada cliente.',
  },
  {
    title: 'Inovação',
    description: 'Encontramos novas soluções para desafios reais.',
  },
  {
    title: 'Confiança',
    description: 'Construímos relações sólidas e duradouras com clientes e parceiros.',
  },
]

export const services: Service[] = [
  {
    id: 'viagens',
    title: 'Agenciamento de Viagens',
    summary: 'Reservas, hospedagem, bilhetes, vistos e pacotes turísticos, tratados num só lugar.',
    description:
      'Tratamos da sua viagem do início ao fim, sem complicações e com acompanhamento dedicado em todas as etapas. Mais do que viagens, conectamos você ao mundo.',
    features: [
      {
        title: 'Reservas e bilhetes',
        description: 'Reservas e bilhetes tratados de forma simples, para que só tenha de pensar na viagem.',
      },
      {
        title: 'Hospedagem',
        description: 'Alojamento adequado ao seu destino e ao objetivo da viagem.',
      },
      {
        title: 'Pacotes turísticos personalizados',
        description: 'Experiências de viagem criadas à sua medida.',
      },
      {
        title: 'Vistos',
        description: 'Agendamento sem complicações, com acompanhamento em cada etapa do processo.',
      },
    ],
  },
  {
    id: 'construcao',
    title: 'Construção Civil',
    summary: 'Empreitada de obras e acabamentos, com qualidade e atenção aos detalhes.',
    description:
      'Executamos projetos de construção civil com foco na empreitada de obras e nos acabamentos, com a qualidade e a atenção aos detalhes que cada espaço exige.',
    features: [
      {
        title: 'Empreitada de obras',
        description: 'Execução de obras com rigor, organização e compromisso com o resultado final.',
      },
      {
        title: 'Acabamentos',
        description: 'Acabamentos cuidados, pensados para valorizar cada espaço.',
      },
    ],
  },
  {
    id: 'logistica',
    title: 'Transporte e Logística',
    summary: 'Armazenamento, procurement, aprovisionamento, downstream e importação, com eficiência em toda a cadeia.',
    description:
      'Integramos as várias etapas da cadeia logística para garantir eficiência do início ao fim de cada operação.',
    features: [
      {
        title: 'Armazenamento',
        description: 'Mercadorias guardadas e organizadas com segurança.',
      },
      {
        title: 'Procurement',
        description: 'Compra de bens e serviços alinhada com as necessidades do seu negócio.',
      },
      {
        title: 'Aprovisionamento',
        description: 'Materiais e produtos disponíveis quando a sua operação precisa deles.',
      },
      {
        title: 'Downstream',
        description: 'Apoio às etapas finais da cadeia, até o produto chegar ao destino.',
      },
      {
        title: 'Importação',
        description: 'Entrada de mercadorias no país, com acompanhamento do processo.',
      },
    ],
  },
  {
    id: 'comercio',
    title: 'Comércio',
    summary: 'Soluções comerciais que ligam produtos, mercados e pessoas.',
    description:
      'Ligamos produtos, mercados e pessoas para impulsionar negócios e abrir novas oportunidades.',
    features: [
      {
        title: 'Produtos',
        description: 'Acesso aos produtos certos para cada necessidade.',
      },
      {
        title: 'Mercados',
        description: 'Ligação entre negócios em Angola e no mercado global.',
      },
      {
        title: 'Pessoas',
        description: 'Relações comerciais próximas, que criam novas oportunidades.',
      },
    ],
  },
  {
    id: 'software',
    title: 'Desenvolvimento de Software e Sistemas',
    summary: 'Sistemas à medida, aplicações web e mobile, integração, cloud e suporte.',
    description:
      'Criamos soluções tecnológicas inteligentes, seguras e personalizadas para impulsionar e modernizar o seu negócio. Trabalhamos com instituições públicas, instituições financeiras, incluindo bancos, e empresas privadas.',
    features: [
      {
        title: 'Sistemas à medida',
        description: 'Soluções totalmente personalizadas para otimizar a gestão, a automação e os processos da sua empresa.',
      },
      {
        title: 'Aplicações web e mobile',
        description: 'Aplicações e plataformas modernas, rápidas e focadas na experiência do utilizador.',
      },
      {
        title: 'Integração e cloud',
        description: 'Ligação de sistemas e migração segura para a nuvem, com garantia de escalabilidade.',
      },
      {
        title: 'Manutenção e suporte',
        description: 'Monitorização contínua, atualizações e assistência técnica para que a sua operação nunca pare.',
      },
    ],
  },
]
