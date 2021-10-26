<template>
  <div class="production">
    <h1 class="production-title">Производство</h1>

    <div class="production-block">

      <div class="production-block-type">

        <div class="production-block-type-wrapper">
          <div class="production-block-type-wrapper-biorobot">

            <span class="production-block-type-wrapper-biorobot-title">Тип биоробота:</span>

            <div class="production-block-type-wrapper-biorobot-radio">
              <label class="production-block-type-wrapper-biorobot-radio-labelone">
                <input type="radio" name="type" value="frontEnd" v-model="type"
                       class="production-block-type-wrapper-biorobot-radio-labelone-select">
                <span class="production-block-type-wrapper-biorobot-radio-labelone-btnone"
                ></span>
                <span class="production-block-type-wrapper-biorobot-radio-labelone-text">FrontEnd</span>
              </label>

              <label class="production-block-type-wrapper-biorobot-radio-labeltwo">
                <input type="radio" name="type" value="design" v-model="type"
                       class="production-block-type-wrapper-biorobot-radio-labeltwo-select">
                <span class="production-block-type-wrapper-biorobot-radio-labeltwo-btntwo"
                ></span>
                <span class="production-block-type-wrapper-biorobot-radio-labeltwo-text">Design</span>
              </label>

            </div>

          </div>

          <div class="production-block-type-wrapper-stabilizator">

            <div class="production-block-type-wrapper-stabilizator">

              <span class="production-block-type-wrapper-stabilizator-title">Стабилизатор:</span>

              <div class="production-block-type-wrapper-stabilizator-radio">
                <label class="production-block-type-wrapper-stabilizator-radio-labelone">
                  <input type="radio" name="gender" value="male" v-model="gender"
                         class="production-block-type-wrapper-stabilizator-radio-labelone-select">
                  <span class="production-block-type-wrapper-stabilizator-radio-labelone-btnone"></span>
                  <span class="production-block-type-wrapper-stabilizator-radio-labelone-text">Male</span>
                </label>

                <label class="production-block-type-wrapper-stabilizator-radio-labeltwo">
                  <input type="radio" name="gender" value="female" v-model="gender"
                         class="production-block-type-wrapper-stabilizator-radio-labeltwo-select">
                  <span class="production-block-type-wrapper-stabilizator-radio-labeltwo-btntwo"></span>
                  <span class="production-block-type-wrapper-stabilizator-radio-labeltwo-text">Female</span>
                </label>

              </div>

            </div>

          </div>
        </div>
        <button class="production-block-type-btn " :disabled="!checkStatuses" @click.stop="buildRobot">Произвести за 10
          монет
        </button>
      </div>

      <div class="production-block-components">

        <div class="production-block-components-wrapper">

          <div class="production-block-components-wrapper-components"
               v-for="component in components" :key="component.id"
          >

            <div class="production-block-components-wrapper-components-item"
                 v-for="index in component.max_count" :key="index + '_index'"
                 :style="index <= component.count ? {cursor: 'pointer'} : {cursor: 'not-allowed'}"
                 @click.stop="changeStatus(component, index)"
            >
              <img :src="getImgSrc(component,index)" :alt="component.title">
            </div>
          </div>


        </div>

        <div class="production-block-components-text">
          <p>{{ getMessage }}</p>
        </div>

      </div>

      <div class="production-block-image" :style="robotType">

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "Production",
  data() {
    return {
      type: 'frontEnd',
      gender: 'male',
      message: '',
    }
  },
  methods: {
    changeStatus(component, id) {
      if (id <= component.count) {
        if (!component.activated_button[id]) {
          this.$set(component.activated_button, id, true);
        } else {
          component.activated_button[id] = !component.activated_button[id];
        }
      }
    },

    getImgSrc(component, item) {
      let url = '';
      if (item <= component.count) {
        if (component.activated_button[item]) {
          url = component.product_img;
        } else {
          url = component.active_img;
        }
      } else {
        url = component.status_img;
      }
      return url;
    },

    buildRobot() {
      this.$store.dispatch('buildRobot');
    },

    /**
     * Метод подсчета количества монет и склонения слова "монет"
     * @returns {string}
     */
    coinCount(word, count) {
      let cases = [2, 0, 1, 1, 1, 2],
          text = word[(count % 100 > 4 && count % 100 < 20) ? 2 : cases[(count % 10 < 5) ? count % 10 : 5]];
      return text;
    },

  },
  computed: {

    getMessage() {
      let message = '';
      // let flag = false;
      if (this.roboCoin < 10) {
        message = 'Не хватает монет для производства робота.';
      } else {
        // let componentsFlag = false;
        // eslint-disable-next-line no-unused-vars
        let componentsCountDisabled = 0; // кол-во откл кнопок всего
        let totalComponentCount = 0; // общее кол-во кнопок
        let disabledItemCount = 0; // кол-во откл кнопок в компоненте
        // eslint-disable-next-line no-unused-vars
        let componentsCountActive = 0;
        message = 'Не хватает ';
        for (let componentId in this.components) {
          let activeItemCount = 0; // сколько включено в компоненте
          let component = this.components[componentId];
          if (Object.keys(component.activated_button).length) {

            for (let itemIdx in component.activated_button) {
              let item = component.activated_button[itemIdx];
              if (item === false) {
                disabledItemCount++;
              } else {
                activeItemCount++;
              }
            }

            componentsCountActive += activeItemCount;

            if (activeItemCount !== component.max_count) {
              message = message + ' ' + (component.max_count - activeItemCount) + ' ' + this.coinCount(component.message_title, component.max_count - activeItemCount);
            }

            componentsCountDisabled += disabledItemCount;
            totalComponentCount += component.max_count;
          } else {
            totalComponentCount += component.max_count;
            disabledItemCount += component.max_count;
            message = message + ' ' + component.max_count + ' ' + this.coinCount(component.message_title, component.max_count);
          }
        }


        if (disabledItemCount === totalComponentCount) {
          message = 'Не хватает биомеханизмов, процессоров и души';
        }

        if (componentsCountActive === totalComponentCount) {
          this.$store.dispatch('changeRobotImage');

          message = '';
        }
      }
      return message;
    },

    robotType() {
      let typeRobot = {};
      //
      // switch (this.type && this.gender) {
      //   case 'frontEnd' && 'male':
      //     typeRobot = {
      //       background: `url(${require('../assets/frontend_male1.png')})`
      //     }
      //     break;
      //
      //   case 'frontEnd' && 'female':
      //     typeRobot = {
      //       background: `url(${require('../assets/frontend_female1.png')})`
      //     }
      //     break;
      //
      //   case 'design' && 'male':
      //     typeRobot = {
      //       background: `url(${require('../assets/design_male1.png')})`
      //     }
      //     break;
      //
      //   case 'design' && 'female':
      //     typeRobot = {
      //       background: `url(${require('../assets/design_female1.png')})`
      //     }
      //     break;
      //
      // }

      if (this.type === 'frontEnd' && this.gender === 'male') {
        if (this.robotReady) {
          typeRobot = {
            background: `url(${require('../assets/frontend_male3.png')})`
          }
        } else {
          typeRobot = {
            background: `url(${require('../assets/frontend_male1.png')})`
          }
        }

      } else if (this.type === 'frontEnd' && this.gender === 'female') {

        if (this.robotReady) {
          typeRobot = {
            background: `url(${require('../assets/frontend_female3.png')})`
          }
        } else {
          typeRobot = {
            background: `url(${require('../assets/frontend_female1.png')})`
          }
        }

      } else if (this.type === 'design' && this.gender === 'male') {

        if (this.robotReady) {
          typeRobot = {
            background: `url(${require('../assets/design_male3.png')})`
          }
        } else {
          typeRobot = {
            background: `url(${require('../assets/design_male1.png')})`
          }
        }

      } else if (this.type === 'design' && this.gender === 'female') {

        if (this.robotReady) {
          typeRobot = {
            background: `url(${require('../assets/design_female3.png')})`
          }
        } else {
          typeRobot = {
            background: `url(${require('../assets/design_female1.png')})`
          }
        }
      }

      return typeRobot;
    },

    checkStatuses() {
      let flag = false;
      if (this.roboCoin < 10) {
        return false;
      } else {
        for (let objId in this.components) {
          let obj = this.components[objId];
          if (Object.keys(obj.activated_button).length && Object.keys(obj.activated_button).length === obj.max_count) {
            for (let buttonId in obj.activated_button) {
              let btn = obj.activated_button[buttonId];
              flag = btn;
              if (!flag) break;
            }
          } else {
            flag = false;
          }
          if (!flag) break;
        }
      }
      return flag;
    },

    /**
     * Вовращает общее количество монет
     * @returns {any}
     */
    roboCoin() {
      return this.$store.getters.ROBOCOIN;
    },

    components() {
      return this.$store.getters.ROBOCOMPONENTS;
    },
    robotReady() {
      return this.$store.getters.robotReady;
    }
  },
}
</script>

