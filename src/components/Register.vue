<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Full Name</label>
          <input
            v-model="form.fullname"
            type="text"
            required
            class="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            class="w-full border px-3 py-2 rounded"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { register } from "../services/register";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  fullname: "",
  email: "",
  password: "",
});

const error = ref("");

const handleRegister = async () => {
  try {
    error.value = "";
    // Call your API
    await register(form.value.email, form.value.password, form.value.fullname);
    
    // Optional: token is stored in register() for auto-login
    router.push("/"); // Redirect to dashboard
  } catch (err: any) {
    error.value = err.message || "Registration failed";
  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
}
</style>
