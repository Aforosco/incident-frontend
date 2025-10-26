<template>
<<<<<<< HEAD
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
=======
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded p-8 w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-4 text-center">Sign Up</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">First Name</label>
          <input
            v-model="form.firstName"
            type="text"
            class="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Last Name</label>
          <input
            v-model="form.lastName"
            type="text"
            class="w-full border px-3 py-2 rounded"
            required
>>>>>>> email-feature
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Email</label>
          <input
            v-model="form.email"
            type="email"
<<<<<<< HEAD
            required
            class="w-full border px-3 py-2 rounded"
=======
            class="w-full border px-3 py-2 rounded"
            required
>>>>>>> email-feature
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Password</label>
          <input
            v-model="form.password"
            type="password"
<<<<<<< HEAD
            required
            class="w-full border px-3 py-2 rounded"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
=======
            class="w-full border px-3 py-2 rounded"
            required
            minlength="6"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Confirm Password</label>
          <input
            v-model="form.confirmPassword"
            type="password"
            class="w-full border px-3 py-2 rounded"
            required
          />
        </div>
>>>>>>> email-feature

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
<<<<<<< HEAD
          Register
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
      </p>
=======
          Sign Up
        </button>

        <p class="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-600 hover:underline">Login</router-link>
        </p>

        <p v-if="error" class="text-red-600 text-center mt-2">{{ error }}</p>
        <p v-if="success" class="text-green-600 text-center mt-2">{{ success }}</p>
      </form>
>>>>>>> email-feature
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
<<<<<<< HEAD
import { register } from "../services/register";
import { useRouter } from "vue-router";

const router = useRouter();

const form = ref({
  fullname: "",
  email: "",
  password: "",
});

const error = ref("");
=======
import { useRouter } from "vue-router";
import { register } from "../services/register";

const form = ref({ 
  firstName: "",
  lastName: "", 
  email: "", 
  password: "",
  confirmPassword: ""
});
const error = ref("");
const success = ref("");
const router = useRouter();
>>>>>>> email-feature

const handleRegister = async () => {
  try {
    error.value = "";
<<<<<<< HEAD
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
=======
    success.value = "";

    // Validate passwords match
    if (form.value.password !== form.value.confirmPassword) {
      error.value = "Passwords do not match";
      return;
    }

    // Combine first name and last name into fullname
    const fullname = `${form.value.firstName} ${form.value.lastName}`.trim();

    // Call register service
    await register(form.value.email, form.value.password, fullname);

    success.value = "Registration successful! Redirecting to login...";
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push("/login");
    }, 2000);

  } catch (err) {
    error.value = "Registration failed. Please try again.";
    console.error("Registration error:", err);
  }
};
</script>
>>>>>>> email-feature
