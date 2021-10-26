import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        roboCoin: 100,                                                                                                   // общее количество монет
        robotRedy: false,
        roboComponents: {                                                                                               // объект с комплектующими для робота
            1: {
                id: 1,                                                                                                  // ключ первой детали
                img: require('../assets/biohand.svg'),                                                                  // картинка детали
                title: 'Биорука',                                                                                       // название детали
                message_title: ['биоруки', 'биорук', ',биоручище'],
                cost: 7,                                                                                                // цена покупки детали
                price: 5,                                                                                               // цена продажи детали
                count: 0,                                                                                               // клочество купленных деталей
                max_count: 4,                                                                                           // максимальное количество детали для производства 1 робота
                activated_button: {},
                status: false,                                                                                          // статус для смены кртинки детали в производстве
                status_img: require('../assets/prod_biohand1.svg'),
                active_img: require('../assets/prod_biohand2.svg'),
                product_img: require('../assets/prod_biohand3.svg')
            },
            2: {
                id: 2,                                                                                                  // ключ первой детали
                img: require('../assets/chip.svg'),                                                                     // картинка детали
                title: 'Микрочип',                                                                                      // название детали
                message_title: ['микрочипа', 'микрочипов', 'чипов'],
                cost: 5,                                                                                                // цена покупки детали
                price: 3,                                                                                               // цена продажи детали
                count: 0,                                                                                               // клочество купленных деталей
                max_count: 4,                                                                                           // максимальное количество детали для производства 1 робота
                activated_button: {},
                status: false,                                                                                          // статус для смены кртинки детали в производстве
                status_img: require('../assets/prod_chip1.svg'),
                active_img: require('../assets/prod_chip2.svg'),
                product_img: require('../assets/prod_chip3.svg')
            },
            3: {
                id: 3,                                                                                                  // ключ первой детали
                img: require('../assets/soul.svg'),                                                                     // картинка детали
                title: 'Душа',                                                                                          // название детали
                message_title: ['души', 'душа', 'душ'],
                cost: 25,                                                                                               // цена покупки детали
                price: 15,                                                                                              // цена продажи детали
                count: 0,                                                                                               // клочество купленных деталей
                max_count: 1,                                                                                           // максимальное количество детали для производства 1 робота
                activated_button: {},
                status: false,                                                                                          // статус для смены кртинки детали в производстве
                status_img: require('../assets/prod_soul1.svg'),
                active_img: require('../assets/prod_soul2.svg'),
                product_img: require('../assets/prod_soul3.svg')
            },
        },
        activeModal: '',                                                                                                 // активное модальное окно
    },

    actions: {
        /**
         *  Изменению количества монет
         * @param commit
         * @param checked
         */
        setAddRoboCoin({commit}, checked) {
            commit('addRoboCoin', checked);
        },

        /**
         * Добавление деталей на склад
         * @param commit
         * @param data
         */
        setAddToStorage({commit}, data) {
            commit('addToStorage', data);
        },

        /**
         * Удаленю деталей со склада
         * @param commit
         * @param card
         */
        setSellComponent({commit}, card) {
            commit('sellComponent', card);
        },

        /**
         * Установление активного окна
         * @param commit
         * @param activeModalName
         */
        setActiveModal({commit}, activeModalName) {
            commit('SETACTIVEMODAL', activeModalName);
        },

        /**
         * Производство робота
         * @param commit
         */
        buildRobot({commit}) {
            commit('buildRobot');
        },

        /**
         * Изменение картинки робота
         * @param commit
         */
        changeRobotImage({commit}) {
            commit('changeRobotImage');
        }

    },
    mutations: {
        /**
         * Мутация изменение активного окна
         * @param state
         * @param activeModalName
         * @constructor
         */
        SETACTIVEMODAL(state, activeModalName) {
            state.activeModal = activeModalName;
        },

        /**
         * Мутация по добавлению монет
         * @param state
         * @param checked
         */
        addRoboCoin(state, checked) {
            if (state.roboCoin >= 100) {
                state.activeModal = 'modal';
                return;
            }
            if (!checked && state.roboCoin < 100) {
                state.roboCoin++;
            } else {
                state.roboCoin += 5;
            }
        },

        /**
         * Мутация по добавлению деталей на склад
         * @param state
         * @param data
         */
        addToStorage(state, data) {
            data.count++;
            state.roboCoin -= data.cost;
            data.status = data.count === data.max_count;
        },

        /**
         * Мутация по удалению деталей со склада
         * @param state
         * @param data
         */
        sellComponent(state, data) {
            data.count--;
            state.roboCoin += data.price;
            data.status = data.count === data.max_count;
        },

        /**
         * Мутация по производству робота
         * @param state
         */
        buildRobot(state) {
            state.roboCoin -= 10;
            for (let componentId in state.roboComponents) {
                let component = state.roboComponents[componentId];
                component.count = component.count - component.max_count;
                component.status = false;
                component.activated_button = {};
            }
            state.robotRedy = false;
            state.activeModal = 'win-modal';
        },

        /**
         * Мутация по смене картинки робота
         * @param state
         */
        changeRobotImage(state) {
            state.robotRedy = true;
        }
    },
    getters: {
        ROBOCOIN: state => state.roboCoin,
        ROBOCOMPONENTS: state => state.roboComponents,
        ACTIVEMODAL: state => state.activeModal,
        robotReady: state => state.robotRedy
    }

})
