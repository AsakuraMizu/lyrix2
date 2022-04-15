import axios from 'axios';
import axiosTauriAdapter from 'axios-tauri-adapter';

const client = axios.create({
  adapter: '__TAURI__' in window ? axiosTauriAdapter : undefined,
});

export default client;
