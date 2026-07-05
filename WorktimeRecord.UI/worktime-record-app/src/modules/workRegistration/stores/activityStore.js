import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useActivityStore = defineStore('activity', () => {
    const lastRecordDate = ref()
    const lastMode = ref()

const formatDateTime = (datetime) => {
    const dateOptions = { weekday: "long", year : "numeric", month: "long", day: "numeric" }
    const timeOptions = { hour: "2-digit", minute: "2-digit" }
    const localeDate = datetime.toLocaleDateString("es-ES", dateOptions)
    const localeTime = datetime.toLocaleTimeString("es-ES", timeOptions)
    return { date: localeDate, time: localeTime }
}

const FakeAPI = {
    async fetchGetLastActivity() {
        return new Promise((resolve) => { setTimeout(() => ( resolve({ recordDate: new Date(), lastMode: 'Entrada' }) ), 500) });
    },
    async fetchRegisterEntry() {
        return new Promise((resolve) => { setTimeout(() => ( resolve({ recordDate: new Date(), lastMode: 'Entrada' }) ), 500) });
    },
    async fetchRegisterExit() {
        return new Promise((resolve) => { setTimeout(() => ( resolve({ recordDate: new Date(), lastMode: 'Salida' }) ), 500) });
    }
};

function getCurrentUserActivity() {
    FakeAPI.fetchGetLastActivity().then((result) => {
        lastMode.value = result.lastMode
        lastRecordDate.value = formatDateTime(result.recordDate)
    }) };

function fetchRegisterEntry() {
    FakeAPI.fetchRegisterEntry().then((result) => {
        lastMode.value = result.lastMode
        lastRecordDate.value = formatDateTime(result.recordDate)
    }) };

function fetchRegisterExit() {
    FakeAPI.fetchRegisterExit().then((result) => {
        lastMode.value = result.lastMode
        lastRecordDate.value = formatDateTime(result.recordDate)
    }) }

return {
    //State
    lastRecordDate, lastMode,
    //Getters
    //Actions
    getCurrentUserActivity, fetchRegisterEntry, fetchRegisterExit
}

})