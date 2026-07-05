<template>
    <div class="work-registration">
        <div class="date.time">
            <p> <label class="date"> {{currentDate}}</label></p>
            <p> <label class="time"> {{currentTime}}</label></p>
        </div>
        <div class="buttons">
            <button class="register-button" @click="registerEntryClick" :disabled="lastMode === 'Entrada'">Registrar Entrada</button>
            <button class="close-button" @click="registerExitClick" :disabled="lastMode === 'Salida'">Registrar Salida</button>
        </div>
        <p>Ultimo Registro : {{ lastMode }} - {{ lastRecordDate?.time }} - {{ lastRecordDate?.date }}</p>
    </div>
</template>

<script setup>
// Pinia gestor de estado
import { storeToRefs } from 'pinia';
import { useActivityStore } from '../stores/activityStore';
import { onMounted} from 'vue';

const activityStore = useActivityStore(); //DEFINICION DEL STORE PARA USAR SUS FUNCIONES Y VARIABLES
const { lastMode, lastRecordDate } = storeToRefs(activityStore); //variables de estado
const {getCurrentUserActivity, registerEntry, registerExit} = activityStore; // Metodos

onMounted(() => { getCurrentUserActivity(); //iNICIALIZAR LLAMADA DEL STORE PARA OBTENER EL ULTIMO REGISTRO DEL USUARIO
});

// Variables de estado para la fecha y hora actual
const getCurrentDateTime = () => {
    const now = new Date()
    const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const timeOptions = {hour: '2-digit', minute: '2-digit'};
    const currentDate = now.toLocaleDateString('es-ES', dateOptions);
    const currentTime = now.toLocaleTimeString('es-ES', timeOptions);
    return { currentDate, currentTime };
};
//DECLARACIONES DE PROPIEDADES REACTIVAS PARA LA FECHA Y HORA ACTUAL
const { currentDate, currentTime } = getCurrentDateTime();
//FUNCIONES PARA REGISTRAR ENTRADA Y SALIDA de empleado
const registerEntryClick =  () => {registerEntry() };
const registerExitClick =  () => {registerExit() }
</script>

<style scoped>
.date-time {
    margin-top: 2rem;
    text-align: center;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
    padding: 2rem;
    border-radius: 15px;
    display: inline-block;
}

.work-registration {text-align: center; margin: 50px auto; }
.date {font-size: 20px; }
.time {font-size: 40px; font-weight: bold; }
.buttons {margin-top: 20px; }
buttons {
    margin: 0 10px;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.register-button {
    background-color: #4CAF50;
    color: white;
}

.close-button {
    background-color: #f44336;
    color: white;
}

button:hover {filter: brightness(1.2); }
button:disabled {background-color: gray; cursor: not-allowed; opacity: 0.5; }
</style>