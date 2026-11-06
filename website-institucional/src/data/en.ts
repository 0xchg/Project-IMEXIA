import type { Translation } from './types.ts'

const en: Translation = {
  labels: {
    contactCta: 'Contact us',
    servicesCta: 'Our services',
    learnMore: 'Learn more',
    aboutCta: 'About us',
    heroLabel: 'Areas of activity',
    pauseSlides: 'Pause the slideshow',
    playSlides: 'Resume the slideshow',
    strengthsCta: 'Let’s turn possibilities into reality.',
    aboutTitle: 'Who we are',
    missionTitle: 'Our mission',
    valuesTitle: 'The values that drive us',
    solutionsTitle: 'Our solutions',
    pillarsTitle: 'Our pillars',
    clientsTitle: 'Our clients',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    footerNav: 'Navigation',
    footerServices: 'Services',
    footerContact: 'Contact',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
  contact: {
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    addressLabel: 'Address',
    formTitle: 'Send us a message',
    fields: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      service: 'Service of interest',
      message: 'Message',
    },
    optional: 'optional',
    serviceOther: 'Something else',
    errors: {
      name: 'Please enter your name.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a valid phone number.',
      message: 'Please write your message.',
    },
    submit: 'Send via WhatsApp',
    greeting: 'Hello, IMEXIA!',
    sent: 'WhatsApp is open with your message. Just press send.',
    blocked: 'Your browser didn’t let WhatsApp open.',
    openWhatsapp: 'Open WhatsApp',
    mapTitle: 'Where to find us',
    openMap: 'Open in Google Maps',
  },
  hero: {
    logistica: {
      lead: 'We connect destinations.',
      highlight: 'We deliver trust.',
      text: 'Integrated solutions in transport, logistics, supply and energy that drive businesses forward and create value.',
      strengths: ['International reach', 'Safety and trust', 'Efficiency and quality', 'Specialised team'],
    },
    software: {
      lead: 'Technology',
      highlight: 'that connects and transforms.',
      text: 'Innovative technology solutions that connect people, processes and opportunities, driving businesses forward and creating value.',
      strengths: ['Innovation', 'Connectivity', 'Security', 'Results'],
    },
    viagens: {
      lead: 'More than travel,',
      highlight: 'we connect you to the world.',
      text: 'Bookings, accommodation, tickets, visas and holiday packages, handled in one place with dedicated support.',
      strengths: ['All in one place', 'Dedicated support', 'Hassle-free', 'Tailor-made packages'],
    },
  },
  strengths: [
    { title: 'Proven experience', description: 'Years of experience in the market.' },
    { title: 'Strategic partnerships', description: 'A solid network of global partners.' },
    { title: 'Technology and innovation', description: 'Smart solutions for real results.' },
    { title: 'Commitment to the future', description: 'Sustainability and responsibility.' },
  ],
  nav: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
  },
  company: {
    tagline: 'Connecting people, businesses and opportunities.',
    headline: ['One group.', 'Multiple solutions.', 'New opportunities.'],
    intro:
      'More than services, we deliver solutions that drive businesses forward and create new possibilities.',
    closing: 'Together, we go further.',
    aboutHeadline: 'IMEXIA is here to transform businesses.',
    servicesHeadline: 'Connecting global opportunities.',
    about: [
      'IMEXIA is a business group that brings together different areas of activity to offer complete, integrated solutions through a single partner.',
      'We combine experience, innovation and commitment to create value, bring people and companies closer together and drive business in Angola and on the global market.',
      'We turn strategies into real, sustainable results and build lasting partnerships founded on trust and mutual growth.',
    ],
    mission:
      'To offer innovative solutions in every area we work in, with quality, reliability and efficiency in every operation, because our clients’ success is our greatest goal.',
  },
  pillars: [
    {
      title: 'Integrated solutions',
      description: 'We work in a connected way to deliver complete, effective results.',
    },
    {
      title: 'Optimised processes',
      description: 'We pursue efficiency in every detail to cut costs and boost productivity.',
    },
    {
      title: 'Quality and reliability',
      description: 'We follow the highest standards to ensure safety and excellence in everything we do.',
    },
    {
      title: 'Client focus',
      description: 'We understand your needs and create solutions that deliver real, lasting value.',
    },
  ],
  values: [
    {
      title: 'Integrity',
      description: 'We act with ethics, transparency and responsibility.',
    },
    {
      title: 'Excellence',
      description: 'We strive for continuous improvement in everything we do.',
    },
    {
      title: 'Commitment',
      description: 'We are dedicated to the success of every client.',
    },
    {
      title: 'Innovation',
      description: 'We find new solutions to real challenges.',
    },
    {
      title: 'Trust',
      description: 'We build strong, lasting relationships with clients and partners.',
    },
  ],
  services: {
    viagens: {
      title: 'Travel Agency',
      summary: 'Bookings, accommodation, tickets, visas and holiday packages, all handled in one place.',
      description:
        'We take care of your trip from start to finish, hassle-free and with dedicated support at every stage. More than travel, we connect you to the world.',
      features: [
        {
          title: 'Bookings and tickets',
          description: 'Bookings and tickets handled simply, so all you have to think about is the trip.',
        },
        {
          title: 'Accommodation',
          description: 'Accommodation suited to your destination and the purpose of your trip.',
        },
        {
          title: 'Tailor-made holiday packages',
          description: 'Travel experiences designed around you.',
        },
        {
          title: 'Visas',
          description: 'Hassle-free appointment booking, with support at every step of the process.',
        },
      ],
    },
    logistica: {
      title: 'Transport and Logistics',
      summary: 'Road, sea and air transport, warehousing, supply, downstream and imports, with efficiency across the whole chain.',
      description:
        'Integrated logistics solutions for road, sea and air transport, with efficiency, safety and global reach. We bring the stages of the chain together to ensure efficiency from the start to the end of every operation.',
      features: [
        {
          title: 'Road transport',
          description: 'Efficient and safe solutions across the country.',
        },
        {
          title: 'Sea transport',
          description: 'We connect ports and people safely.',
        },
        {
          title: 'Air transport',
          description: 'Speed and agility to connect your business to the world.',
        },
        {
          title: 'Warehousing and distribution',
          description: 'Goods stored, organised and distributed safely and with technology.',
        },
        {
          title: 'Integrated logistics',
          description: 'Complete, tailored solutions for your supply chain.',
        },
        {
          title: 'Procurement',
          description: 'Purchasing of goods and services aligned with your business needs.',
        },
        {
          title: 'Supply',
          description: 'Strategic supply management, with materials available when your operation needs them.',
        },
        {
          title: 'Downstream',
          description: 'Solutions in petroleum products and lubricants, all the way to the final destination.',
        },
        {
          title: 'Imports',
          description: 'Bringing goods into the country, with the whole process followed closely.',
        },
        {
          title: 'Tracking and security',
          description: 'Real-time monitoring for the full security of your cargo.',
        },
      ],
    },
    software: {
      title: 'Software and Systems Development',
      summary: 'Custom systems, web and mobile apps, integration, cloud and support.',
      description:
        'We create smart, secure and tailored technology solutions to drive and modernise your business. We work with public institutions, financial institutions, including banks, and private companies.',
      features: [
        {
          title: 'Custom systems',
          description: 'Fully tailored solutions to optimise your company’s management, automation and processes.',
        },
        {
          title: 'Web and mobile apps',
          description: 'Modern, fast applications and platforms focused on the user experience.',
        },
        {
          title: 'Integration and cloud',
          description: 'Connecting systems and migrating securely to the cloud, with scalability guaranteed.',
        },
        {
          title: 'Maintenance and support',
          description: 'Continuous monitoring, updates and technical assistance so your operation never stops.',
        },
      ],
    },
  },
}

export default en
