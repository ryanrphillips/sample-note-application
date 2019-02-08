// Import our base CSS
import CoreCSS from './core.scss';

// Import Vue
import Vue from 'vue';

// Import our base component
import App from './components/App';

// When ready, instantiate the Vue instance on the #app div
window.onload = function() {
    new Vue({
        render: h => h(App),
        el: '#app'
    });
};
