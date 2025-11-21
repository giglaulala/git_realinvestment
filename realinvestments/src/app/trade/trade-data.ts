import type { InvestmentOpportunity } from "./investment-opportunity-card";
import type { RoundUpdate } from "./round-updates";
import type { CompletedInvestment } from "./completed-investment-card";

export const roundUpdates: RoundUpdate[] = [
  {
    title: "Escrow audit scheduled",
    body: "TBI-01 escrow reconciliation with partner bank at 18:00. Updated statement uploaded to the data room.",
  },
  {
    title: "Transfer Board inquiry",
    body: "Two investors requested early-exit slots for BTM-02. Bulletin board opening once compliance approval clears.",
  },
];

export const completedInvestments: CompletedInvestment[] = [
  {
    code: "TBI-05",
    name: "Saburtalo Heights 702",
    location: "Tbilisi · Saburtalo district",
    fundedDate: "Jan 2024",
    purchasePrice: "₾82k",
    currentValue: "₾94k",
    appreciation: "₾12k",
    appreciationPercent: "+14.6%",
    investors: 28,
    totalDistributions: "₾3.2k",
    stats: [
      { label: "Actual IRR", value: "13.8%" },
      { label: "Construction", value: "85% complete" },
      { label: "Property type", value: "2BR apartment" },
    ],
  },
  {
    code: "BTM-03",
    name: "Beachfront Unit 1204",
    location: "Batumi · Seaside Boulevard",
    fundedDate: "Nov 2023",
    purchasePrice: "₾105k",
    currentValue: "₾128k",
    appreciation: "₾23k",
    appreciationPercent: "+21.9%",
    investors: 35,
    totalDistributions: "₾4.8k",
    stats: [
      { label: "Actual IRR", value: "19.2%" },
      { label: "Construction", value: "Completed" },
      { label: "Property type", value: "2BR apartment" },
    ],
  },
  {
    code: "TBI-06",
    name: "Mtatsminda View 503",
    location: "Tbilisi · Mtatsminda",
    fundedDate: "Mar 2024",
    purchasePrice: "₾68k",
    currentValue: "₾76k",
    appreciation: "₾8k",
    appreciationPercent: "+11.8%",
    investors: 22,
    totalDistributions: "₾1.9k",
    stats: [
      { label: "Actual IRR", value: "10.4%" },
      { label: "Construction", value: "72% complete" },
      { label: "Property type", value: "1BR apartment" },
    ],
  },
];

