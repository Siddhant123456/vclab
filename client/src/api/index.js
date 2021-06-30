import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})


export const signIn = (formData) => API.post('/users/signin',formData)

export const signUp = (formData) => API.post('/users/signup',formData)

export const newClass = (formData) => API.post('/newclass/class',formData)

export const joinClass = (formData) => API.post('/newclass/join' , formData)

export const fetchClasses = (id) => API.get(`/classes/${id}`);

export const leaveClass = (id,user) => API.get(`/classes/leave/${id}/${user}`);


export const updateProfile = (formData) => API.post('/profile' , formData);

export const createNote = (formData) => API.post('/notes/create',formData)

export const fetchNotes = (id) => API.get(`/notes/fetch/${id}`);

export const deleteNote = (id) => API.get(`/notes/remove/${id}`);