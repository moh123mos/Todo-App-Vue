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
            <span :class="t.completed ? 'active' : ''"></span>
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
  task.value = {
    title: "",
    completed: false,
  };
  console.log(tasks.value);
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
  if (tasks.value.at(i) == task.value) mode = "addition";
  tasks.value.splice(i, 1);
  saveData();
  if (task.value != null) emptyInput();
}
//edit
let EditTodo = (t) => {
  task.value = t;
  mode = "edition";
};
//submit when click in Enter key
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
        color: #265073;
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
            position: relative;
            display: block;
            width: 16px;
            height: 16px;
            border: 1px solid #209596;
            border-radius: 50%;
            margin-right: 5px;
            &::before {
              content: "";
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: transparent;
            }
            &:hover::before {
              background-color: #20949654;
            }
            &.active {
              &::before {
                background-color: #209596;
              }
            }
          }
        }
        .desc {
          color: #265073;
          font-size: 15px;
          text-align: center;
          margin-right: 5px;
          max-width: 70%;
          flex-grow: 7;
        }
        .edit,
        .remove {
          padding: 5px 10px;
          border-radius: 20px;
          margin-left: 5px;
        }
        .edit {
          color: white;
          background-color: #209496c6;
          &:hover {
            background-color: #209596;
          }
        }
        .remove {
          color: #dc3545;
          background-color: #b8334061;
          &:hover {
            background-color: #b83340a9;
          }
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
