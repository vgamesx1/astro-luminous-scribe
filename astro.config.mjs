import { defineConfig } from 'astro/config';

export default defineConfig({
  // Static blog output (no adapter needed)
  output: 'static',
  prefetch: true
});
