// Curated media URLs (Unsplash — public, royalty-free). Keep each image bound to a
// semantic role so swapping the asset later is a one-line change.
export const IMG = {
  hero: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1800&q=80&auto=format&fit=crop',
  heroAlt:
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1800&q=80&auto=format&fit=crop',
  tbilisi1:
    'https://images.unsplash.com/photo-1562977045-f2e8f2c7540d?w=1200&q=80&auto=format&fit=crop',
  tbilisi2:
    'https://images.unsplash.com/photo-1584132905271-512c958d674a?w=1200&q=80&auto=format&fit=crop',
  tbilisi3:
    'https://images.unsplash.com/photo-1591017683260-5d58d04e5f6b?w=1200&q=80&auto=format&fit=crop',
  tbilisi4:
    'https://images.unsplash.com/photo-1585184394271-4c0a47dc59c9?w=1200&q=80&auto=format&fit=crop',
  tbilisi5:
    'https://images.unsplash.com/photo-1655720020792-1a3b0a1f3b1a?w=1200&q=80&auto=format&fit=crop',

  clinic1:
    'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=1400&q=80&auto=format&fit=crop',
  clinic2:
    'https://images.unsplash.com/photo-1551076805-e1869033e561?w=1400&q=80&auto=format&fit=crop',
  clinic3:
    'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1400&q=80&auto=format&fit=crop',

  specialtyDental:
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80&auto=format&fit=crop',
  specialtyHair:
    'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=1200&q=80&auto=format&fit=crop',
  specialtyDerm:
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80&auto=format&fit=crop',
  specialtyCheckup:
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80&auto=format&fit=crop',

  doctor1:
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80&auto=format&fit=crop',
  doctor2:
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80&auto=format&fit=crop',
  doctor3:
    'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&q=80&auto=format&fit=crop',
  doctor4:
    'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=800&q=80&auto=format&fit=crop',

  patient1:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80&auto=format&fit=crop',
  patient2:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
  patient3:
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop',
  patient4:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop',

  airport:
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80&auto=format&fit=crop',
  oldTown:
    'https://images.unsplash.com/photo-1569241920098-c4f71f52a40c?w=1600&q=80&auto=format&fit=crop',
  bath:
    'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80&auto=format&fit=crop',
} as const;

export const YT_TOUR_ID = 'LXb3EKWsInQ'; // placeholder — swap for the real tour.

export function flagUrl(cc: string): string {
  return `https://flagcdn.com/48x36/${cc.toLowerCase()}.png`;
}
