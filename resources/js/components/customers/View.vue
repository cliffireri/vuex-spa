<template>
  <div class="customer-view" v-if="customer">
      <div class="user-image">
          <img src="https://homepages.cae.wisc.edu/~ece533/images/pool.png" alt="">
      </div>
      <div class="user-info">
          <table class="table">
              <tr>
                  <th>ID</th>
                  <td>{{ customer.id }}</td>
              </tr>
              <tr>
                  <th>Name</th>
                  <td>{{ customer.name }}</td>
              </tr>
              <tr>
                  <th>Email</th>
                  <td>{{ customer.email }}</td>
              </tr>
              <tr>
                  <th>Phone</th>
                  <td>{{ customer.phone }}</td>
              </tr>
              <tr>
                  <th>Website</th>
                  <td>{{ customer.website }}</td>
              </tr>
          </table>
          <router-link to="/customers">back to all</router-link>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            customer: null,
        };
    },
    computed: {
        getUser(){
            return this.$store.getters.getCurrentUser;
        }
    },
    created(){
        axios.get(`/api/customers/${this.$route.params.id}`,{
             headers: {
                "Authorization": `Bearer ${this.getUser.token}`
            }
        }).then(response => {
            this.customer = response.data.customer;
        }).catch(error => {
            console.log(error);
        })
    }
}
</script>

<style>
    .customer-view{
        display: flex;
        align-items: center;
    }
    .user-image{
        flex: 1;
    }
    .user-image img{
        max-width: 160px;
    }
    .user-info{
        flex: 3;
    }
</style>