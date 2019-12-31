import Vue from 'vue';
import * as filter from './filter'

Object.keys(filter).forEach(item => {
    Vue.filter(item, filter[item])
})