<template>
    <v-data-table
        :headers="headers"
        :items="records"
        @update:options="loadItems"
        :loading="loading"
    ></v-data-table>

</template>

<script setup>
import {ref} from 'vue'
//pinia gestor de estado
import  { storeToRefs } from 'pinia';
import { useRecordsAuditStore } from '../stores/recordsAuditStore';

//Definicion del store para usar sus funciones y variables
const recordsAuditStore = useRecordsAuditStore();
const { records } = storeToRefs(recordsAuditStore); //variables de estado
const { getRecords } = recordsAuditStore; // Metodos

const loading = ref(true);
const headers = [
    { title: 'Usuario', align: 'start', sortable: false, key: "userName" },
    { title: 'Nombre', key: 'firstName', align: "end", sortable: false },
    { title: 'Apellidos', key: 'lastName', align: "end", sortable: false },
    { title: 'Ultimo Registro', key: 'lastRecord', align: "end", sortable: true },
    { title: 'Modo', key: 'mode', align: "end", sortable: false } 
];

const loadItems = async () => {
    loading.value = true; // la barra de carga inicia
    await getRecords();
    loading.value = false; // cuando termina la llamada, se detiene la barra
};
</script>

<style scoped></style>