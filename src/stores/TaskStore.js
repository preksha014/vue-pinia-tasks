import { defineStore } from "pinia";

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading: false,
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
        async getTasks() {
            this.loading = true

            // get data from json file using json server
            const res = await fetch('http://localhost:3000/tasks')
            const data = await res.json()

            this.tasks = data
            this.loading = false
        },
        async addTask(task) {
            this.tasks.push(task)

            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                body: JSON.stringify(task),
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.error) {
                console.log(res.error)
            }
        },
        async deleteTask(id) {
            console.log('Deleting task with ID:', id);
            this.tasks = this.tasks.filter(t => t.id !== id);

            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'DELETE',
            });

            if (!res.ok) {
                console.error('Delete failed:', res.status, res.statusText);
            }
            console.log(res);
                },
        async toggleTask(id) {
            const task = this.tasks.find(t => t.id === id)
            task.isFav = !task.isFav

            const res = await fetch('http://localhost:3000/tasks/' + id, {
                method: 'PATCH',
                body: JSON.stringify({ isFav: task.isFav }),
                headers: { 'Content-Type': 'application/json' }
            })

            if (res.error) {
                console.log(res.error)
            }
        }
    }
})