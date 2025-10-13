<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white shadow-lg rounded p-8 w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <p v-if="error" class="text-red-600 text-center mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../services/login";

// Define the type for form
interface Form {
  email: string;
  password: string;
}

const form = ref<Form>({ email: "", password: "" });
const error = ref<string>("");
const router = useRouter();

const handleLogin = async () => {
  try {
    error.value = "";
    await login(form.value.email, form.value.password);
    // Redirect to dashboard
    router.push("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    error.value = "Invalid credentials"; // Customize the message if needed
  }
};
</script>
