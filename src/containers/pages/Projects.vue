<template lang="pug">
  div
    h1 ICOs
    el-row(:gutter='20' v-loading="loading")
      el-col(:span='8' v-for="asset in assets")
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
