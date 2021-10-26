<template>
  <div class="billfold">
    <h2 class="billfold-title">Кошелёк криптовалют</h2>
    <div class="billfold-coins">
         <span class="billfold-coins-item"
               v-for="(coin, coinIdx) in roboCoin"
               :key="coinIdx"
               :style="{left: (coinIdx * 5) + 'px', zIndex: roboCoin - coin}"
         ></span>

    </div>
    <div class="billfold-message">
      <span class="billfold-message-text">{{ coinCount }}</span>
    </div>

    <div class="billfold-buttons">
      <a href="#" class="billfold-buttons-link" @click.prevent="addCoin">Нацыганить</a>

      <label class="billfold-buttons-check">
        <input type="checkbox">
        <span class="billfold-buttons-check-checkbox" :class="checked" @click.stop="changeCheckbox"></span>
        Цыганить по 5 монет
      </label>
    </div>

  </div>
</template>

<script>
export default {
  name: "Billfold",
  data() {
    return {
      checked: ''
    }
  },
  methods: {
    /**
     * Метод увеличивает количество монет на 1
     */
    addCoin() {
      this.$store.dispatch("setAddRoboCoin", this.checked);
    },

    /**
     * Метод переключает класс "checked"
     */
    changeCheckbox() {
      this.checked === 'checked' ? this.checked = '' : this.checked = 'checked';
    }
  },
  computed: {
    /**
     * Метод подсчета количества монет и склонения слова "монет"
     * @returns {string}
     */
    coinCount() {
      let cases = [2, 0, 1, 1, 1, 2],
          word = ['монета', 'монеты', 'монет'],
          text = word[(this.roboCoin % 100 > 4 && this.roboCoin % 100 < 20) ? 2 : cases[(this.roboCoin % 10 < 5) ? this.roboCoin % 10 : 5]];
      return `${this.roboCoin} biorobo ${text}`;
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
.billfold {
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

  &-coins {
    position: relative;
    display: flex;
    max-width: 340px;
    width: 100%;
    height: 20px;
    flex-wrap: wrap;
    margin-bottom: 24px;

    &-item {
      position: absolute;
      width: 16px;
      height: 20px;
      background: url("../assets/coin.png") no-repeat center;
    }
  }

  &-message {
    position: relative;
    width: 100%;
    max-width: 310px;
    height: 24px;
    margin-bottom: 40px;

    &-text {
      position: absolute;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 24px;
      color: #A3B8CC;
    }
  }

  &-buttons {
    position: relative;
    max-width: 350px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 100px;

    &-link {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #FF7F22;
      text-decoration: none;

      &::after {
        content: '';
        display: block;
        width: 104px;
        height: 1px;
        opacity: 0.5;
        background: #FF7F22;
      }
    }

    &-check {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #FFFFFF;

      input {
        position: absolute;
        appearance: none;
      }

      &-checkbox {
        position: absolute;
        width: 24px;
        height: 24px;
        top: 50%;
        transform: translate(0, -50%);
        border: 2px solid #A3B8CC;
        margin-left: -40px;

        &:hover {
          border: 2px solid #4C5865;
          cursor: pointer;
        }

        &.checked {
          background: url("../assets/check.svg") no-repeat center / 75%;
        }
      }
    }
  }
}

</style>