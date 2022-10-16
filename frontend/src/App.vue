<template>
  <table class="shadow" style="border-spacing: 7px; margin: auto;" id="app">
    <tr v-for="service in servicesList"
        :key="service">
      <td style="text-align:right;">
        <a :href="'//'" target="_blank">
          {{ service.Spec.TaskTemplate.ContainerSpec.Labels["com.docker.stack.namespace"] }}
        </a>
      </td>
      <td style="text-align:right;">
        <p>{{ service.mess }}</p>
        <input v-model="service.mess">
      </td>
      <td style="text-align:right;">
        {{ service.Spec.TaskTemplate.ContainerSpec.Image }}
      </td>
      <td style="text-align:right;">
        {{ reversedMessage }}
      </td>
    </tr>
  </table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      mess: [],
      dockerlist: [],
      servicesList: [],
      endpointList: 'http://localhost:8085/docker',
      serviceList: 'http://localhost:8085/services',
      endpointRemove: 'http://localhost:8085/remove',
    }
  },

  created() {
    this.getServicesList();
  },

  computed: {

  },

  methods: {
    getDockerList() {
      axios.get(this.endpointList)
              .then(response => {
                this.dockerlist = response.data;
              })
              .catch(error => {
                console.log('----- error -----');
                console.log(error);
              })
    },
    getServicesList() {
      axios.get(this.serviceList)
              .then(response => {
                this.servicesList = response.data;
                console.log(response.data);

              })
              .catch(error => {
                console.log('----- error -----');
                console.log(error);
              })
    },
    removeContainer(Id) {
      console.log(Id);
      axios.post(this.endpointRemove, { Id: Id })
        .then(response => {
          this.dockerlist = response.data;
        })
        .catch(error => {
          console.log('----- error -----');
          console.log(error);
        })
    },
    reversedMessage: function () {
      return this.serviceList.split('').reverse().join('')
    }
    }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a {
  color: #1362b9;
}
.shadow {
  background: #f8f8f8; /* Цвет фона */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Параметры тени */
  padding: 10px;
}

</style>
