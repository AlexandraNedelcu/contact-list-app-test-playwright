import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

export const validUser = {
  email: process.env.TEST_USER_EMAIL || '',
  password: process.env.TEST_USER_PASSWORD || '',
};

export function generateRandomUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();
  const password = faker.internet.password({ length: 10 });

  return {
    firstName,
    lastName,
    email,
    password,
  };
}

export function generateRandomContact() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    birthdate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
    email: faker.internet.email(),
    phone: faker.string.numeric(10),
    street1: faker.location.streetAddress(),
    street2: '',
    city: faker.location.city(),
    stateProvince: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };
}
