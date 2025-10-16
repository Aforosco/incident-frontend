<template>
<div class="min-h-screen bg-gray-100">
    
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <button @click="handleLogout" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 py-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm font-medium">Total Incidents</h3>
          <p class="text-3xl font-bold text-gray-900">{{ stats.total }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm font-medium">Pending</h3>
          <p class="text-3xl font-bold text-yellow-600">{{ stats.pending }}</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-gray-500 text-sm font-medium">Completed</h3>
          <p class="text-3xl font-bold text-green-600">{{ stats.completed }}</p>
        </div>
      </div>

      
      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-6 py-4 border-b">
          <h2 class="text-xl font-semibold">All Incidents</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created By</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="incident in incidents" :key="incident.id">
                <td class="px-6 py-4 text-sm text-gray-900">{{ incident.id }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ incident.title }}</td>
                <td class="px-6 py-4">
                  <span :class="getStatusClass(incident.status)" class="px-2 py-1 text-xs rounded-full">
                    {{ incident.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ incident.createdBy }}</td>
                <td class="px-6 py-4 text-sm">
                  <select 
                    v-model="incident.status" 
                    @change="updateStatus(incident)"
                    class="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { logout } from "../services/login";
import { getAllIncidents, updateIncident } from "../services/incidentService";

const router = useRouter();
const incidents = ref<any[]>([]);

const stats = computed(() => ({
  total: incidents.value.length,
  pending: incidents.value.filter(i => i.status === "Pending").length,
  completed: incidents.value.filter(i => i.status === "Completed").length,
}));

const loadIncidents = async () => {
  try {
    incidents.value = await getAllIncidents();
  } catch (error) {
    console.error("Failed to load incidents:", error);
  }
};

const updateStatus = async (incident: any) => {
  try {
    await updateIncident(incident.id, { status: incident.status });
    await loadIncidents(); // Reload to get fresh data
  } catch (error) {
    console.error("Failed to update status:", error);
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Completed":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const handleLogout = () => {
  logout();
  router.push("/login");
};

onMounted(() => {
  loadIncidents();
});

</script>