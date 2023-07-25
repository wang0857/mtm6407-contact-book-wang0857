import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './scss/style.scss'
import App from './App.vue'
import {createRouter, createWebHashHistory} from 'vue-router'
import ContactBook from './views/ContactBook.vue'
import ContactDetails from './views/ContactDetails.vue'
import NewContact from './views/NewContact.vue'
import EditingContact from './views/EditingContact.vue'
import PathNotFound from './views/PathNotFound.vue'

const routes = [
    {
        path: '/',
        component: ContactBook
    },
    {
        path: '/contact/:id',
        component: ContactDetails,
        props: true,
        children: [
            {
                path: 'edit',
                component: EditingContact
            }
        ]
    },
    {
        path: '/new-contact',
        component: NewContact
    },
    {
        path: '/:pathMatch(.*)*',
        component: PathNotFound
    },
    {
        path: '/404NotFound',
        component: PathNotFound
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

createApp(App).use(router).mount('#app')