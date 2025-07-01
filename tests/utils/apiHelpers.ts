import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL || '';

// Register User
export async function registerUser(firstName: string, lastName: string, email: string, password: string) {
  const response = await axios.post(`${BASE_URL}/users`, {
    firstName,
    lastName,
    email,
    password,
  });
  return response.data;
}

// Login User
export async function loginUser(email: string, password: string) {
  const response = await axios.post(`${BASE_URL}/users/login`, {
    email,
    password,
  });
  return response.data.token;
}

// Logout User
export async function logoutUser(token: string) {
  const response = await axios.post(`${BASE_URL}/users/logout`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status === 200;
}

// Add new contact
export async function createContact(token: string, contactData: any) {
  const response = await axios.post(`${BASE_URL}/contacts`, contactData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Get all contacts
export async function getContacts(token: string) {
  const response = await axios.get(`${BASE_URL}/contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Fill contact form for editing
export async function getContactForEdit(token: string, contactId: string) {
  const response = await axios.patch(`${BASE_URL}/contacts/${contactId}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Update contact details
export async function updateContact(token: string, contactId: string, updatedData: any) {
  const response = await axios.put(`${BASE_URL}/contacts/${contactId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

// Delete contact
export async function deleteContact(token: string, contactId: string) {
  const response = await axios.delete(`${BASE_URL}/contacts/${contactId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.status === 200;
}

// Delete all contacts
export async function deleteAllContacts(token: string) {
  const contacts = await getContacts(token);
  for (const contact of contacts) {
    await deleteContact(token, contact._id);
  }
}