// faker.js
const { faker } = require('@faker-js/faker');

// Generate a single fake user
const generateFakeUser = () => ({
  _id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  profilePicture: faker.image.avatar(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  role: faker.helpers.arrayElement(['Buyer', 'Seller', 'Service Provider', 'Client']),
});

// Generate an array of fake users
const generateFakeUsers = (count = 10) => Array.from({ length: count }, generateFakeUser);

// Generate a single fake product
const generateFakeProduct = () => ({
  _id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.commerce.price(),
  category: faker.commerce.department(),
  image: faker.image.urlPicsumPhotos(), // A placeholder product image
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  seller: faker.person.fullName(),
});

// Generate an array of fake products
const generateFakeProducts = (count = 10) => Array.from({ length: count }, generateFakeProduct);

// Generate a single fake service
const generateFakeService = () => ({
  _id: faker.string.uuid(),
  title: faker.company.catchPhrase(), // A catchy service title
  description: faker.lorem.paragraph(),
  price: faker.commerce.price(),
  category: faker.helpers.arrayElement(['Consulting', 'Maintenance', 'Delivery', 'Design']),
  provider: faker.person.fullName(),
  image: faker.image.avatar(), // You can use a different image method if needed
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
});

// Generate an array of fake services
const generateFakeServices = (count = 10) => Array.from({ length: count }, generateFakeService);

module.exports = {
  generateFakeUser,
  generateFakeUsers,
  generateFakeProduct,
  generateFakeProducts,
  generateFakeService,
  generateFakeServices,
};
