<template>
  <div class="market">
    <h2 class="market-title">Рынок комплектующих</h2>

    <div class="market-block">
      <div class="market-block-item"
           v-for="card in marketCards"
           :key="card.id"
      >
        <div class="market-block-item-img">
          <img :src="card.img" :alt="card.title">
        </div>

        <div class="market-block-item-info">
          <span class="market-block-item-info-title">{{ card.title }}</span>
          <span class="market-block-item-info-subtitle">Стоимость: {{ card.cost }} монет</span>
        </div>

        <button class="market-block-item-btn" :disabled="roboCoin < card.cost" @click.stop="addToStorage(card)">Установить</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "ComponentMarket",
  data() {
    return {}
  },
  methods: {
    addToStorage(data) {
      this.$store.dispatch('setAddToStorage', data);
    },
  },
  computed: {
    /**
     * Возвращает массив комплектующих на рынке
     * @returns {any}
     */
    marketCards() {
      return this.$store.getters.ROBOCOMPONENTS;
    },

    /**
     * Вовращает общее количество монет
     * @returns {any}
     */
    roboCoin() {
      return this.$store.getters.ROBOCOIN;
    },

  },
}
</script>

<style scoped lang="scss">
.market {
  max-width: 757px;
  width: 100%;
  margin: auto;
  flex-wrap: wrap;

  &-title {
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    color: #FFFFFF;
    margin-bottom: 60px;
  }

  &-block {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 24px;
    margin-bottom: 100px;

    &-item {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      width: 236px;
      height: 252px;

      &-info {
        &-title {
          display: block;
          text-align: center;
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 32px;
          color: #FFFFFF;
          margin-bottom: 5px;
        }

        &-subtitle {
          display: block;
          text-align: center;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          color: #A3B8CC;
        }
      }

      &:last-child {
        .market-block-item-img {
          width: 88px;
          height: 88px;
          display: flex;
          align-items: center;
          justify-content: center;
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          border: 3px solid #FF7F22;
        }
      }

      &-img {
        width: 101px;
        height: 94px;
        display: flex;
        filter: drop-shadow(0px 8px 90px #FF7F22);

        img {
          margin: auto;
        }
      }

      &-btn {
        padding: 12px 50px;
        background: linear-gradient(180deg, #FF7F22 0%, #FF5722 100%);
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        border: none;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #FFFFFF;

        &:hover {
          background: #FF5722;
          cursor: pointer;
        }

        &:active {
          background: #FF7F22;
        }

        &:disabled {
          background: #4C5865;
          color: #7D90A6;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>