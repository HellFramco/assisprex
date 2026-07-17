<template>
  <aside class="sidebar">

    <div class="logo">
      <h2>📦 Productos</h2>
      <span>CRUD App</span>
    </div>

    <nav class="menu">

      <RouterLink
        to="/products"
        class="btn btn-primary"
      >
        <span class="icon">📦</span>
        <span>Productos</span>
      </RouterLink>

    </nav>

    <div class="footer">
      <small>Vue 3 + Vite</small>
    </div>

  </aside>
</template>

<script setup lang="ts">
</script>

<style scoped>

.sidebar{
    width:260px;
    min-height:100vh;

    display:flex;
    flex-direction:column;

    background:rgba(10, 14, 26, 0.95);
}

.logo{

    padding:10px 30px;

    border-bottom:1px solid var(--border-color);

}

.logo h2{

    margin:0;

    font-size:22px;

}

.logo span{

    font-size:13px;

    color:#cbd5e1;

}

.menu{

    flex:1;

    display:flex;

    flex-direction:column;

    padding:20px 10px;

    gap:8px;

}

.menu-item{

    display:flex;

    align-items:center;

    gap:14px;

    padding:14px 18px;


    text-decoration:none;

    border-radius:10px;

    transition:.25s;

}

.menu-item:hover{

    background:#334155;

    color:white;

}

.icon{

    width:22px;

    text-align:center;

    font-size:18px;

}

.footer{

    padding:20px;

    text-align:center;

    color:#94a3b8;

    border-top:1px solid rgba(255,255,255,.08);

}

@media (max-width:768px){

.sidebar{

    width:80px;

}

.logo span,
.menu-item span:not(.icon),
.footer{

    display:none;

}

.logo{

    text-align:center;

}

.menu-item{

    justify-content:center;

    padding:16px;

}

.icon{

    font-size:22px;

}

}

</style>