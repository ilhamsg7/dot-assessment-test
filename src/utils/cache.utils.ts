import { LRUCache } from 'lru-cache';

const cache = new LRUCache({
  max: 50,               // Maksimal item yang disimpan di cache
  ttl: 1000 * 60 * 5,     // Waktu simpan di cache, dalam milidetik (5 menit)
});

export default cache;
