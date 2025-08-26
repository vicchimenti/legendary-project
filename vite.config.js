// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd(), '') 

  const BASE = env.VITE_BASE || process.env.VITE_BASE || '/' 

  return {
    base: BASE,
    plugins: [
      vue(),
      svgLoader({
        defaultImport: 'component',
        svgo: true,
        svgoConfig: {
          plugins: [
            { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
            { name: 'removeAttrs', params: { attrs: 'fill' } },
            { name: 'removeDimensions', active: true }
          ]
        }
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "bootstrap/scss/functions";
            @import "bootstrap/scss/variables";
            @import "bootstrap/scss/maps";
            @import "bootstrap/scss/mixins";
          `
        }
      }
    }
  }
})
