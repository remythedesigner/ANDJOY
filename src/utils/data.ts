import type { Event, Review, CommunityMember, HeroEvent } from './types';

// Figma MCP assets (valid for ~7 days from design extraction)
export const ASSETS = {
  logo: {
    vectors: [
      'https://www.figma.com/api/mcp/asset/9e740bca-7e5d-4ffd-8eaa-c0e8afde2ffe',
      'https://www.figma.com/api/mcp/asset/87834bae-e8e8-42fb-be63-8564afc7e39f',
      'https://www.figma.com/api/mcp/asset/7e93ce3f-5d41-4a9a-a303-a411083f0da9',
    ],
  },
  profilePic: 'https://www.figma.com/api/mcp/asset/cf09ac37-1fd0-4c08-9fb9-c39f09626b7a',
  locationDot: 'https://www.figma.com/api/mcp/asset/5b093ad0-78f4-464c-a6b0-254aef0cffee',
  icons: {
    fire: 'https://www.figma.com/api/mcp/asset/67aa7aa5-c1f4-4c27-9ca4-d971d2399484',
    clock: 'https://www.figma.com/api/mcp/asset/156528ee-a8b0-42b1-b936-c1f4d07c32be',
    pin: 'https://www.figma.com/api/mcp/asset/52e78df2-8da9-499e-90bf-9cf54a90f71a',
    star: 'https://www.figma.com/api/mcp/asset/82e86803-5a88-43d9-a34a-f20a6d1f6f4b',
    heart: 'https://www.figma.com/api/mcp/asset/a31749e5-68de-4b87-8deb-cbb0e9833834',
    geoPin: 'https://www.figma.com/api/mcp/asset/59441d14-b5ca-4612-8e3d-9b40427e1a73',
    geoPaper: 'https://www.figma.com/api/mcp/asset/6ba0d5a8-fcdb-42e9-9f46-e985d66ba5a0',
    clockSmall: 'https://www.figma.com/api/mcp/asset/fc60145d-b0eb-4418-8a45-7da85c96051d',
    pinSmall: 'https://www.figma.com/api/mcp/asset/9eb34ea8-d50e-4149-abaa-cd5ee12af605',
    teamHeart: '/icons/team-heart.svg',
    play: 'https://www.figma.com/api/mcp/asset/bd91592d-75f8-4125-97c4-52c00ca24187',
  },
};

export const heroEvents: HeroEvent[] = [
  {
    image: 'https://www.figma.com/api/mcp/asset/8945411a-60bf-476b-a698-e0acc03a134e',
    overlay: 'https://www.figma.com/api/mcp/asset/654bd8d2-e169-4735-9fb4-5042f23b7307',
    category: 'Bien-être',
    title: 'Yoga Rooftop au coucher de soleil',
    time: 'Auj. 19h00',
    location: 'Paris 11e',
    price: '18 €',
    originalPrice: '25 €',
    scarcityBadge: 'Plus que 4 places',
    progressBars: 3,
    activeBar: 0,
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/6c3dc24e-bd4c-48d4-9adb-398d492dde7a',
    overlay: '',
    category: 'Spectacles',
    title: 'Soirée Stand-Up · Les Révélations',
    time: 'Demain · 20h30',
    location: 'Paris 10e',
    price: '12 €',
    scarcityBadge: undefined,
    progressBars: 3,
    activeBar: 1,
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/e17be550-8f56-48fa-9f4c-1538a4d87953',
    overlay: '',
    category: 'Expositions',
    title: "Expo Immersive · Lumières d'Orient",
    time: 'Dim · 14h00',
    location: 'Paris 13e',
    price: '22 €',
    scarcityBadge: undefined,
    progressBars: 3,
    activeBar: 2,
  },
];

export const lovedEvents: Event[] = [
  {
    id: 'standup',
    image: 'https://www.figma.com/api/mcp/asset/6c3dc24e-bd4c-48d4-9adb-398d492dde7a',
    category: 'Spectacles',
    title: 'Soirée Stand-Up · Les Révélations',
    date: 'Sam 21 juin · 20h30',
    location: 'Paris 10e · 800 m',
    price: '12 €',
  },
  {
    id: 'meditation',
    image: 'https://www.figma.com/api/mcp/asset/e17be550-8f56-48fa-9f4c-1538a4d87953',
    category: 'Bien-être',
    title: 'Retraite méditation · Montmartre',
    date: 'Dim 22 juin · 09h00',
    location: 'Paris 18e · 3.5 km',
    price: '35 €',
  },
  {
    id: 'patisserie',
    image: 'https://www.figma.com/api/mcp/asset/a530db35-6762-42c2-a58f-75d6ce2720a4',
    category: 'Ateliers & initiations',
    title: 'Atelier Pâtisserie · Croissants maison',
    date: 'Sam 21 juin · 10h00',
    location: 'Paris 6e · 1.8 km',
    price: '65 €',
    originalPrice: '90 €',
    badge: 'Nouveau',
    badgeVariant: 'new',
  },
];

