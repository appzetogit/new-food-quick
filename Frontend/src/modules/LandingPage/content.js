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
  { name: 'Momos', photo: '1534422298391-e4f8c172dddb' },
  { name: 'Paneer', photo: '1631452180519-c014fe946bc7' },
  { name: 'Samosa', photo: '1601050690597-df0568f70950' },
  { name: 'Rolls', photo: '1626700051175-6818013e1d4f' },
  { name: 'Thali', photo: '1546833999-b9f581a1996d' },
  { name: 'Sandwich', photo: '1528735602780-2552fd46c7af' },
  { name: 'Naan', photo: '1565557623262-b51c2513a641' },
  { name: 'Ice cream', photo: '1497034825429-c343d7c6a68f' },
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
  { name: 'Rice', photo: '1586201375761-83865001e31c' },
  { name: 'Spices', photo: '1596040033229-a9821ebd058d' },
  { name: 'Dry fruits', photo: '1508061253366-f7da158b6d46' },
  { name: 'Pulses', photo: '1515543904379-3d757afe72e4' },
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
export const OWNER = { name: 'Mrs. Manisha Patil', role: 'Director', bio: '', photo: '', phone: '+91 97121 16638', email: '' }
// { title, text, when } -- when is optional, e.g. '2027'
export const PLANS = []

// Everything below describes what the app does today. No numbers are claimed.
export const TRUST = [
  { icon: 'basket', title: 'Food and groceries', text: 'Restaurants and stores under one name' },
  { icon: 'map', title: 'Follow your order', text: 'See your rider on the map' },
  { icon: 'card', title: 'Pay your way', text: 'Online, or cash where it is allowed' },
  { icon: 'help', title: 'Help when you need it', text: 'Raise a ticket from your account' },
]

export const SPOTLIGHTS = [
  {
    title: 'A restaurant for every mood',
    text: 'Quick bites, full meals and something sweet to finish. Search for a dish, or browse until something catches your eye.',
    points: ['Filter for vegetarian dishes', 'See ratings and reviews before you order', 'Save the places you like to your favourites'],
    cta: 'Browse restaurants', to: '/food/user/restaurants', photo: '1565557623262-b51c2513a641', alt: 'A plate of curry with naan',
  },
  {
    title: 'Fresh produce and the weekly basics',
    text: 'Fruit, vegetables, dairy, grains and home care, sold by stores around you and ordered in the app.',
    points: ['Shop by category', 'Choose the size or pack you want', 'Order from stores near you'],
    photo: '1518843875459-f738682238a6', alt: 'Tomatoes, carrots, radishes and other vegetables',
  },
  {
    title: 'Going out instead? Book a table',
    text: 'Find a place to eat, pick a time and reserve your table before you leave home.',
    points: ['Explore places to dine', 'Request a table for your group', 'Keep your bookings in your account'],
    cta: 'Explore dining', to: '/food/user/dining', photo: '1414235077428-338989a2e8c0', alt: 'A plated dish on a restaurant table',
  },
]

export const FEATURES = [
  { icon: 'percent', title: 'Offers and coupons', text: 'See the deals running at restaurants near you.' },
  { icon: 'leaf', title: 'Veg mode', text: 'Switch it on to see vegetarian dishes.' },
  { icon: 'heart', title: 'Favourites', text: 'Keep your usual places a tap away.' },
  { icon: 'wallet', title: 'Wallet', text: 'Hold a balance and see every entry.' },
  { icon: 'gift', title: 'Refer a friend', text: 'Share your invite from your profile.' },
  { icon: 'file', title: 'Invoices', text: 'Open the bill for any past order.' },
  { icon: 'star', title: 'Ratings and reviews', text: 'Read what others thought, then add yours.' },
  { icon: 'map', title: 'Saved addresses', text: 'Home, work, or wherever you are today.' },
]

export const CARE = [
  { icon: 'food', title: 'Food licence details', text: 'Restaurants add their FSSAI licence, and its expiry is tracked.' },
  { icon: 'bike', title: 'Rider documents', text: 'Riders submit their documents when they join.' },
  { icon: 'shield', title: 'Secure sign-in', text: 'You sign in with a one-time code sent to your phone.' },
  { icon: 'help', title: 'Support tickets', text: 'Report a problem with an order and follow the reply.' },
]

export const PARTNER_TOOLS = [
  {
    name: 'Restaurants', title: 'Run the kitchen, not the paperwork', text: 'Orders, menu and money in one dashboard.', cta: 'List your restaurant', to: '/partner',
    points: ['Menu, categories and combos', 'Live orders and timings', 'Coupons and offers', 'Ratings and reviews', 'Earnings and withdrawals', 'Table reservations'],
  },
  {
    name: 'Stores', title: 'Your shelf, open to the neighbourhood', text: 'Keep products and stock up to date as you sell.', cta: 'Open your store', to: '/partner',
    points: ['Products and pack sizes', 'Stock and inventory', 'Live orders', 'Delivery radius', 'Reports to download', 'Earnings and withdrawals'],
  },
  {
    name: 'Riders', title: 'Ride, deliver, see what you earned', text: 'One app for every delivery you take.', cta: 'Ride with us', to: '/food/delivery/welcome',
    points: ['New order alerts', 'Pickup and drop on the map', 'Delivery history', 'Earnings and payouts', 'Help and support tickets', 'Profile and documents'],
  },
]

// Draft wording, for the company to confirm.
export const VALUES = [
  { title: 'Our mission', text: 'Make everyday food and essentials simple to order, from people and places close to home.' },
  { title: 'Our vision', text: 'One dependable app a neighbourhood can turn to for meals, groceries and work.' },
  { title: 'Our values', text: 'Be clear about prices, fair to partners and quick to put things right.' },
]

export const FAQS = [
  { question: `What can I order on ${BRAND}?`, answer: 'Meals from restaurants, and groceries and daily essentials from stores near you.' },
  { question: 'How do I order groceries?', answer: `Groceries are ordered in the ${BRAND} app. Food can be ordered here on the website too.` },
  { question: 'Can I track my order?', answer: 'Yes. Once a rider picks up your order you can follow them on the map.' },
  { question: 'How do I sell or deliver with you?', answer: 'Use the partner section on this page. Restaurants, stores and riders each have their own sign-up.' },
  { question: 'How can I pay?', answer: 'Pay online, or in cash where the restaurant or store allows it.' },
  { question: 'Can I book a table?', answer: 'Yes. Open Dining, choose a restaurant and request a table.' },
  { question: 'Can I see only vegetarian food?', answer: 'Yes. Turn on veg mode on the food home page.' },
  { question: 'Where do I find my bill?', answer: 'Open your orders, choose one, and view its invoice.' },
  { question: 'Something is wrong with my order. What do I do?', answer: 'Open Help from your order and send the details. You can follow the reply in your account.' },
  { question: 'How do I cancel an order?', answer: 'Open the order to see whether it can still be cancelled. The cancellation and refund policies are linked at the bottom of this page.' },
]
