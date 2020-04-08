<template>
    <div class="customer-new">
        <form @submit.prevent="add" action="">
            <table>
                <tr>
                    <th>Name</th>
                    <td>
                        <input v-model = "customer.name" placeholder="Enter name" type="text" class="form-control">
                    </td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>
                        <input v-model = "customer.email" placeholder="Enter email" type="email" class="form-control">
                    </td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>
                        <input v-model = "customer.phone" placeholder="Enter phone" type="text" class="form-control">
                    </td>
                </tr>
                <tr>
                    <th>Website</th>
                    <td>
                        <input v-model = "customer.website" placeholder="Enter website" type="text" class="form-control">
                    </td>
                </tr>
                <tr>
                    <td class="text-left">
                        <router-link to="/customers" class="btn">Cancel</router-link>
                    </td>
                    <td class="text-right">
                        <input type="submit" value="Create" class="btn btn-primary">
                    </td>
                </tr>
            </table>
            <div v-if="errors" class="errors">
                <ul>
                    <li v-for="(fieldsError, errorName) in errors" :key="errorName">
                        <strong>
                            {{ errorName }}
                        </strong>
                        {{ fieldsError.join('\n') }}
                    </li>
                </ul>
            </div>
        </form>
    </div>
</template>

<script>
import validate from 'validate.js';
export default {
    name: 'new',
    data(){
        return {
            customer: {
                name: '',
                email: '',
                website: '',
                phone: '',
            },
            errors: null,
        };
    },
    computed: {
        getUser(){
            return this.$store.getters.getCurrentUser;
        }
    },
    methods: {
        add(){
            this.errors = null;

            const constraints = this.getConstraints();

            const errors = validate(this.$data.customer, constraints);

            if(errors){
                this.errors = errors;
                return;
            }

            axios.post('/api/customers/new', this.$data.customer).then(response => {
                console.log(response.data.customer);
                this.$router.push('/customers');
            }).catch(error => {
                console.log(error);
            })
        },

        getConstraints(){
            return {
                name: {
                    presence: true,
                    length: {
                        minimum: 3,
                        message: 'Must be at least 3 characters long',
                    }
                },
                email: {
                    presence: true,
                    email: true,
                },
                phone: {
                    presence: true,
                    length: {
                        minimum: 10,
                        message: 'Must be at least 10 characters long',
                    },
                    numericality: true
                },
                 website: {
                    presence: true,
                    url: true,
                },
            }
        }
    }
}
</script>

<style scoped>
    .errors{
        background: lightcoral;
        padding: 21px;
        border-radius: 5px;
    }
</style>