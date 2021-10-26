<template>
  <div id="app">
    <Header/>
    <Billfold/>
    <ComponentMarket/>
    <Storage/>
    <Production/>
    <div class="modal-overlay" v-show="activeModal === 'modal'">
      <Modal/>
    </div>
    <div class="modal-overlay" v-show="activeModal === 'win-modal'">
      <WinModal/>
    </div>

  </div>
</template>

<script>

import Header from "@/components/Header";
import Billfold from "@/components/Billfold";
import ComponentMarket from "@/components/ComponentMarket";
import Storage from "@/components/Storage";
import Production from "@/components/Production";

const Modal = () => import('@/components/Modal');
const WinModal = () => import('@/components/WinModal');
export default {
  name: 'App',
  components: {Header, Billfold, ComponentMarket, Storage, Production, Modal, WinModal},
  computed: {
    /**
     * Вовращает общее количество монет
     * @returns {any}
     */
    roboCoin() {
      return this.$store.getters.ROBOCOIN;
    },

    /**
     * Метод открытия модального окна
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

<style>

body {
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: radial-gradient(82.33% 70.44% at 50% 0%, #26394D 0%, #212529 100%);
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6, p {
  margin: 0;
  padding: 0;
}

#app {
  max-width: 1016px;
  width: 100%;
  height: 100%;
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
}

.modal-overlay {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 101;
}
</style>
