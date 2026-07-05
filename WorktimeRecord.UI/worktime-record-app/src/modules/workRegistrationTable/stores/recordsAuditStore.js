import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useRecordsAuditStore = defineStore('recordsAudit', () => {
    const records = ref([]);
    const mockedItems = [{ userName : "rserrano", firstName : "Ricardo", lastName : "Serrano velez", lastRecord: new Date("2024-05-01T08:00:00"). toLocalString(), mode: "Entrada" }]

    const FakeApi = {
        async fetch(){
            return new Promise((resolve) => { setTimeout(() => ( resolve({ items: mockedItems }) ), 1500) });

        }
    }

    async function getRecords(){
        const result =await FakeAPI.fetch()
        records.value = result.items
    }

    return {
        //State
        records,
        //Getters
        //Actions
        getRecords
    }
})