export const teamFavorites: Event[] = [
  {
    id: 'cabaret',
    image: 'https://www.figma.com/api/mcp/asset/8945411a-60bf-476b-a698-e0acc03a134e',
    category: 'Spectacles',
    title: 'Cabaret · Le Moulin Rouge',
    date: 'Sam 21 juin · 21h30',
    location: 'Paris 18e · 4 km',
    price: '55 €',
    originalPrice: '75 €',
    badge: 'Plus que 4 places',
    badgeVariant: 'scarcity',
  },
  {
    id: 'concert',
    image: 'https://www.figma.com/api/mcp/asset/6c3dc24e-bd4c-48d4-9adb-398d492dde7a',
    category: 'Musique',
    title: 'Concert acoustique · Marais Jazz',
    date: 'Ven 20 juin · 20h00',
    location: 'Paris 4e · 900 m',
    price: '15 €',
  },
  {
    id: 'expo',
    image: 'https://www.figma.com/api/mcp/asset/e17be550-8f56-48fa-9f4c-1538a4d87953',
    category: 'Expositions',
    title: "Expo photo · Paris vu d'en haut",
    date: "Ouvert jusqu'au 30 juin",
    location: 'Paris 8e · 2.2 km',
    price: '14 €',
  },
  {
    id: 'sashiko',
    image: 'https://www.figma.com/api/mcp/asset/a530db35-6762-42c2-a58f-75d6ce2720a4',
    category: 'Ateliers & initiations',
    title: 'Sashiko · Broderie japonaise',
    date: 'Dim 22 juin · 14h00',
    location: 'Paris 3e · 1.5 km',
    price: '40 €',
    badge: 'Nouveau',
    badgeVariant: 'new',
  },
];

export const nearbyEvents: Event[] = [
  {
    id: 'nearby-standup',
    image: 'https://www.figma.com/api/mcp/asset/6c3dc24e-bd4c-48d4-9adb-398d492dde7a',
    category: 'Spectacles',
    title: 'Soirée Stand-Up · Les Révélations',
    date: 'Sam 21 juin · 20h30',
    location: 'Paris 10e · 800 m',
    price: '12 €',
  },
  {
    id: 'nearby-concert',
    image: 'https://www.figma.com/api/mcp/asset/6c3dc24e-bd4c-48d4-9adb-398d492dde7a',
    category: 'Musique',
    title: 'Concert acoustique · Marais Jazz',
    date: 'Ven 20 juin · 20h00',
    location: 'Paris 4e · 900 m',
    price: '15 €',
  },
  {
    id: 'nearby-sashiko',
    image: 'https://www.figma.com/api/mcp/asset/a530db35-6762-42c2-a58f-75d6ce2720a4',
    category: 'Ateliers & initiations',
    title: 'Sashiko · Broderie japonaise',
    date: 'Dim 22 juin · 14h00',
    location: 'Paris 3e · 1.5 km',
    price: '40 €',
    badge: 'Nouveau',
    badgeVariant: 'new',
  },
];

export const communityMembers: CommunityMember[] = [
  {
    id: 'sofia',
    name: 'Sofia',
    image: 'https://www.figma.com/api/mcp/asset/ab0e2b8f-f0d3-4f08-91ae-e107f6ffdd6c',
    gradient: 'linear-gradient(135deg, rgba(255,99,102,0.1) 0%, rgba(255,99,102,0.04) 100%)',
  },
  {
    id: 'marcus',
    name: 'Marcus',
    image: 'https://www.figma.com/api/mcp/asset/778a583a-8892-4e75-8552-b4250fcb8b3d',
    gradient: 'linear-gradient(135deg, rgb(81,112,255) 0%, rgba(81,112,255,0.4) 100%)',
  },
  {
    id: 'lea',
    name: 'Léa',
    image: 'https://www.figma.com/api/mcp/asset/8adf3e16-0650-4d79-bb3a-3b0cd4d77494',
    gradient: 'linear-gradient(135deg, rgb(81,112,255) 0%, rgba(81,112,255,0.4) 100%)',
  },
  {
    id: 'karim',
    name: 'Karim',
    image: 'https://www.figma.com/api/mcp/asset/8caeaaf9-b8fe-4469-9726-a2f22775f252',
    gradient: 'linear-gradient(135deg, rgba(245,166,35,0.1) 0%, rgba(245,166,35,0.04) 100%)',
  },
  {
    id: 'ines',
    name: 'Inès',
    image: 'https://www.figma.com/api/mcp/asset/babf7c68-92a7-423f-bdd5-4e8fb1e05fd3',
    gradient: 'linear-gradient(135deg, rgb(81,112,255) 0%, rgba(81,112,255,0.4) 100%)',
  },
];

export const communityReviews: Review[] = [
  {
    id: 'review-marcus',
    author: 'Marcus',
    authorImage: 'https://www.figma.com/api/mcp/asset/778a583a-8892-4e75-8552-b4250fcb8b3d',
    authorGradient: 'linear-gradient(135deg, rgb(81,112,255) 0%, rgba(81,112,255,0.4) 100%)',
    timeAgo: 'Il y a 2h',
    emoji: '😂',
    text: '"Une soirée incroyable, j\'ai ri pendant 2h ! Le niveau des artistes était vraiment top."',
    eventTitle: 'Soirée Stand-Up · Les Révélations',
    eventImage: 'https://www.figma.com/api/mcp/asset/72c82a49-f37e-40a1-b8d3-5196b5b40f1c',
  },
  {
    id: 'review-lea',
    author: 'Léa',
    authorImage: 'https://www.figma.com/api/mcp/asset/8adf3e16-0650-4d79-bb3a-3b0cd4d77494',
    authorGradient: 'linear-gradient(135deg, rgb(81,112,255) 0%, rgba(81,112,255,0.4) 100%)',
    timeAgo: 'Il y a 5h',
    emoji: '❤️',
    text: '"Une parenthèse hors du temps, je recommande à 1000% pour décompresser."',
    eventTitle: 'Retraite méditation · Montmartre',
    eventImage: 'https://www.figma.com/api/mcp/asset/faef6f9b-890e-4214-97a5-24e89251f32a',
  },
];
