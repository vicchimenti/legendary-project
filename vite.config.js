import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      // make `import Icon from './icon.svg'` return a Vue component
      defaultImport: 'component',
      svgo: true,
      svgoConfig: {
        plugins: [
          // keep viewBox so the SVG scales via CSS
          { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
          // optional: strip hard-coded fills so CSS can control color
          // (remove if your icon needs its own internal colors)
          { name: 'removeAttrs', params: { attrs: 'fill' } },
          // optional: let width/height be controlled by CSS
          { name: 'removeDimensions', active: true }
        ]
      }
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        // Make Bootstrap mixins/variables available in every SFC
        additionalData: `
          @import "bootstrap/scss/functions";
          @import "bootstrap/scss/variables";
          @import "bootstrap/scss/maps";
          @import "bootstrap/scss/mixins";
        `
      }
    }
  }
})