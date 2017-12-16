<template lang="pug">
  div
    h1 Assets

    .card-list
      el-card.card.ico(v-for='asset in assets')
        .card-img-cnt(v-loading='asset.loadingMeta')
          img.card-img(:src='asset.logo')
        .card-info
          h3.card-info-title 
            span(style='margin-right: 10px') {{ asset.name }}
          .card-info-genres(size='mini') 
            el-tag.card-info-genre(size='mini') Mini
          .card-info-date
            span.card-info-date-txt 5 Aug, 2017
          .card-info-deadline
            span.card-info-deadline-left 5 days left
            //- span.card-info-deadline-left_timer 05d 00h 49m 34s
          .card-info-score
            //- .card-info-score-num 345 678
            .card-info-score-tab
              el-progress.card-info-score-tab-progress(:percentage='asset.progress')
            .card-info-score-col
              .card-info-score-col-i.collected
                .muser_money
                  span.muser_money--num 53,025.27
                .card-info-score-col-i-label Collected
              .card-info-score-col-i.hard_cap
                .muser_money
                  span.muser_money--num 60,000
                .card-info-score-col-i-label Hard cap
            el-button.button(type='primary' style='margin-top: 10px') Buy
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

<style lang="scss" scoped>
  .card {
    margin: 10px;

    &-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    &-img {
      width: 300px;
      height: 300px;
      object-fit: contains;
    }

    &-info {
      &-title {
        max-width: 300px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &-genres {
        margin-bottom: 10px;
      }

      &-score {
        &-col {
          display: flex;
          justify-content: space-between;
        }
        &-tab {
          margin-bottom: 10px;
        }
      }

      &-date {
        color: gray;
        margin-bottom: 20px;
      }

      &-deadline {
        margin-bottom: 10px;

        &-left {
          color: red;
          font-weight: bold;
        }
      }
    }
  }

</style>
