/*
 * Everything the landing page says and shows.
 *
 * Photos come from Unsplash's CDN (free under the Unsplash licence), sized on
 * their side -- the same approach as the partner sign-up page. None of them
 * carries another company's branding; keep it that way when swapping one.
 */
export const photo = (id, w = 480, h) =>
  `https://images.unsplash.com/photo-${id}?w=${w}${h ? `&h=${h}` : ''}&q=70&auto=format&fit=crop`

export const BRAND = 'Aodo'
export const FOOD_HOME = '/food/user'

export const PHOTOS = {
  thali: '1585937421612-70a008356fbe',
  produce: '1542838132-92c53300491e',
  fruits: '1610832958506-aa56368176cf',
  rider: '1617347454431-f49d7ff5c3b1',
  store: '1578916171728-46686eac8d58',
  kitchen: '1556910103-1c02745aae4d',
  table: '1504674900247-0877df9cc836',
}

/** Opens the food app's search, which takes ?q=. */
export const searchPath = (q) => `${FOOD_HOME}/search?q=${encodeURIComponent(q)}`

export const CRAVINGS = [
  { name: 'Biryani', photo: '1589302168068-964664d93dc0' },
  { name: 'Pizza', photo: '1513104890138-7c749659a591' },
  { name: 'Burger', photo: '1568901346375-23c9450c58cd' },
  { name: 'Dosa', photo: '1668236543090-82eba5ee5976' },
  { name: 'Idli', photo: '1630383249896-424e482df921' },
  { name: 'Noodles', photo: '1585032226651-759b368d7246' },
  { name: 'Salad', photo: '1512621776951-a57141f2eefd' },
  { name: 'Cake', photo: '1578985545062-69928b1d9587' },
]

export const AISLES = [
  { name: 'Fresh fruits', photo: '1610832958506-aa56368176cf' },
  { name: 'Vegetables', photo: '1597362925123-77861d3fbac7' },
  { name: 'Milk & dairy', photo: '1550583724-b2692b85b150' },
  { name: 'Eggs', photo: '1582722872445-44dc5f7e3c8f' },
  { name: 'Breads & bakery', photo: '1509440159596-0249088772ff' },
  { name: 'Tea & coffee', photo: '1509042239860-f550ce710b93' },
  { name: 'Sweet treats', photo: '1551024601-bec78aea704b' },
  { name: 'Home cleaning', photo: '1583947215259-38e31be8751f' },
]

export const STEPS = [
  { title: 'Choose', animation: 'searching', text: 'Pick dishes from a restaurant or fill a basket from a store near you.' },
  { title: 'Pay your way', animation: 'order-placed', once: true, text: 'Pay online, or in cash where the restaurant or store allows it.' },
  { title: 'Follow it home', animation: 'scooter', text: 'See your order being prepared and watch the rider on the map.' },
]

export const PARTNERS = [
  { title: 'Restaurants', text: 'Put your menu online and take orders from your own dashboard.', cta: 'List your restaurant', to: '/partner', photo: PHOTOS.kitchen },
  { title: 'Stores', text: 'Sell groceries and daily essentials to homes around you.', cta: 'Open your store', to: '/partner', photo: PHOTOS.store },
  { title: 'Riders', text: 'Deliver food and groceries, and keep track of every earning.', cta: 'Ride with us', to: '/food/delivery/welcome', photo: PHOTOS.rider },
]

export const COMPANY = `${BRAND} brings restaurant meals and everyday groceries together. Customers order from restaurants and stores near them, and delivery partners bring it home.`

export const ABOUT = [
  { title: 'For customers', text: 'Food on the website and app, groceries in the app, and order tracking on a map.' },
  { title: 'For restaurants and stores', text: 'Their own dashboard to list items, manage orders and reach people nearby.' },
  { title: 'For riders', text: 'Deliver food and groceries from one app, with every earning on record.' },
]

// Hidden on the page until filled in with the owner's real details and plans.
export const OWNER = { name: '', role: '', bio: '', photo: '', phone: '', email: '' }
// { title, text, when } -- when is optional, e.g. '2027'
export const PLANS = []

export const FAQS = [
  { question: `What can I order on ${BRAND}?`, answer: 'Meals from restaurants, and groceries and daily essentials from stores near you.' },
  { question: 'How do I order groceries?', answer: `Groceries are ordered in the ${BRAND} app. Food can be ordered here on the website too.` },
  { question: 'Can I track my order?', answer: 'Yes. Once a rider picks up your order you can follow them on the map.' },
  { question: 'How do I sell or deliver with you?', answer: 'Use the partner section on this page. Restaurants, stores and riders each have their own sign-up.' },
]
