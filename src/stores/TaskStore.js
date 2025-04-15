import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [
            { id: 1, title: "buy some milk", isFav: false },
            { id: 2, title: "play Gloomhaven", isFav: true }
        ]
    }),
    getters: {
        favs() {
            return this.tasks.filter(t => t.isFav);
        },

        allTaskCount() {
            return this.tasks.length;
        },

        favTaskCount() {
            return this.favs.length
        }
    },
    actions: {
        addTask(task) {
            this.tasks.push(task)
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(t => {
                return t.id !== id
            })
        },
        toggleTask(id) {
            const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav
        }
    }
})