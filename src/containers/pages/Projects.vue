<template lang="pug">
  div
    h1 Projects
    el-row(:gutter='20' v-loading="loading")
      el-col(:span='8' v-for="asset in assets")
        el-card.a-assets-list__asset.a-asset-summary.a-card.a-card_horizontal(:body-style="{ padding: '20px' }" style='margin-bottom: 20px')
          el-row(:gutter='20' type='flex')
            el-col.a-card__image-holder(:span='8' style='display: flex; align-items: center; justify-content: center;' v-loading='asset.loadingMeta')
              img.a-card__image.a-image.a-image_responsive(:src='asset.logo')
            el-col.a-card__body(:span='16')
              router-link(:to="{ name: 'asset', params: { id: address } }")
                h3(v-if='!small') 
                  span {{asset.name}} 
                  span {{asset.ticker}} 
                  el-progress(:percentage='asset.progress')
              div(v-if='!small')
                p.a-card__genre Pop
                p.a-card__release Release: 5 Aug 2017
                <p>test</p>
                   
                p Some very short description
                el-button.button(type='primary') Buy
</template>

<script>
import AeCurrency from './components/Currency'
import { logos, names, progress } from '~/src/util/mock/project'
export default {
  name: 'projects',
  props: ['user'],
  components: {
    AeCurrency
  },

  data () {
    console.log(logos, progress, names)
    return {
      loading: true,
      assets: []
    }
  },

  mounted () {
    setTimeout(() => {
      this.loading = false
      this.assets = Array(15).fill().map((n, index) => {
        setTimeout(() => {
          this.$set(this.assets, index, {
            ...this.assets[index],
            logo: logos[index],
            progress: Math.floor(progress[index] / 100),
            loadingMeta: false
          })
        }, Math.random() * 4000)
        return {
          name: names[index],
          loadingMeta: true
          // logo: logos[index],
          // progress: Math.floor(progress[index] / 100)
        }
      })
    }, 650)
  }
}
</script>

<style scoped>
  .a-card__genre {
    color: gray;
  }
</style>