export const investmentOpportunities: InvestmentOpportunity[] = [
  {
    code: "TBI-01",
    name: "Vake Vista Unit 402",
    location: "Tbilisi · Vake district",
    status: "78% funded · Closes in 3 days",
    pricePerShare: "₾1,000",
    priceChange: "+3.2%",
    avgPrice: "₾970",
    winnings: "₾12.4k",
    investors: 78,
    availableShares: "22 shares remaining",
    stats: [
      { label: "Target raise", value: "₾100k" },
      { label: "Raised so far", value: "₾78k" },
      { label: "Projected IRR", value: "14%" },
    ],
    propertyDetails: {
      floor: "4th floor",
      totalFloors: "12 floors",
      size: "68 m²",
      rooms: "2 bedrooms",
      bathrooms: "1 bathroom",
      balconies: "1 balcony (8 m²)",
      parking: "1 parking space included",
      yearBuilt: "Under construction (2025)",
      condition: "New development",
    },
    nearbyAmenities: {
      metro: [
        { name: "Delisi Metro Station", distance: "850m" },
        { name: "State University Station", distance: "1.2km" },
      ],
      busStops: [
        { name: "Chavchavadze Ave Bus Stop", distance: "200m" },
        { name: "Vake Park Stop", distance: "400m" },
      ],
      stores: [
        { name: "Carrefour Supermarket", distance: "300m" },
        { name: "Goodwill Grocery", distance: "150m" },
        { name: "Agrohub Farmers Market", distance: "600m" },
      ],
      parks: [
        { name: "Vake Park", distance: "650m" },
        { name: "Turtle Lake", distance: "2.1km" },
      ],
      schools: [
        { name: "British-Georgian Academy", distance: "900m" },
        { name: "European School", distance: "1.4km" },
      ],
    },
    images: ["/properties/vake-vista-1.jpg"],
    description: "Modern 2-bedroom apartment in the heart of Vake, Tbilisi's most prestigious district. Features floor-to-ceiling windows, premium finishes, and stunning city views. Part of a new development with 24/7 security, fitness center, and underground parking.",
  },
  {
    code: "BTM-02",
    name: "Seaside Unit 805",
    location: "Batumi · New Boulevard",
    status: "52% funded · Closes in 5 days",
    pricePerShare: "₾850",
    priceChange: "-1.8%",
    avgPrice: "₾865",
    winnings: "₾8.2k",
    investors: 41,
    availableShares: "38 shares remaining",
    stats: [
      { label: "Target raise", value: "₾80k" },
      { label: "Raised so far", value: "₾41.6k" },
      { label: "Projected IRR", value: "12%" },
    ],
    propertyDetails: {
      floor: "8th floor",
      totalFloors: "22 floors",
      size: "52 m²",
      rooms: "1 bedroom",
      bathrooms: "1 bathroom",
      balconies: "1 balcony (6 m²)",
      parking: "No parking",
      yearBuilt: "Under construction (2025)",
      condition: "New development",
    },
    nearbyAmenities: {
      metro: [],
      busStops: [
        { name: "New Boulevard Stop", distance: "100m" },
        { name: "Seaside Park Stop", distance: "350m" },
      ],
      stores: [
        { name: "Batumi Mall", distance: "800m" },
        { name: "Metro City", distance: "1.1km" },
        { name: "Local Mini Mart", distance: "120m" },
      ],
      parks: [
        { name: "Batumi Boulevard", distance: "50m" },
        { name: "Seaside Park", distance: "400m" },
      ],
      schools: [
        { name: "International School of Batumi", distance: "1.5km" },
      ],
    },
    images: ["/properties/seaside-1.jpg"],
    description: "Beachfront 1-bedroom apartment on New Boulevard with stunning Black Sea views. Walking distance to the beach, restaurants, and entertainment. Perfect for vacation rentals or personal getaways.",
  },
  {
    code: "KTS-03",
    name: "Riverside Loft 203",
    location: "Kutaisi · Riverfront",
    status: "34% funded · Closes in 6 days",
    pricePerShare: "₾600",
    priceChange: "+2.1%",
    avgPrice: "₾590",
    winnings: "₾5.8k",
    investors: 34,
    availableShares: "66 shares remaining",
    stats: [
      { label: "Target raise", value: "₾60k" },
      { label: "Raised so far", value: "₾20.4k" },
      { label: "Projected IRR", value: "11%" },
    ],
    propertyDetails: {
      floor: "2nd floor",
      totalFloors: "5 floors",
      size: "38 m²",
      rooms: "Studio",
      bathrooms: "1 bathroom",
      balconies: "No balcony",
      parking: "Street parking",
      yearBuilt: "Under construction (2025)",
      condition: "New development",
    },
    nearbyAmenities: {
      metro: [],
      busStops: [
        { name: "Rioni Bridge Stop", distance: "250m" },
        { name: "Central Square", distance: "500m" },
      ],
      stores: [
        { name: "Nikora Supermarket", distance: "180m" },
        { name: "Kutaisi Bazaar", distance: "700m" },
      ],
      parks: [
        { name: "Rioni Riverside Walk", distance: "100m" },
        { name: "Central Park", distance: "800m" },
      ],
      schools: [
        { name: "Public School #12", distance: "600m" },
      ],
    },
    images: ["/properties/riverside-1.jpg"],
    description: "Cozy studio loft overlooking the Rioni River in historic Kutaisi. Ideal for students or young professionals. Close to city center and major attractions.",
  },
  {
    code: "TBI-04",
    name: "Sololaki Heritage 301",
    location: "Tbilisi · Sololaki",
    status: "New raise · Opened today",
    pricePerShare: "₾1,250",
    priceChange: "+4.5%",
    avgPrice: "₾1,200",
    winnings: "₾0",
    investors: 6,
    availableShares: "94 shares available",
    stats: [
      { label: "Target raise", value: "₾125k" },
      { label: "Raised so far", value: "₾7.5k" },
      { label: "Projected IRR", value: "16%" },
    ],
    propertyDetails: {
      floor: "3rd floor",
      totalFloors: "4 floors",
      size: "85 m²",
      rooms: "3 bedrooms",
      bathrooms: "2 bathrooms",
      balconies: "2 balconies (12 m² total)",
      parking: "No parking (street)",
      yearBuilt: "1890 (Renovation 2025)",
      condition: "Historic renovation",
    },
    nearbyAmenities: {
      metro: [
        { name: "Liberty Square", distance: "600m" },
        { name: "Rustaveli Station", distance: "900m" },
      ],
      busStops: [
        { name: "Sololaki Stop", distance: "150m" },
        { name: "Freedom Square", distance: "550m" },
      ],
      stores: [
        { name: "Spar Supermarket", distance: "300m" },
        { name: "Old Tbilisi Wine Shop", distance: "200m" },
      ],
      parks: [
        { name: "Narikala Fortress Grounds", distance: "400m" },
        { name: "Rike Park", distance: "1km" },
      ],
      schools: [
        { name: "Tbilisi Classical Gymnasium", distance: "500m" },
        { name: "QSI International School", distance: "1.2km" },
      ],
    },
    images: ["/properties/sololaki-1.jpg"],
    description: "Stunning 3-bedroom apartment in a renovated 19th-century building in historic Sololaki. Features original architectural details, high ceilings, and modern amenities. Walk to all major attractions and cultural sites.",
  },
];

