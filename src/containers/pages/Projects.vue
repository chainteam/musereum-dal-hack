<template lang="pug">
  div
    h1 ICOs
    el-row(:gutter='20' v-loading="loading")
      el-col(:span='8' v-for="asset in assets")
<<<<<<< HEAD
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
                   
=======
        <div class="card ico">
            <div class="card-img-cnt" v-loading='{{ asset.loadingMeta }}'>
                <img src="{{ asset.logo }}">
            </div>
            <div class="card-info">
                <div class="card-info-title">
                    Havana (feat. Yound Thug)
                </div>
                <div class="card-info-author">
                    Camila Cabello
                </div>
                <div class="card-info-types">
                    <div class="card-info-type">single</div>
                </div>
                <div class="card-info-genre">
                    Pop
                </div>
                <div class="card-info-date">
                    Release: <span class="card-info-date-txt">5 Aug, 2017</span>
                </div>
                <div class="card-info-deadline">
                    <span class="card-info-deadline-left">5 days left</span> (<span class="card-info-deadline-left_timer">05d 00h 49m 34s</span>)
                </div>
                <div class="card-info-score">
                    <div class="card-info-score-num">345 678</div>
                    <div class="card-info-score-tab">
                        <div class="card-info-score-tab--done" style="width: 60%"></div>
                    </div>
                    <div class="card-info-score-col">
                        <div class="card-info-score-col-i collected">
                            <div class="muser_money"><span class="muser_money--num">53,025.27</span> ETM</div>
                            <div class="card-info-score-col-i-label">Collected</div>
                        </div>
                        <div class="card-info-score-col-i hard_cap">
                            <div class="muser_money"><span class="muser_money--num">60,000</span> ETM</div>
                            <div class="card-info-score-col-i-label">Hard cap</div>
                        </div>
                    </div>
                </div>
>>>>>>> origin/02-projects-list
                p Some very short description
            </div>
            el-button.button(type='primary') Buy
        </div>
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