<style scoped lang="scss">
.production {
  max-width: 757px;
  width: 100%;
  margin: auto;
  flex-wrap: wrap;

  .production-title {
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

    &-type {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 236px;
      height: 300px;

      &-wrapper {

        &-biorobot {
          display: block;

          &-title {
            display: block;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #FFFFFF;
            margin-bottom: 16px;
          }

          &-radio {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 28px;

            input {
              position: absolute;
              appearance: none;
            }

            &-labelone {
              position: relative;
              width: 114px;
              height: 24px;
              display: flex;
              align-items: center;

              &-select:checked + &-btnone {
                background: url("../assets/radio_check.svg") no-repeat center;
              }

              &-btnone {
                position: absolute;
                width: 24px;
                height: 24px;
                border: 2px solid #A3B8CC;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                left: 0;
              }

              &-text {
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 16px;
                color: #FFFFFF;
                margin-left: 36px;
              }
            }

            &-labeltwo {
              position: relative;
              width: 114px;
              height: 24px;
              display: flex;
              align-items: center;

              &-select:checked + &-btntwo {
                background: url("../assets/radio_check.svg") no-repeat center;
              }

              &-btntwo {
                position: absolute;
                width: 24px;
                height: 24px;
                border: 2px solid #A3B8CC;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
              }

              &-text {
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 16px;
                color: #FFFFFF;
                margin-left: 36px;
              }
            }
          }
        }

        &-stabilizator {
          display: block;

          &-title {
            display: block;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #FFFFFF;
            margin-bottom: 16px;
          }

          &-radio {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 28px;

            input {
              position: absolute;
              appearance: none;
            }


            &-labelone {
              position: relative;
              width: 114px;
              height: 24px;
              display: flex;
              align-items: center;

              &-select:checked + &-btnone {
                background: url("../assets/radio_check.svg") no-repeat center;
              }

              &-btnone {
                position: absolute;
                width: 24px;
                height: 24px;
                border: 2px solid #A3B8CC;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
                left: 0;
              }

              &-text {
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 16px;
                color: #FFFFFF;
                margin-left: 36px;
              }
            }

            &-labeltwo {
              position: relative;
              width: 114px;
              height: 24px;
              display: flex;
              align-items: center;

              &-select:checked + &-btntwo {
                background: url("../assets/radio_check.svg") no-repeat center;
              }

              &-btntwo {
                position: absolute;
                width: 24px;
                height: 24px;
                border: 2px solid #A3B8CC;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
              }

              &-text {
                font-style: normal;
                font-weight: normal;
                font-size: 12px;
                line-height: 16px;
                color: #FFFFFF;
                margin-left: 36px;
              }
            }
          }
        }
      }

      &-btn {
        padding: 12px 20px;
        background: transparent;
        color: #fff;
        border-radius: 50px;
        border: 2px solid #FF7F22;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;

        &:hover {
          cursor: pointer;
          background: #FF5722;
          border-color: #FF5722;
        }

        &:active {
          background: #FF7F22;
          border-color: #FF7F22;
        }

        &:disabled {
          border: 2px solid #4C5865;
          background: transparent;
          color: #4C5865;
          cursor: not-allowed;
        }
      }
    }

    &-components {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 236px;
      height: 300px;

      &-wrapper {
        &-components {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;

          &-item {
            width: 48px;
            height: 48px;

            &:hover {
              cursor: pointer;
            }
          }
        }

        &-chip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;

          &-item {
            width: 48px;
            height: 48px;
            background: #333940;
            border-radius: 4px;
          }
        }

        &-soul {
          display: flex;
          align-items: center;
          justify-content: space-between;

          &-item {
            width: 48px;
            height: 48px;
            background: #333940;
            border-radius: 4px;
          }
        }
      }

      &-text {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;
        color: #A3B8CC;
      }
    }

    &-image {
      width: 236px;
      height: 300px;
    }
  }
}
</style>