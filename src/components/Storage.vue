<template>
  <div class="storage">
    <h2 class="storage-title">Склад</h2>

    <div class="storage-block">

      <div class="storage-block-item"
           v-for="card in storageCards"
           :key="card.id"
      >
        <div class="storage-block-item-info">
          <span class="storage-block-item-info-title">{{ card.title }}</span>
          <span class="storage-block-item-info-subtitle">Стоимость: {{ card.price }} монет</span>
        </div>

        <div class="storage-block-item-info-count">
          <span>{{ card.count }} шт</span>
        </div>

        <button class="storage-block-item-info-btn" :disabled="card.count === 0" @click.stop="sellComponent(card)">
          Продать
        </button>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "Storage",
  data() {
    return {}
  },
  methods: {
    sellComponent(data) {
      if (this.roboCoin < 100) {
        this.$store.dispatch('setSellComponent', data);
      }
    }
  },
  computed: {
    /**
     * Возвращает массив комплектующих на складе
     * @returns {any}
     */
    storageCards() {
      return this.$store.getters.ROBOCOMPONENTS;
    },

    /**
     * Вовращает общее количество монет
     * @returns {any}
     */
    roboCoin() {
      return this.$store.getters.ROBOCOIN;
    }
  },
}
</script>

<style scoped lang="scss">
.storage {
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
      height: 170px;

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

        &-count {
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 24px;
          color: #FFFFFF;
        }

        &-btn {
          padding: 10px 60px;
          background: transparent;
          -webkit-border-radius: 50px;
          -moz-border-radius: 50px;
          border-radius: 50px;
          border: 2px solid #7CDAF9;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: #7CDAF9;

          &:hover {
            background: #7CDAF9;
            color: #212529;
            filter: drop-shadow(0px 10px 40px #1E5466);
            cursor: pointer;
          }

          &:active {
            color: #7CDAF9;
            background: transparent;
          }

          &:disabled {
            background: transparent;
            color: #7D90A6;
            filter: none;
            border: 2px solid #7D90A6;
            cursor: not-allowed;
          }
        }
      }
    }
  }

}
</style>