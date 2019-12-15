<template>
  <table class="shadow" style="border-spacing: 7px; margin: auto;" id="app">
    <tr v-for="container in dockerlist"
        :key="container">
      <td style="text-align:right;">
        {{ container.Image }}
      </td>
      <td style="text-align:left;">
        {{ container.Names[0].replace('/','') }}
      </td>
      <td style="text-align:left;">
        <a :href="'//' + localip + ':' + container.Ports[0].PublicPort" target="_blank">
          {{ localip }}:{{ container.Ports[0].PublicPort }}
        </a>
      </td>
      <td>
        <button v-on:click="removeContainer(container.Id)">Удалить</button>
      </td>
    </tr>
  </table>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data () {
    return {
      dockerlist: [],
      localip: '10.0.0.23',
      endpointList: 'http://localhost:8085/docker',
      endpointRemove: 'http://localhost:8085/remove',
    }
  },

  created() {
    this.getDockerList();
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
    }
    }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
