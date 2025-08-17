<template>
  <VApp>
    <VAppBar color="red" title="My App">
      <template #prepend>
        <VAppBarNavIcon />
      </template>
    </VAppBar>
    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>
