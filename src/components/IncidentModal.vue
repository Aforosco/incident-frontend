<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded shadow-lg w-full max-w-md p-6 relative">
      <h2 class="text-2xl font-bold mb-4">{{ incident ? 'Edit Incident' : 'Create Incident' }}</h2>
      <form @submit.prevent="saveIncident" class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Title</label>
          <input v-model="form.title" class="w-full border px-3 py-2 rounded" required />
        </div>
        
        <div>
          <label class="block mb-1 font-medium">Description</label>
          <textarea v-model="form.description" class="w-full border px-3 py-2 rounded h-24" required></textarea>
        </div>
        
        <div class="grid grid-cols-2 gap-2">
          <div>
            <label class="block mb-1 font-medium">Severity</label>
            <select v-model="form.severity" class="w-full border px-3 py-2 rounded">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          
          <!-- Only show status dropdown when editing (admin only) -->
          <div v-if="incident">
            <label class="block mb-1 font-medium">Status</label>
            <select v-model="form.status" class="w-full border px-3 py-2 rounded">
              <option>New</option>
              <option>Investigating</option>
              <option>Resolved</option>
              <option>Closed</option>
            </select>
          </div>
          
          <!-- Show read-only status when creating -->
          <div v-else>
            <label class="block mb-1 font-medium">Status</label>
            <input 
              value="New" 
              class="w-full border px-3 py-2 rounded bg-gray-100" 
              readonly 
            />
          </div>
        </div>
        
        <div>
          <label class="block mb-1 font-medium">Location (Optional)</label>
          <input v-model="form.location" class="w-full border px-3 py-2 rounded" />
        </div>
        
        <!-- Only show Assigned To field when editing (admin only) -->
        <div v-if="incident">
          <label class="block mb-1 font-medium">Assigned To (Optional)</label>
          <input v-model="form.assignedTo" class="w-full border px-3 py-2 rounded" />
        </div>
        
        <div class="flex justify-end space-x-2 mt-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 rounded border hover:bg-gray-100">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            {{ incident ? 'Update' : 'Create' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { createIncident, updateIncident } from '../services/incidentService';
import type { Incident, Severity, Status } from '../types/incident';

interface FormState {
  title: string;
  description: string;
  severity: Severity;
  status: Status;
  location?: string;
  assignedTo?: string;
}

const props = defineProps<{ incident?: Incident }>();
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'saved'): void;
}>();

const form = ref<FormState>({
  title: '',
  description: '',
  severity: 'Low',
  status: 'New',
  location: '',
  assignedTo: ''
});

watch(
  () => props.incident,
  (incident) => {
    if (incident) {
      form.value = {
        title: incident.title,
        description: incident.description,
        severity: incident.severity,
        status: incident.status,
        location: incident.location || '',
        assignedTo: incident.assignedTo || ''
      };
    }
  },
  { immediate: true }
);

const saveIncident = async () => {
  try {
    if (props.incident) {
      // Editing existing incident (admin only)
      const incidentData = {
        title: form.value.title,
        description: form.value.description,
        severity: form.value.severity,
        status: form.value.status,
        location: form.value.location || undefined,
        assignedTo: form.value.assignedTo || undefined
      };
      await updateIncident(props.incident.id, incidentData);
    } else {
      // Creating new incident (user) - always set status to "New"
      const incidentData = {
        title: form.value.title,
        description: form.value.description,
        severity: form.value.severity,
        status: 'New' as Status, // Force "New" status
        location: form.value.location || undefined
      };
      await createIncident(incidentData);
    }
    
    emit('saved');
    emit('close');
  } catch (error) {
    console.error('Failed to save incident:', error);
    alert('Failed to save incident. Please try again.');
  }
};
</script>