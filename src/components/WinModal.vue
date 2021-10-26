<template>
  <div class="modal">
    <span class="modal-close" @click.stop="activeModal = ''"></span>
    <div class="modal-content">
      <div class="modal-content-top">
        <h2 class="modal-content-top-title">Биоробот
          произведён</h2>
      </div>
      <p class="modal-content-subtitle">Поздравляем!
        Вы произвели биоробота</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "WinModal",
  computed: {
    /**
     * Метод открытия и закрытия модального окна
     */
    activeModal: {
      get() {
        return this.$store.getters.ACTIVEMODAL;
      },
      set(activeModalName) {
        this.$store.dispatch("setActiveModal", activeModalName);
      },
    },
  }
}
</script>

<style scoped lang="scss">
.modal {
  position: relative;
  display: flex;
  width: 496px;
  height: 240px;
  background: #FFFFFF;
  border-radius: 10px;
  z-index: 1;

  &-close {
    position: absolute;
    width: 32px;
    height: 32px;
    top: 8px;
    right: 8px;
    background: url("../assets/close.svg") no-repeat center;
    cursor: pointer;
  }

  &-content {
    margin: auto;

    &-top {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 395px;
      margin-bottom: 23px;

      &-img {
        width: 43px;
        height: 52px;
        background: url("../assets/big_coin.png") no-repeat center;
      }

      &-title {
        width: 320px;
        font-weight: 600;
        font-size: 32px;
        line-height: 40px;
        color: #212529;
      }
    }

    &-subtitle {
      width: 306px;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
      color: #4C5865;
      margin-left: 40px;
    }
  }
}
</style>