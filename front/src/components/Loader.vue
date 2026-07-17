<template>
  <div class="loader-container">

    <div class="spinner"></div>

    <p>{{ message }}</p>

  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string;
  }>(),
  {
    message: "Cargando información...",
  }
);
</script>

<style scoped>

.loader-container{

    width:100%;

    min-height:300px;

    display:flex;

    flex-direction:column;

    justify-content:center;

    align-items:center;

    gap:20px;

}

.spinner{

    width:60px;

    height:60px;

    border:6px solid #e5e7eb;

    border-top:6px solid #2563eb;

    border-radius:50%;

    animation:spin .8s linear infinite;

}

p{

    margin:0;

    color:#64748b;

    font-size:15px;

}

@keyframes spin{

    from{

        transform:rotate(0deg);

    }

    to{

        transform:rotate(360deg);

    }

}

</style>