import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})


export const signIn = (formData) => API.post('/users/signin',formData)

export const signUp = (formData) => API.post('/users/signup',formData)

export const newClass = (formData) => API.post('/newclass/class',formData)

export const joinClass = (formData) => API.post('/newclass/join' , formData)

export const fetchClasses = (id) => API.get(`/classes/${id}`);


export const updateProfile = (formData) => API.post('/profile' , formData);