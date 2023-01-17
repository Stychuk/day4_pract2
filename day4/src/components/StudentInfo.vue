<template>
    <div class="info">
        <div class="nameStudent">
            {{ student.name }}
        </div>
        <div class="imageStudent">
            <img :src="student.photo" width="200" @click="openImage = !openImage">
        </div>
        <div class="isDonePrStudent">
            Робота {{isDonePrOfStudent}}
        </div>
    </div>
    
    <Modal :open="openImage" @close="openImage = !openImage">
        <img :src="student.photo" @click="openImage = !openImage">
    </Modal>
</template>

<script>
import axios from "axios";
import Modal from "./Modal.vue";

export default {
    components: { Modal },
    props: {
        id: '',
    },
    data() {
        return{
            student: {},
            openImage: false,
        };
    },
    mounted() {
        axios.get("http://34.82.81.113:3000/students/"+this.id).then((res) => {
            this.student = res.data;
        });
    },
    computed: {
        // a computed getter
        isDonePrOfStudent() {
            return this.student.isDonePr ? 'здана' : 'не здана'
        }
    },
};
</script>

<style>
.nameStudent, .isDonePrStudent {
    font-size: 28px;
}
</style>