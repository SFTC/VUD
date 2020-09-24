import Vue from 'vue'
import Router from 'vue-router'
import InstallAtion from './pages/InstallAtion'
import QuickStart from './pages/QuickStart'
import FormTable from './pages/FormTable'
import MultiSelect from './pages/MultiSelect'
import FormDialog from './pages/FormDialog'
import VirtualSelect from "./pages/VirtualSelect";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      component: InstallAtion
    },
    {
      path: "/installation",
      component: InstallAtion
    },
    {
      path: "/quickstart",
      component: QuickStart
    },
    {
      path: "/formtable",
      component: FormTable
    },
    {
      path: "/multiselect",
      component: MultiSelect
    },
    {
      path: "/virtualselect",
      component: VirtualSelect
    },
    {
      path: "/formdialog",
      component: FormDialog
    }
  ]
});
export default router
