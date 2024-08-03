<template>
  <div class="container-tasks">
    <div class="tasks">
      <div class="title">
        <h2>To Do List App</h2>
        <img src="./assets/imgs/note.png" alt="" />
      </div>
      <form class="add-tasks" @submit.prevent="addTask(), emptyInput()">
        <input type="text" v-model="task.title" required />
        <input type="submit" :value="mode === 'edition' ? 'Edit' : 'Add'" />
      </form>
      <div class="show-tasks">
        <div v-for="(t, i) in tasks" :key="i" class="data">
          <div class="bullt" @click="completeTask(t)">
            <span></span>
          </div>
          <div :class="t.completed ? 'desc complete' : 'desc'">
            {{ t.title }}
          </div>
          <div class="edit" @click="EditTodo(t)">Edit</div>
          <div class="remove" @click="deleteTodo(i)">X</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
let task = ref({
  title: "",
  completed: false,
});
let tasks = ref([]);
let mode = "addition";

//hooks
onMounted(() => {
  updateTodos();
});

// empty Input
function emptyInput() {
  task.value = {
    title: "",
    completed: false,
  };
}
// add todo to list
function addTask() {
  if (mode === "addition") {
    tasks.value.push(task.value);
  } else {
    mode = "addition";
  }
  saveData();
}
//save data in local storage
function saveData() {
  localStorage.setItem("List", JSON.stringify(tasks.value));
}
// update data
const updateTodos = () => {
  if (localStorage.getItem("List")) {
    tasks.value = JSON.parse(localStorage.getItem("List"));
  }
};
//mark complete task
const completeTask = (t) => {
  t.completed = !t.completed;
  saveData();
};
//remove
function deleteTodo(i) {
  tasks.value.splice(i, 1);
  saveData();
  if (task.value != null) emptyInput();
}
//edit
let EditTodo = (t) => {
  task.value = t;
  mode = "edition";
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container-tasks {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #265073, #209596);
  display: flex;
  justify-content: center;
  align-items: start;
  .tasks {
    background-color: #fff;
    text-align: center;
    border-radius: 30px;
    width: 90%;
    max-width: 500px;
    padding: 50px;
    margin-top: 30px;
    .title {
      display: flex;
      justify-content: center;
      align-items: start;
      margin-bottom: 20px;
      h2 {
        color: #265073;
        font-weight: bold;
        font-size: 30px;
      }
      img {
        width: 40px;
        height: 40px;
      }
    }
    .add-tasks {
      position: relative;
      margin-bottom: 30px;
      input[type="text"],
      input[type="submit"] {
        padding: 10px 20px;
        border-radius: 20px;
        border: none;
      }
      input[type="text"] {
        width: 100%;
        background-color: #cccccc54;
      }
      input[type="text"]:focus {
        outline: none;
      }
      input[type="submit"] {
        background-color: #209596;
        color: white;
        position: absolute;
        right: 0;
      }
    }
    .show-tasks {
      .data {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 10px;
        .bullt,
        .edit,
        .remove {
          cursor: pointer;
          flex-grow: 1;
        }
        .bullt {
          span {
            display: block;
            width: 15px;
            height: 15px;
            border: 1px solid #209596;
            border-radius: 50%;
            margin-right: 5px;
          }
        }
        .desc {
          font-size: 15px;
          text-align: center;
          margin-right: 5px;
          max-width: 70%;
          flex-grow: 7;
        }
        .edit {
          background-color: #209596;
          padding: 5px 10px;
          border-radius: 20px;
          color: white;
          margin-right: 5px;
        }
        .remove {
          color: #dc3545;
        }
        .complete {
          color: gray;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>
