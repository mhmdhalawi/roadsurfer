<script setup lang="ts"></script>

<template>
  <h1>Hello App!</h1>
  <nav class="flex gap-x-2 text-blue-500">
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>
