<template><div class="p-4 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">Incident Dashboard</h1>
<div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-bold text-gray-800">Incident Dashboard</h2>

      <!-- Logout Button -->
      <button
        @click="handleLogout"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow transition"
      >
        Logout
      </button>
    </div>

    <!-- The rest of your dashboard content -->
    <div class="mt-6">
      <p>Welcome to your incident dashboard!</p>
    </div>
  </div>
    <button
      @click="showCreate = true"
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
    >
      Create Incident
    </button>

    <table class="min-w-full bg-white border rounded shadow overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="py-2 px-4 text-left">ID</th>
          <th class="py-2 px-4 text-left">Title</th>
          <th class="py-2 px-4 text-left">Status</th>
          <th class="py-2 px-4 text-left">Severity</th>
          <th class="py-2 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="incident in incidents" :key="incident.id" class="border-t hover:bg-gray-50">
          <td class="py-2 px-4">{{ incident.id }}</td>
          <td class="py-2 px-4">{{ incident.title }}</td>
          <td class="py-2 px-4">{{ incident.status }}</td>
          <td class="py-2 px-4">{{ incident.severity }}</td>
          <td class="py-2 px-4 space-x-2">
            <button
              @click="editIncident(incident)"
              class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              @click="deleteIncidentHandler(incident.id)"
              class="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Create Modal -->
    <IncidentModal v-if="showCreate" @close="showCreate = false" @saved="fetchIncidents" />

    <!-- Edit Modal -->
    <IncidentModal
      v-if="editingIncident"
      :incident="editingIncident"
      @close="editingIncident = null"
      @saved="fetchIncidents"
    />
  </div>
  </template>
  

<script setup lang="ts">
import { ref, onMounted } from 'vue';
 import { getAllIncidents, deleteIncident } from '../services/incidentService'; 
import type { Incident } from '../types/incident';
import IncidentModal from './IncidentModal.vue';
import { useRouter } from "vue-router";
const router = useRouter();

const handleLogout = () => {
  // Remove the JWT token
  localStorage.removeItem("token");

  // Redirect to login page
  router.push("/login");
};
const incidents = ref<Incident[]>([]);
const showCreate = ref(false);
const editingIncident = ref<Incident | null>(null);

const fetchIncidents = async () => {
  const res = await getAllIncidents();
  incidents.value = res;
};

const editIncident = (incident: Incident) => {
  editingIncident.value = incident;
};

const deleteIncidentHandler = async (id: number) => {
  if (confirm('Are you sure?')) {
   await deleteIncident(id);
    fetchIncidents();
  }
};

onMounted(fetchIncidents);
</script>
