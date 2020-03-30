<template>
  <div>
      <div class="button-wrapper">
          <router-link to="/new" class="btn btn-primary btn-sm">
              New
          </router-link>
      </div>
    <table class="table">
      <thead>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Actions</th>
      </thead>
      <template v-if="!customers.length">
        <tr>
          <td colspan="4" class="text-center">No customers available!</td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>
            <router-link :to="`/customer/${customer.id}`">View</router-link>
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getCustomers");
  },
  computed: {
    customers() {
      return this.$store.getters.customers;
    }
  }
};
</script>

<style>
.button-wrapper{
    text-align: right;
    margin-bottom: 40px;
}
</style>