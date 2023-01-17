<template>
    <div id="app">
		<input type="text" name="search" v-model="search"><br>
		<table class="table table-dark">
            <tr v-for="(item,stud) in students" v-bind:key="item._id">
				<td>
                    <router-link v-bind:to="'/student-info/'+item._id">
                        {{item.name}}
                    </router-link>
                </td>
                <td><input type="checkbox" v-model="item.isDonePr"></td>
                <td>{{item.group}}</td>
                <td><a href = "#" @click="deleteStudent(item._id)">Видалити</a></td>
                <td>
                    <a href = "#" @click="updateStudent(stud)"><img src="pen.svg" width="30"></a>
                </td>
			</tr>
		</table>
			<input v-model="student.name">
			<input type="checkbox" v-model="student.isDonePr">
			<select v-model="student.group">
				<option value="RPZ 19 1/9">RPZ 19 1/9</option>
				<option value="RPZ 19 2/9">RPZ 19 2/9</option>
			</select>
			<button @click="addStudent()">Add student</button>
            <button @click="update()">Оновити</button>
	</div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            students: [],
            search:'',
            student: {"name": "", isDonePr: false, group: ""},
            studentId:''
        }
     },	 
     mounted: function(){
        axios.get("http://34.82.81.113:3000/students").then((response) => {
            console.log(response.data);
            this.students = response.data;
        })
     },
     methods: {
        deleteStudent(studId){
            this.students=this.students.filter(el=>{
                return el._id != studId
            })
            axios.delete(`http://34.82.81.113:3000/students/${studId}`).then((response)=>{
                console.log(response.data);
            })
        },
        addStudent() {
            axios.post("http://34.82.81.113:3000/students", {
                ...this.student
            })
            .then((response) => {
                this.students.push(response.data);
            })
        },
        updateStudent(stud) {    
            this.student = {
                ...this.students[stud]
            }
            this.studentId = stud
        },
        update() {
            axios.put(`http://34.82.81.113:3000/students/${this.students[this.studentId]._id}`, {
                ...this.student
            })
            .then((response) => {
                this.students[this.studentId] = response.data;
                console.log(response.data);
            })
        }
     },
};
</script>

<style scoped>

</style>